/**
 * Created by bedeho on 11/10/2017.
 */

import React from 'react'
import PropTypes from 'prop-types'

import SvgIcon from 'material-ui/SvgIcon'
import IconButton from 'material-ui/IconButton'

const SlackIcon = (props) => {

    return (
        <SvgIcon {...props} viewBox={"0 0 48 48"}>
            <path fill="#E8A723" d="M31.12806,2.95564c-0.72973-2.24588-3.14193-3.47495-5.38779-2.74522s-3.47495,3.14192-2.74522,5.38779 l11.05633,34.01661c0.75905,2.09814,3.02547,3.27717,5.20114,2.65093c2.26931-0.6532,3.65282-3.0634,2.92856-5.29243 C42.15357,36.88866,31.12806,2.95564,31.12806,2.95564z"></path> <path fill="#3EB890" d="M13.99657,8.522c-0.72973-2.24588-3.14193-3.47495-5.38779-2.74522S5.13383,8.9187,5.86356,11.16458 l11.05633,34.01661c0.75905,2.09814,3.02547,3.27718,5.20114,2.65093c2.26931-0.65321,3.65281-3.0634,2.92856-5.29243 C25.02208,42.45502,13.99657,8.522,13.99657,8.522z"></path> <path fill="#E01765" d="M45.04435,31.12819c2.24588-0.72973,3.47495-3.14193,2.74522-5.38779s-3.14192-3.47495-5.38779-2.74522 L8.38517,34.05151c-2.09814,0.75905-3.27717,3.02547-2.65093,5.20114c0.6532,2.26931,3.0634,3.65281,5.29243,2.92856 C11.11134,42.1537,45.04435,31.12819,45.04435,31.12819z"></path> <path fill="#472A49" d="M15.47503,40.73585c2.21416-0.71942,5.06799-1.64669,8.13014-2.64164 c-0.71939-2.21407-1.64677-5.06822-2.6419-8.13092l-8.13067,2.64268L15.47503,40.73585z"></path> <path fill="#CC2027" d="M32.60652,35.16949c3.07377-0.99873,5.93052-1.92694,8.13013-2.64164 c-0.71952-2.21446-1.6471-5.06926-2.64244-8.13259l-8.13067,2.64268L32.60652,35.16949z"></path> <path fill="#70CADB" d="M39.478,13.9967c2.24588-0.72973,3.47495-3.14193,2.74522-5.38779 c-0.72973-2.24587-3.14192-3.47495-5.3878-2.74522L2.81881,16.92002c-2.09814,0.75905-3.27717,3.02547-2.65093,5.20114 c0.6532,2.26931,3.0634,3.65281,5.29243,2.92856C5.54498,25.02221,39.478,13.9967,39.478,13.9967z"></path> <path fill="#1A937D" d="M9.907,23.6049c2.21439-0.7195,5.06888-1.64698,8.1318-2.64218 c-0.99878-3.07391-1.92707-5.9309-2.6419-8.13092l-8.13233,2.64322L9.907,23.6049z"></path> <path fill="#65863A" d="M27.03849,18.03854c3.07442-0.99894,5.9318-1.92736,8.13181-2.64218 c-0.99903-3.07468-1.92754-5.93235-2.64244-8.13259l-8.13233,2.64323L27.03849,18.03854z"></path>
        </SvgIcon>
    )

}

