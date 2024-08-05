import React, {Component} from 'react';
import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    Container,
    CssBaseline,
    Link,
    TextField,
    Typography,
    withStyles
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons/LockOutlined';
import {loginActions} from "../_actions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {routeConstants} from "../_constants";

const useStyles = theme => ({
    paper: {
        margin: '1.5rem',
        borderWidth: '.2rem',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    spinner: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
});

class Login extends Component {

    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(loginActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({[name]: value});
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({submitted: true});
        const {username, password} = this.state;
        const {dispatch} = this.props;
        if (username && password) {
            dispatch(loginActions.login(username, password));
        }
    }

    render() {
        const {classes} = this.props;

        const {loggingIn} = this.props;
        const {username, password, submitted} = this.state;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            name="username"
                            label="Username"
                            type="text"
                            value={username}
                            autoComplete="email"
                            autoFocus
                            onChange={this.handleChange}
                            error={submitted && !username}
                            helperText={submitted && !username && "Username is required"}/>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={password}
                            autoComplete="current-password"
                            onChange={this.handleChange}
                            error={submitted && !password}
                            helperText={submitted && !password && "Password is required"}/>
                        {/*<FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />*/}
                        <Button
                            variant="contained"
                            fullWidth
                            type="submit"
                            color="primary"
                            className={classes.submit}>
                            Sign In
                        </Button>
                        {loggingIn &&
                        <CircularProgress className={classes.spinner}/>
                        }
                        {/*<Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>*/}
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright/>
                </Box>
            </Container>
        );
    }

}

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href={routeConstants.SITE_URL}>
                Kalon
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function mapStateToProps(state) {
    const {login} = state;
    const {loggingIn} = login;
    return {
        loggingIn
    };
}

const connectedLoginPage = withStyles(useStyles, {withTheme: true})(withRouter(connect(mapStateToProps)(Login)));
export {connectedLoginPage as Login};