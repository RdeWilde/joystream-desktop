/**
 * Created by bedeho on 13/06/17.
 */

var assert = require('assert')
var BaseMachine = require('../../../BaseMachine')
var LibtorrentInteraction = require('joystream-node').LibtorrentInteraction
var TorrentState = require('joystream-node').TorrentState

var Common = require('./../Common')

var Loading = new BaseMachine({

    initialState: "AddingToSession",

    states: {

        AddingToSession : {

            addTorrentResult: function (client, err, torrent) {

                if (err) {
                    this.transition(client, 'FailedAdding')

                } else {
                    // Hold on to torrent
                    client.torrent = torrent

                    // Hook into torrent events

                    torrent.on('metadata', (metadata) => {
                        client.processStateMachineInput('metadataReady', metadata)
                    })

                    torrent.on('resumedata', (resumeData) => {
                        client.processStateMachineInput('resumeDataGenerated', resumeData)
                    })

                    torrent.on('resumedata_error', function(err) {
                        client.processStateMachineInput('resumeDataGenerationFailed', err)
                    })

                    torrent.on('status_update', (status) => {
                        // We directly update store, although we really should
                        // create a fresh input for this
                        client.store.setStatus(status)

                        // Used to monitor progress while loading
                        client.lastStatus = status
                        this.emit('status_update', client, status)
                    })

                    // This alert is generated when a torrent switches from being a downloader to a seed.
                    // It will only be generated once per torrent.
                    torrent.on('finished', function() {
                        client.processStateMachineInput('downloadFinished')
                    })

                    // This alert is posted when a torrent completes checking. i.e. when it transitions out of
                    // the checking files state into a state where it is ready to start downloading
                    torrent.on('torrentChecked', function () {
                        client.processStateMachineInput('checkFinished')
                    })

                    torrent.on('peerPluginStatusUpdates', function (peerStatuses) {
                      client.processStateMachineInput('processPeerPluginStatuses', peerStatuses)
                    })

                    // If we don´t have metadata, wait for it
                    if(client.metadata && client.metadata.isValid()) {
                        this.transition(client, 'CheckingPartialDownload')
                        client.store.setMetadata(client.metadata)
                    } else {
                        this.transition(client, 'WaitingForMetadata')
                    }
                }

            }
        },

        FailedAdding : {

            // This handler is input sink, preventing any further processing by parent. In the future we may add some handling of secondary attempts
            '*' : function(client) {
                //
            }
        },

        WaitingForMetadata : {

            metadataReady : function (client, metadata) {

                // Hold on to metadata, is required when shutting down
                client.metadata = metadata

                // Update store
                client.store.setMetadata(metadata)

                this.transition(client, 'CheckingPartialDownload')
            }
        },

        CheckingPartialDownload: {

            checkFinished: function (client) {
                // By default, extension torrent plugins are constructed with
                // TorrentPlugin::LibtorrentInteraction::None:
                // - No events interrupted, except on_extended events for this plugin.
                // Since we _never_ want libtorrent to seed for us over vanilla BitTorrent
                // protocol, even when we are uploading (we only allow
                // paid seeding in app), we instead want
                // TorrentPlugin::LibtorrentInteraction::BlockDownloading:
                // - Preventing uploading to peers by
                // -- sending (once) CHOCKED message in order to discourage inbound requests.
                // -- cancel on_request() to make libtorrent blind to peer requests.
                client.setLibtorrentInteraction(LibtorrentInteraction.BlockUploading)

                // Determine whether we have a full download

                var s = client.torrent.handle.status()

                if (s.state === TorrentState.seeding) {

                    if(Common.isPassive(client.deepInitialState) || Common.isDownloading(client.deepInitialState)) {

                        // When there is a full download, and the user doesn't want to upload, then
                        // we just go to passive, even if the user really wanted to download.
                        client.toObserveMode()

                        client.deepInitialState = Common.DeepInitialState.PASSIVE

                        client.startExtension()

                    } else { // isUploading

                        client.toSellMode(client.sellerTerms)

                        if(!Common.isStopped(client.deepInitialState))
                            client.startExtension()
                    }

                    goToDeepInitialState(this, client)

                } else {

                    // We go to buy mode, regardless of what the user wanted (DeepInitialState),
                    // user will need to supply terms on their own.

                    if(Common.isDownloading(client.deepInitialState))  {

                        client.toBuyMode(client.buyerTerms)

                        // When not paused, then start extension, otherwise leave extension un-started
                        if(!Common.isStopped(client.deepInitialState))
                            client.startExtension()

                        goToDeepInitialState(this, client)

                    } else { // isPassive || isUploading

                        // Overrule users wish, force (unpaid+started) downloading
                        client.deepInitialState = Common.DeepInitialState.DOWNLOADING.UNPAID.STARTED

                        this.transition(client, 'WaitingForMissingBuyerTerms')
                    }
                }

            }

        },

        WaitingForMissingBuyerTerms : {

            updateBuyerTerms: function(client, terms) {

                // Hold on to terms
                client.buyerTerms = terms

                client.toBuyMode(terms)

                // When not paused, then start extension, otherwise leave extension un-started
                if(!Common.isStopped(client.deepInitialState))
                    client.startExtension()

                goToDeepInitialState(this, client)
            }
        }
    }
})

function goToDeepInitialState(machine, client) {

    // Path to active substate we need to transition to
    var path = relativePathFromDeepInitialState(client.deepInitialState)

    // Transition to active state
    machine.go(client, path)

    // Drop temprorary storage of inital state we want to load to
    delete client.deepInitialState
}

function relativePathFromDeepInitialState(s) {

    switch (s) {
        case Common.DeepInitialState.DOWNLOADING.UNPAID.STARTED:
            return '../Active/DownloadIncomplete/Unpaid/Started/ReadyForStartPaidDownloadAttempt'
        case Common.DeepInitialState.DOWNLOADING.UNPAID.STOPPED:
            return '../Active/DownloadIncomplete/Unpaid/Stopped'
        /**
        case Common.DeepInitialState.DOWNLOADING.PAID.STARTED:
            return '../Active/DownloadIncomplete/Paid/Started'
        case Common.DeepInitialState.DOWNLOADING.PAID.STOPPED:
            return '../Active/DownloadIncomplete/Paid/Stopped'
        */
        case Common.DeepInitialState.PASSIVE:
            return '../Active/FinishedDownloading/Passive'
        case Common.DeepInitialState.UPLOADING.STARTED:
            return '../Active/FinishedDownloading/Uploading/Started'
        case Common.DeepInitialState.UPLOADING.STOPPED:
            return '../Active/FinishedDownloading/Uploading/Stopped'
    }

    assert(false)
}

module.exports = Loading
