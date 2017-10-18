/**
 * Created by bedeho on 17/08/17.
 */

import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import assert from 'assert'

import ButtonSection from './ButtonSection'

var StartPaidDownloadViability = require('../../core/Torrent/StartPaidDownloadViability')

/**
 * NB: All of this stuff should be in its own store for this toolbar UI element,
 * however we don't have that as of now.
 *
 * The classes below represent different states of viability w.r.t starting paid
 * downloading.
 */

function Stopped() {
}

function AlreadyStarted() {
}

function InViable(viability) {
    this.viability = viability
}

function InsufficientFunds(estimate, available) {
    this.estimate = estimate
    this.available = available
}

function CanStart(suitablePeers, estimate) {
    this.suitablePeers = suitablePeers
    this.estimate = estimate
}


var Startability = {}
Startability.Stopped = Stopped
Startability.AlreadyStarted = AlreadyStarted
Startability.InViable = InViable
Startability.InsufficientFunds = InsufficientFunds
Startability.CanStart = CanStart

function computeStartability(applicationState, viability, balance) {

    if(applicationState.startsWith("Active.DownloadIncomplete.Unpaid.Stopped"))
        return new Startability.Stopped()
    else if(applicationState.startsWith("Active.DownloadIncomplete.Paid"))
        return new Startability.AlreadyStarted()
    else if(!(viability instanceof StartPaidDownloadViability.Viable))
        return new Startability.InViable(viability)
    else if(balance == 0)
        return new Startability.InsufficientFunds(viability.estimate, balance)
    else
        return new Startability.CanStart(viability.suitableAndJoined, viability.estimate)
}

const StartPaidDownloadingSection = observer((props) => {

    /**
     * Bizarre!!!!!: HMR seems to break the use instanceof
     * ---------
     * of [instanceof StartPaidDownloadingViability.*] here, totally unablw
     * to figure out what is going on. Before a reload, everything works,
     * after reload, it breaks. Primary hypothesis is that reload is
     * some how leading to some constructor functions to get reloaded in some part
     * of the codebase, which is creating new prototypes for them, but that
     * other parts of the codebase are using older constructors with other prototypes, breaking
     * instanceof.
     *
     * Using constructor.name === for now
     */

    // This one breaks
    //console.log(props.torrent.startPaidDownloadViability instanceof StartPaidDownloadViability.NoJoyStreamPeerConnections)
    //console.log(props.torrent.startPaidDownloadViability.constructor.name === 'NoJoyStreamPeerConnections')

    let startability = computeStartability (
        props.torrent.state,
        props.torrent.startPaidDownloadViability,
        props.store.unconfirmedBalance
    )

    // Derive ButtonSection props
    let className
    let onClick

    if(startability instanceof Startability.CanStart) { // props.torrent.canStartPaidDownloading && props.store.unconfirmedBalance > 0
        className = "start_paid_downloading"
        onClick = () => { props.torrent.startPaidDownload() }
    } else {
        className = "start_paid_downloading-disabled"
        onClick = null
    }

    return (
        <ButtonSection className={className} tooltip="Start paid speedup" onClick={onClick}>
            <BlockedStartBadge startability={startability}
                               spvChainSynced={props.store.spvChainSynced}
            />
        </ButtonSection>
    )
})

StartPaidDownloadingSection.propTypes = {
    store : PropTypes.object.isRequired, // ApplicationStore really
    torrent : PropTypes.object.isRequired, // TorrentStore really
}

import ReactTooltip from 'react-tooltip'

const Badge = (props) => {

    let styles = {
        root : {
            display :  'flex',
            alignItems : 'center',
            justifyContent: 'center',
            height : '20px',
            width : '20px',
            backgroundColor : '#f18732',
            borderRadius : '3px',
            position : 'relative',
            top : '15px',
            left : '15px'
        }
    }

    return (
        <div style={styles.root} data-tip data-for={"badge"}>
            {props.icon}
             <ReactTooltip id={"badge"}
                           place='bottom'
                           effect='solid'
                           className="torrent_table_start_paid_downloading_badge_tooltip"
             >
                {props.tooltip}
             </ReactTooltip>
        </div>
    )

}

Badge.propTypes = {
    tooltip : PropTypes.string.isRequired,
    icon : PropTypes.node.isRequired
}

import SvgIcon from 'material-ui/SvgIcon'

const AlertIcon = (props) => {

    let style = {
        height : '12px',
        width : '12px'
    }

    let color= '#ffffff'

    return (
        <SvgIcon {...props} viewBox={'0 0 24 24'} style={style}>
            <path fill={color} d="M16.555,20.603l-0.306,1.254c-1.038,0.409-4.634,2.125-6.708,0.299c-0.618-0.543-0.927-1.233-0.927-2.069 c0-1.567,0.516-2.933,1.442-6.213c0.163-0.619,0.363-1.424,0.363-2.062c0-1.1-0.417-1.393-1.55-1.393 c-0.553,0-1.165,0.197-1.719,0.404l0.307-1.254c1.235-0.502,2.786-1.114,4.115-1.114c1.993,0,3.458,0.994,3.458,2.884 c0,0.545-0.094,1.499-0.292,2.159l-1.146,4.054c-0.236,0.82-0.666,2.626-0.002,3.162C14.245,21.243,15.792,20.963,16.555,20.603z"></path>
            <circle fill={color} cx="14.5" cy="3.5" r="2.5"></circle>
        </SvgIcon>
    )
}

function badgePropsFromStartability(startability, spvChainSynced)  {

    let icon = <AlertIcon />
    let tooltip = "placeholder while coding"

    if(startability.constructor.name === 'Stopped')
        tooltip = "Download stopped"
    else if(startability.constructor.name === 'AlreadyStarted')
        tooltip = "Already paying"
    else if(startability.constructor.name === 'InViable') {

        let viability = startability.viability
        let constructorName = viability.constructor.name

        if(constructorName === 'NoJoyStreamPeerConnections')
            tooltip = "No JoyStream peers "
        else if(constructorName === 'NoSellersAmongJoyStreamPeers')
            tooltip = "No peer is selling"
        else if(constructorName === 'InSufficientNumberOfSellersInvited')
            tooltip = "Miniumum seller count not reached"
        else if(constructorName === 'InSufficientNumberOfSellersHaveJoined')
            tooltip = "Insufficient sellers have joined contract"
        else {

            // only leaves StartPaidDownloadViability.Viable, which should not be
            // possible when we are inviable. (symptom of bad code, should really refactor to separate
            // positive and negative viability types into groups)

            //assert(false)

            tooltip = 'impossible: should be inviable, instead was:  ' + constructorName

            console.log('impossible: should be inviable, instead was:  ' + constructorName)
        }

    } else if(startability.constructor.name === 'InsufficientFunds')
        tooltip = "Insufficient funds" + ( spvChainSynced ?  "" : ", wait for wallet to synch" )
    else {

        console.log('should not come here')

        //assert(startability instanceof Startability.CanStart)

        return null
    }

    return {
        icon : icon,
        tooltip : tooltip
    }
}

const BlockedStartBadge = (props) => {

    if(props.startability instanceof Startability.CanStart ||
        props.startability instanceof Startability.AlreadyStarted ||
        props.startability instanceof Startability.Stopped)
        return null

    let badgeProps = badgePropsFromStartability(props.startability, props.spvChainSynced)

    return (
        <Badge {...badgeProps}/>
    )
}

export default StartPaidDownloadingSection
