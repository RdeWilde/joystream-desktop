import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { StateT } from 'joystream-node'

import TorrentList from '../TorrentList/'
import AddTorrentForm from '../AddTorrentForm'

@inject('sessionStore')
@observer
class Downloading extends Component {
  render () {
    return (
      <div style={{marginTop: '20px'}} className="col-10">
        <h3>Downloading</h3>
        <br />
        <AddTorrentForm />
        <br />
        <br />
        <TorrentList torrents={this.props.sessionStore.torrents} status={StateT.DOWNLOADING} />
      </div>
    )
  }
}

export default Downloading