const TelegramSvgIcon = (props) => {

    return (
        <SvgIcon {...props} viewBox={"0 0 240 240"}>
            <defs>
                <linearGradient id="b" x1="0.6667" y1="0.1667" x2="0.4167" y2="0.75">
                    <stop stopColor="#37aee2" offset="0"/>
                    <stop stopColor="#1e96c8" offset="1"/>
                </linearGradient>
                <linearGradient id="w" x1="0.6597" y1="0.4369" x2="0.8512" y2="0.8024">
                    <stop stopColor="#eff7fc" offset="0"/>
                    <stop stopColor="#fff" offset="1"/>
                </linearGradient>
            </defs>
            <circle cx="120" cy="120" r="120" fill="url(#b)"/>
            <path fill="#c8daea" d="m98 175c-3.8876 0-3.227-1.4679-4.5678-5.1695L82 132.2059 170 80"/>
            <path fill="#a9c9dd" d="m98 175c3 0 4.3255-1.372 6-3l16-15.558-19.958-12.035"/>
            <path fill="url(#w)" d="m100.04 144.41 48.36 35.729c5.5185 3.0449 9.5014 1.4684 10.876-5.1235l19.685-92.763c2.0154-8.0802-3.0801-11.745-8.3594-9.3482l-115.59 44.571c-7.8901 3.1647-7.8441 7.5666-1.4382 9.528l29.663 9.2583 68.673-43.325c3.2419-1.9659 6.2173-0.90899 3.7752 1.2584"/>
        </SvgIcon>
    )
}

const RedditSvgIgon = (props) => {

    return (
        <SvgIcon {...props} viewBox="0 0 48 48">
            <circle fill="#FFFFFF" cx="5.4563" cy="23.5596" r="4.53396"> </circle>
            <path d="M5.45596,29.01598C2.44736,29.01598,0,26.5678,0,23.5592s2.44736-5.45678,5.45596-5.45678 c3.00942,0,5.45678,2.44818,5.45678,5.45678S8.46538,29.01598,5.45596,29.01598z M5.45596,19.94756 c-1.99099,0-3.61082,1.62065-3.61082,3.61163s1.61983,3.61164,3.61082,3.61164S9.0676,25.55018,9.0676,23.5592 S7.44695,19.94756,5.45596,19.94756z"></path>
            <circle fill="#FFFFFF" cx="42.54347" cy="23.5596" r="4.53396"> </circle>
            <path d="M42.54322,29.01598c-3.0086,0-5.45596-2.44818-5.45596-5.45678s2.44736-5.45678,5.45596-5.45678 C45.55264,18.10242,48,20.55059,48,23.5592S45.55264,29.01598,42.54322,29.01598z M42.54322,19.94756 c-1.99099,0-3.61082,1.62065-3.61082,3.61163s1.61983,3.61164,3.61082,3.61164c1.99099,0,3.61163-1.62065,3.61163-3.61164 S44.53421,19.94756,42.54322,19.94756z"></path>
            <circle fill="#FFFFFF" cx="40.26978" cy="8.37873" r="3.57414"> </circle>
            <ellipse fill="#FFFFFF" cx="23.90088" cy="29.79505" rx="20.53705" ry="13.40051"> </ellipse>
            <path d="M25.30408,15.51977l2.81964-8.91428l7.65219,1.80152c0.01567,2.46589,2.02407,4.46805,4.49365,4.46805 c2.48013,0,4.49734-2.01721,4.49734-4.49652s-2.01721-4.49652-4.49734-4.49652c-1.84658,0-3.43384,1.12055-4.12526,2.7161 l-8.43107-1.98525c-0.4662-0.11143-0.94551,0.15895-1.09136,0.61942L23.3773,15.49007 C11.78769,15.678,2.44162,22.01546,2.44162,29.79435c0,7.8984,9.62638,14.32364,21.45924,14.32364 S45.3601,37.69275,45.3601,29.79435C45.3601,22.21364,36.48228,16.00584,25.30408,15.51977z M40.26956,5.72716 c1.46252,0,2.65219,1.18968,2.65219,2.65137s-1.18967,2.65137-2.65219,2.65137c-1.4617,0-2.65137-1.18968-2.65137-2.65137 S38.80787,5.72716,40.26956,5.72716z M23.90086,42.27284c-10.81524,0-19.61409-5.59771-19.61409-12.47849 c0-6.87915,8.79885-12.47685,19.61409-12.47685s19.61409,5.59771,19.61409,12.47685 C43.51495,36.67513,34.7161,42.27284,23.90086,42.27284z"></path> <path fill="#FF4500" d="M16.77315,23.85074c-1.824,0-3.30357,1.47956-3.30357,3.30356s1.47956,3.356,3.30357,3.356 c1.824,0,3.30356-1.532,3.30356-3.356S18.59715,23.85074,16.77315,23.85074z"></path> <path fill="#FF4500" d="M31.24591,23.85074c-1.824,0-3.30357,1.47956-3.30357,3.30356s1.47956,3.356,3.30357,3.356 c1.824,0,3.30356-1.532,3.30356-3.356S33.06991,23.85074,31.24591,23.85074z"></path> <path d="M31.74603,35.31335c-0.35968-0.35883-0.94391-0.35883-1.30524-0.00159c-1.25439,1.25354-3.35352,1.86316-6.41541,1.86316 c-0.00928,0-0.01697,0.00507-0.02618,0.00531c-0.00922-0.00024-0.01697-0.00531-0.02625-0.00531 c-3.06348,0-5.1618-0.60962-6.41541-1.86157c-0.36047-0.36047-0.9447-0.36047-1.30518,0 c-0.35968,0.36053-0.35968,0.94391,0.00079,1.30438c1.61658,1.61737,4.14178,2.40234,7.71979,2.40234 c0.00928,0,0.01703-0.00507,0.02625-0.00531c0.00922,0.00024,0.01691,0.00531,0.02618,0.00531 c3.57642,0,6.10162-0.78497,7.71979-2.4007C32.10571,36.25891,32.10651,35.67389,31.74603,35.31335z"></path>
        </SvgIcon>
    )
}

