/**
 * Created by bedeho on 24/09/17.
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'

import SvgIcon from 'material-ui/SvgIcon'

class AlertDialogButton extends Component {

    constructor(props) {
        super(props)

        this.state = { hover : false }
    }

    handleMouseEnter = (event) => {
        this.setState({ hover : true })
    }

    handleMouseLeave = (event) => {
        this.setState({ hover : false})
    }

    handleOnClick = (event) => {
        this.props.onClick(this.props.title, event)
    }

    render() {

        let style = {
            flex : 1,
            textAlign : 'center',
            padding : '15px',
            //fontWeight : this.state.hover ? 'bold' : 'normal',
            backgroundColor : this.state.hover ? lineColor : 'white'
        }

        return (
            <div style={style}
                 onMouseEnter={(event) => {this.handleMouseEnter(event)}}
                 onMouseLeave={(event) => {this.handleMouseLeave(event)}}
                 onClick={(event) => {this.handleOnClick(event)}}>
                {this.props.title}
            </div>
        )


    }
}

const Separator = (props) => {

    let style = {
        borderRight: '1px solid ' + lineColor
    }

    return (
        <div style={style}></div>
    )
}

const DefaultIcon = (props) => {

    return (
        <SvgIcon width="48" height="48" viewBox={'0 0 48 48'}>
            <path fill="none" stroke={titleColor} strokeWidth="4" strokeMiterlimit="10" d="M18,34.2c0.1,3.2,2.7,5.8,6,5.8 s5.9-2.6,6-5.8" strokeLinejoin="miter" strokeLinecap="butt"></path>
            <path fill="none" stroke={titleColor} strokeWidth="4" strokeMiterlimit="10" d="M46,40c0-3.7-2.1-11-8-14V16 c0-7.7-6.3-14-14-14S10,8.3,10,16v10c-6,3.1-8,10.3-8,14" strokeLinejoin="miter" strokeLinecap="butt"></path>
            <ellipse fill="none" stroke={titleColor} strokeWidth="4" strokeLinecap="square" strokeMiterlimit="10" cx="24" cy="40" rx="22" ry="6" strokeLinejoin="miter"></ellipse>
        </SvgIcon>
    )
}

let lineColor = 'hsla(0, 0%, 85%, 1)'
let titleColor = 'hsla(2, 64%, 84%, 1)'

function getStyles() {

    return {
        style : {},
        overlayStyle : {
            // the black background
        },
        titleStyle : {
            // title section
            fontSize: '30px',
            //fontWeight: 'bold',
            textAlign: 'center',
            backgroundColor: '#c9302c',
            color : titleColor,
            //paddingTop: '80px'
        },
        bodyStyle : {
            // actual inner content section
            padding: '0px',
            fontSize: '18px',
            fontFamily: 'Helvetica',
            backgroundColor: 'white'
        },
        paperProps : {
            style: {
                borderRadius: '10px',
                border : '1px solid hsla(2, 64%, 35%, 1)',
                backgroundColor: 'none', // to prevent artifact
                overflow : 'hidden'
            },
            zDepth : 1
        },
        contentStyle : {
            // main visible dialog container
            width: '400px',
        },
        actionsContainerStyle : {

        },
        buttonContainer: {
            display : 'flex',
            borderTop : '1px solid ' + lineColor,
            fontSize : '16px'
        },
        body : {
            padding : '40px',
            fontSize: '24px',
            fontWeight: 100,
            paddingTop: '20px',
            paddingBottom: '20px'
        },
        titleContainer : {
            paddingTop : '10px',
            fontSize: '24px',
            fontWeight: 100
        }
    }
}

const AlertDialog = (props) => {

    let styles = getStyles(props)

    // temporary build actions
    let buttons = []

    props.buttonTitles.forEach(function(element, index, array) {

        let button = (
            <AlertDialogButton title={element}
                               onClick={(event) => { props.buttonClicked(element, event)}}
                               key={element}
            />
        )

        buttons.push(button)

        // Add seperator so long as we are not on last button
        if(index < array.length-1)
            buttons.push(<Separator key={index}/>)
    })

    return (
        <Dialog
            title={(
                <div>
                    {props.SVGIcon}
                    <div style={styles.titleContainer}>{props.title}</div>
                </div>
            )
            }
            actions={null}
            modal={true}
            open={props.open}
            {...styles}
        >
            <div>
                <div style={styles.body}>
                    {props.body}
                </div>

                <div style={styles.buttonContainer}>
                    {
                        buttons
                    }
                </div>
            </div>
        </Dialog>
    )
}

AlertDialog.propTypes = {
    title : PropTypes.string.isRequired,
    body : PropTypes.node.isRequired,
    SVGIcon : PropTypes.node,
    open : PropTypes.bool.isRequired,
    buttonTitles : PropTypes.array.isRequired,
    buttonClicked : PropTypes.func.isRequired
}

AlertDialog.defaultProps = {
    SVGIcon : ( <DefaultIcon /> )
}

export default AlertDialog