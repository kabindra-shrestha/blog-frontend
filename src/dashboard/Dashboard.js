import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from "@mui/material";
import {withRouter} from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card/Card";

const useStyles = theme => ({
    paper: {
        margin: '1.5rem',
        borderWidth: '.2rem',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
    },
    content: {
        padding: '2rem 2rem !important',
        backgroundColor: theme.palette.card.background,
        borderRadius: '.3rem'
    },
    title: {
        fontSize: '3.5rem',
        fontWeight: 300,
        lineHeight: 1.2,
        marginBottom: '.5rem',
        marginTop: 0,
        display: 'block',
        marginBlockStart: '0.67em',
        marginBlockEnd: '0.67em',
        marginInlineStart: '0px',
        marginInlineEnd: '0px',
        color: theme.palette.text,
        textAlign: 'left'
    },
    quote: {
        fontSize: '1.25rem',
        fontWeight: 300,
        marginTop: 0,
        marginBottom: '1rem',
        display: 'block',
        marginBlockStart: '1em',
        marginBlockEnd: '1em',
        marginInlineStart: '0px',
        marginInlineEnd: '0px',
        lineHeight: 1.5,
        color: theme.palette.text,
        textAlign: 'left'
    },
    footer: {
        marginTop: 0,
        marginBottom: '1rem',
        display: 'block',
        marginBlockStart: '1em',
        marginBlockEnd: '1em',
        marginInlineStart: '0px',
        marginInlineEnd: '0px',
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.5,
        color: theme.palette.text,
        textAlign: 'left'
    },
    space: {
        marginBottom: '1.5rem!important',
        marginTop: '1.5rem!important',
        border: 0,
        borderTop: '1px solid rgba(0,0,0,.1)',
        boxSizing: 'content-box',
        height: 0,
    },
});

class Dashboard extends Component {

    render() {
        const {classes} = this.props;

        const usersData = JSON.parse(localStorage.getItem('userData'));

        return (<div>
                <Card className={classes.paper}>
                    <CardContent className={classes.content}>
                        <Typography className={classes.title} gutterBottom>
                            {usersData &&
                            <p>Hi {usersData.firstName + " " + usersData.lastName}!</p>}
                        </Typography>
                        <Typography className={classes.quote}>
                            <p>You're logged in with React & JWT!!</p>
                        </Typography>
                        <hr className={classes.space}/>
                        <Typography className={classes.footer}>
                            <p className="text-danger">STATUS: {usersData.status ? "True" : "False"}</p>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        );
    }

}

function mapStateToProps(state) {
    const {alert} = state;
    return {
        alert
    };
}

const connectedDashboardPage = withStyles(useStyles, {withTheme: true})(withRouter(connect(mapStateToProps)(Dashboard)));
export {connectedDashboardPage as Dashboard};