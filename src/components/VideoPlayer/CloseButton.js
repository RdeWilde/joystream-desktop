import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

const CloseButton = observer((props) => {

  const closeStyle = {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 12,
    height: 12,
    backgroundImage: 'url("./assets/icon/close.svg")',
    zIndex: 99
  }

  const onClick = () => { props.torrent.close() }

  return (
    <a style={closeStyle} onClick={onClick}></a>
  )
})

CloseButton.propTypes = {
    torrent : PropTypes.object.isRequired, // TorrentStore really
}

export default CloseButton
