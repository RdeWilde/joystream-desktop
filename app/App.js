import React, { Component } from 'react'
import { Joystream, TorrentInfo, StateT } from '../../../'
var debug = require('debug')('electron:app')


var joystream = new Joystream({
  db: 'leveldb',
  prefix: '/home/lola/joystream/test',
  network : 'testnet'
})

class App extends Component {

  constructor (props) {
    super(props)

    this.addTorrent = this.addTorrent.bind(this)
    this.addTorrentFile = this.addTorrentFile.bind(this)
    this.torrentAdded = this.torrentAdded.bind(this)

    this.state = {
      torrents: new Map()
    }
  }

  addTorrentFile () {
    let addTorrentParams = {
      ti: new TorrentInfo('/home/lola/joystream/test/306497171.torrent'),
      savePath: '/home/lola/joystream/test/'
    }

    joystream.addTorrent(addTorrentParams, this.torrentAdded)

  }

  addTorrent () {

    let addTorrentParams = {
      infoHash: '6a9759bffd5c0af65319979fb7832189f4f3c35d',
      name: 'sintel.mp4',
      savePath: '/home/lola/joystream/test/'
    }

    joystream.addTorrent(addTorrentParams, this.torrentAdded)
  }

  torrentAdded (err, smth) {
    if (err) {
      console.log(err)
    } else {
      this.setState({torrents: joystream.torrents})
    }
  }

  render () {
    let rows = [];

    console.log(joystream)

    this.state.torrents.forEach((torrent, infoHash) => {
      var torrentHandle = torrent.handle
      var torrentInfo = torrentHandle.torrentFile()
      var status = torrentHandle.status()

      if (!torrentInfo) {
        // torrent_info not yet set need to come from peers
        torrent.on('metadata_received_alert', (torrentInfo) => {
          this.forceUpdate()
        })
      } else {

        torrent.on('state_update_alert', (state, progress) => {
          this.forceUpdate()
        })

        torrent.on('torrent_finished_alert', () =>{
          this.forceUpdate()
        })

        var statusText = StateT.properties[status.state].name

        rows.push(
          <tr key={torrentHandle.infoHash()}>
            <td>{torrentInfo.name()}</td>
            <td>{Number(torrentInfo.totalSize() / 1000000).toFixed(2)} Mb</td>
            <td>{Number(status.progress*100).toFixed(0)}%</td>
            <td>{statusText}</td>
          </tr>)
      }
    })

    return (
      <div className="container">
        <h1>Joystream</h1>
        <br/>
        <a href="#" onClick={this.addTorrent} > Add a torrent </a>
        <br/>
        <a href="#" onClick={this.addTorrentFile} > Add a torrent with torrent file </a>
        <br/>
        <br/>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Size</th>
              <th>Progress</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            { rows }
          </tbody>
        </table>
      </div>
    )
  }
}

export default App