const CommunityButton = (props) => {

    let styles = {
        root : {
            display : 'flex',
            flexDirection: 'column',
        },
        title : {
            fontFamily : 'Arial',
            fontSize : '22px',
            color : 'white',
            backgroundColor: 'pink',
            textAlign : 'center',
            marginTop : '20px'
        }
    }

    return (
        <IconButton tooltip={props.title} onClick={props.onClick}>
            {props.icon}
        </IconButton>
    )
}

CommunityButton.propTypes = {
    title : PropTypes.string.isRequired,
    onClick : PropTypes.func.isRequired,
    icon : PropTypes.node.isRequired
}

function getStyles(props) {

    return {
        root : {
            display : 'flex',
            flexDirection : 'column',
            height : '100vh',
            backgroundColor: props.backgroundColor,
            alignItems : 'center',
            justifyContent : 'center'
        },
        title : {
            color: 'white',
            fontFamily: 'Arial',
            fontWeight: 'bold',
            fontSize: '30px',
            backgroundColor: 'hsla(219, 41%, 40%, 1)',
            padding: '10px 40px',
            borderRadius: '50px'
        },
        iconContainer : {
            display : 'flex',
            marginTop : '20px'
        },
        iconSpacer : {
            marginRight : '30px'
        },
        svgIcon : {
            width: '120px',
            height: '120px',
        },
        iconButton: {
            width: '240px',
            height: '240px',
            padding: '30px',
        },
    }
}

const Community = (props) => {

    let styles = getStyles(props)

    return (
        <div style={styles.root}>

            <div style={styles.title}>Join our community</div>

            <div style={styles.iconContainer}>

                <IconButton iconStyle={styles.svgIcon}
                            style={styles.iconButton}
                            onClick={() => { props.store.telegramClicked()}}>
                    <TelegramSvgIcon />
                </IconButton>

                {
                    /** Disabled until slack onboarding works

                    <div style={styles.iconSpacer}></div>

                    < IconButton iconStyle={styles.svgIcon}
                    style={styles.iconButton}
                    onClick={() => { props.store.slackClicked()}}>
                    <SlackIcon />
                    </IconButton>

                     */

                }

                <div style={styles.iconSpacer}> </div>

                <IconButton iconStyle={styles.svgIcon}
                            style={styles.iconButton}
                            onClick={() => { props.store.redditClicked()}}>
                    <RedditSvgIgon />
                </IconButton>

            </div>

        </div>
    )
}

Community.propTypes = {
    backgroundColor : PropTypes.string.isRequired,
    store : PropTypes.object.isRequired
}

export default Community
