import React, {Component} from 'react';
import {connect} from 'react-redux';

import {userListActions} from '../../_actions';
import {CircularProgress, Paper, withStyles} from "@mui/material";
import {Link, withRouter} from "react-router-dom";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import {green, red, yellow} from "@mui/material/colors";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import {routeConstants} from "../../_constants";
import IconButton from "@mui/material/IconButton";

const useStyles = theme => ({
    paper: {
        margin: '1.5rem',
        borderWidth: '.2rem',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
    spinner: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
});

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

class UserList extends Component {

    constructor(props) {
        super(props);

        props.dispatch(userListActions.userList(0));

        this.handleChangePage = this.handleChangePage.bind(this);
    }

    handleChangePage = (event, newPage) => {
        this.props.dispatch(userListActions.userList(newPage));
    };

    userVerificationStatus(userVerified, classes) {
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

    render() {
        const {classes} = this.props;
        const {userList, userListData} = this.props;

        const column = 10;
        const count = (userListData && userListData.content.length > 0) && userListData.totalElements;
        const rowsPerPage = (userListData && userListData.content.length > 0) && userListData.size;
        const page = (userListData && userListData.content.length > 0) && userListData.number;

        return (
            <div className={classes.paper}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Avatar</TableCell>
                                <TableCell align="center">First Name</TableCell>
                                <TableCell align="center">Last Name</TableCell>
                                <TableCell align="center">User Name</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Age</TableCell>
                                <TableCell align="center">Gender</TableCell>
                                <TableCell align="center">Looking For</TableCell>
                                <TableCell align="center">Current City</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userList.fetching &&
                            <TableRow>
                                <TableCell colSpan={column} align="center">
                                    <CircularProgress className={classes.spinner}/>
                                </TableCell>
                            </TableRow>}
                            {userListData && userListData.content.length > 0 ? userListData.content.map((userListContent) =>
                                    <TableRow key={userListContent.username}>
                                        <TableCell component="th" scope="row" align="center">
                                            <IconButton
                                                edge="end"
                                                aria-label="avatar"
                                                color="inherit"
                                                component={Link}
                                                to={routeConstants.USER_DETAIL_URL + "/" + userListContent.username}>
                                                <StyledBadge
                                                    overlap="circle"
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'right',
                                                    }}
                                                    variant="dot"
                                                    classes={{badge: this.userVerificationStatus(userListContent.userVerified, classes)}}>
                                                    <Avatar src={userListContent.avatar}/>
                                                </StyledBadge>
                                            </IconButton>
                                        </TableCell>
                                        <TableCell component="th" scope="row" align="center">
                                            {userListContent.firstName}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align="center">
                                            {userListContent.lastName}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align="center">
                                            {userListContent.username}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align="center">
                                            {userListContent.name}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align="center">
                                            {userListContent.email}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align="center">
                                            {userListContent.age}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align="center">
                                            {userListContent.gender}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align="center">
                                            {userListContent.lookingFor}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align="center">
                                            {userListContent.currentCity}
                                        </TableCell>
                                    </TableRow>
                                ) :
                                !userList.fetching &&
                                <TableRow>
                                    <TableCell colSpan={column} align="center">
                                        No Users Available
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                        {(userListData && userListData.content.length > 0) &&
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[count]}
                                    colSpan={column}
                                    count={count}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: {'aria-label': 'rows per page'},
                                        native: true,
                                    }}
                                    onChangePage={this.handleChangePage}
                                />
                            </TableRow>
                        </TableFooter>
                        }
                    </Table>
                </TableContainer>
            </div>
        );
    }

}

function mapStateToProps(state) {
    const {userList} = state;
    const {userListData} = userList;
    return {
        userList,
        userListData
    };
}

const connectedUserListPage = withStyles(useStyles, {withTheme: true})(withRouter(connect(mapStateToProps)(UserList)));
export {connectedUserListPage as UserList};