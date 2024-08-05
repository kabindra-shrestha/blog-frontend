import React from 'react';
import {Link} from "react-router-dom";
import AppBar from "@mui/material/AppBar/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MoreIcon from '@mui/icons/MoreVert';
import {routeConstants} from "../_constants";
import {makeStyles, withStyles} from "@mui/material/styles";
import {green, red, yellow} from "@mui/material/colors";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    customBadgeUserVerified: {
        backgroundColor: green.A400,
        color: green.A400
    },
    customBadgeUserVerificationPending: {
        backgroundColor: yellow.A400,
        color: yellow.A400
    },
    customBadgeUserNotVerified: {
        backgroundColor: red.A400,
        color: red.A400
    },
}));

const StyledBadge = withStyles((theme) => ({
    badge: {
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
        margin: 'auto',
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))(Badge);

function userVerificationStatus(userVerified, classes) {
    switch (userVerified) {
        case 1:
            return classes.customBadgeUserVerified;
        case 2:
            return classes.customBadgeUserVerificationPending;
        case 0:
            return classes.customBadgeUserNotVerified;
        default:
            return classes.customBadgeUserNotVerified;
    }
}

export default function AppBarNavigation({title}) {
    const classes = useStyles();

    const usersData = JSON.parse(localStorage.getItem('userData'));

    const [profileMoreAnchorEl, setProfileMoreAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(profileMoreAnchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        event.preventDefault();

        setProfileMoreAnchorEl(event.currentTarget);
    };

    const handleMobileMenuOpen = (event) => {
        event.preventDefault();

        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleProfileMenuClose = () => {
        setProfileMoreAnchorEl(null);
        handleMobileMenuClose();
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={profileMoreAnchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={menuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMenuOpen}
            onClose={handleProfileMenuClose}>
            <MenuItem onClick={handleProfileMenuClose} component={Link}
                      to={routeConstants.PROFILE_URL}>Profile</MenuItem>
            <MenuItem onClick={handleProfileMenuClose} component={Link}
                      to={routeConstants.LOGIN_URL}>Logout</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit">
                    <StyledBadge
                        overlap="circle"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        variant="dot"
                        classes={{badge: userVerificationStatus(usersData.userVerified, classes)}}>
                        <Avatar src={usersData.avatar}/>
                    </StyledBadge>
                </IconButton>
                <p>My Account</p>
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit"
                                aria-label="menu">
                        <img src="/favicon.ico" width="25" height="25" alt="brand"/>
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        {title}
                    </Typography>
                    <div className={classes.root}/>
                    <div className={classes.sectionDesktop}>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit">
                            <StyledBadge
                                overlap="circle"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                variant="dot"
                                classes={{badge: userVerificationStatus(usersData.userVerified, classes)}}>
                                <Avatar src={usersData.avatar}/>
                            </StyledBadge>
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit">
                            <MoreIcon/>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </div>
    );
}