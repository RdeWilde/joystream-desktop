/**
 * Created by bedeho on 23/10/2017.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Provider, observer, inject } from 'mobx-react'

import ViabilityOfPaidDownloadingTorrent from '../../core/Torrent/ViabilityOfPaidDownloadingTorrent'
import ViabilityOfPaidDownloadingSwarm from '../../core/Torrent/ViabilityOfPaidDownloadingSwarm'

function getColors(props, state) {

    if (props.torrent.viabilityOfPaidDownloadingTorrent instanceof ViabilityOfPaidDownloadingTorrent.CanStart) {

        if (state.hover)
            return {
                foreground : 'rgba(92, 254, 92, 0.7)',
                background : 'rgba(92, 254, 92, 0.4)'
            }
        else
            return {
                foreground : 'rgba(92, 184, 92, 0.7)',
                background : 'rgba(92, 184, 92, 0.3)'
            }

    } else if (props.torrent.viabilityOfPaidDownloadingTorrent instanceof ViabilityOfPaidDownloadingTorrent.AlreadyStarted) {
        return {
            foreground : 'hsla(180, 1%, 80%, 0.6)',
            background : 'hsla(180, 1%, 80%, 0.4)'
        }
    } else
        return {
            foreground : 'rgba(240, 173, 78, 1)',
            background : 'rgba(240, 173, 78, 0.4)'
        }

}

function getStyles(props, state) {

    let color = getColors(props, state)

    return {
        root : {
            display : 'flex',
            flexDirection : 'row',
            width : '310px',
            fontSize : '18px',
            color : color.foreground,
            border : '3px solid ' + color.foreground,
            borderRadius : '7px',
            fontWeight : 'bold',
            height : '70px',
            backgroundColor : color.background
        },
        iconContainer : {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex : '0 0 60px'
        },
        textContainer : {
            display : 'flex',
            borderLeft : '2px solid ' + color.foreground,
            flexDirection : 'column',
            flexGrow : 1,
            alignItems: 'center', //'flex-start', // vertical
            justifyContent: 'center' // horizontal
        },
        text :  {

        },
        subtext: {
            fontSize : '12px'
        },
        speedupSvgIcon : {
            color : color,
            height : '24px',
            width : '24px',
            margin: '0 5px 0 5px'
        }
    }

}

function getText(viabilityOfPaidDownloadingTorrent) {

    let text = null
    let subText = null

    if(viabilityOfPaidDownloadingTorrent instanceof ViabilityOfPaidDownloadingTorrent.AlreadyStarted)
        text = "Paying for speedup"
    else if(viabilityOfPaidDownloadingTorrent instanceof ViabilityOfPaidDownloadingTorrent.CanStart)
        text = "Pay for speedup"
    else {

        text = "Paid speedup unavailable"

        if(viabilityOfPaidDownloadingTorrent instanceof ViabilityOfPaidDownloadingTorrent.InsufficientFunds)
            subText = "Insufficient funds"
        else if(viabilityOfPaidDownloadingTorrent instanceof ViabilityOfPaidDownloadingTorrent.Stopped)
            subText = "Download stopped"
        else if(viabilityOfPaidDownloadingTorrent instanceof ViabilityOfPaidDownloadingTorrent.InViable) {

            if(viabilityOfPaidDownloadingTorrent.swarmViability instanceof ViabilityOfPaidDownloadingSwarm.NoJoyStreamPeerConnections)
                subText = "No JoyStream peers available"
            else if(viabilityOfPaidDownloadingTorrent.swarmViability instanceof ViabilityOfPaidDownloadingSwarm.NoSellersAmongJoyStreamPeers)
                subText = "No sellers among JoyStream peers"
            else if(viabilityOfPaidDownloadingTorrent.swarmViability instanceof ViabilityOfPaidDownloadingSwarm.InSufficientNumberOfSellersInvited)
                subText = "Insufficient number of sellers invited"
            else if(viabilityOfPaidDownloadingTorrent.swarmViability instanceof ViabilityOfPaidDownloadingSwarm.InSufficientNumberOfSellersHaveJoined)
                subText = "Insufficient number of sellers have joined"
            else if(viabilityOfPaidDownloadingTorrent.swarmViability instanceof ViabilityOfPaidDownloadingSwarm.Viable)
                assert(false) // <== not possible

        } else
            assert(false) // <== not possible
    }

    return {
        text : text,
        subText : subText
    }
}

import SvgIcon from 'material-ui/SvgIcon'

const SpeedupSvgIcon = (props) => {

    return (
        <SvgIcon viewBox={'0 0 24 24'} {...props}>
            <path d="M12,0C5.383,0,0,5.383,0,12s5.383,12,12,12s12-5.383,12-12S18.617,0,12,0z M11,3h2v3h-2V3z M6,13H3v-2h3V13z M12,15c-1.654,0-3-1.346-3-3c0-0.462,0.113-0.894,0.3-1.285L4.909,6.323l1.414-1.414l4.391,4.392C11.106,9.114,11.538,9,12,9 c1.654,0,3,1.346,3,3S13.654,15,12,15z M15.536,7.05l2.121-2.121l1.414,1.414L16.95,8.464L15.536,7.05z M18,13v-2h3v2H18z"></path>
        </SvgIcon>
    )
}

@observer
class StartPaidDownloadButton extends Component {

    constructor(props) {
        super(props)

        this.state = { hover : false }
    }

    handleMouseEnter = (props) => {
        this.setState({ hover : true })
    }

    handleMouseLeave = (props) => {
        this.setState({ hover : false })
    }

    handleClick = (props) => {

        console.log('handleClick')

        if(this.props.torrent.viabilityOfPaidDownloadingTorrent instanceof ViabilityOfPaidDownloadingTorrent.CanStart)
            this.props.torrent.startPaidDownload()

    }

    render() {

        let styles = getStyles(this.props, this.state)
        let texts = getText(this.props.torrent.viabilityOfPaidDownloadingTorrent)

        return (
            <div style={styles.root}
                 onClick={this.handleClick}
                 onMouseEnter={this.handleMouseEnter}
                 onMouseLeave={this.handleMouseLeave}>

                <div style={styles.iconContainer}>
                    <SpeedupSvgIcon style={styles.speedupSvgIcon}/>
                </div>

                <div style={styles.textContainer}>

                    <div style={styles.text}>
                        { texts.text }
                    </div>

                    {
                        texts.subText
                            ?
                            <div style={styles.subtext}>{texts.subText}</div>
                            :
                            null
                    }
                </div>


            </div>
        )
    }
}

StartPaidDownloadButton.propTypes = {
    torrent : PropTypes.object.isRequired // Instance of torrent store
}

export default StartPaidDownloadButton