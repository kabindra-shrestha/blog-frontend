import React, {Component} from 'react';
import {Button, CircularProgress, Container, CssBaseline, TextField, withStyles} from '@mui/material';
import {questionCreateActions} from "../../_actions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

const useStyles = theme => ({
    paper: {
        margin: '1.5rem',
        borderWidth: '.2rem',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
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

class QuestionCreate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            question: '',
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
        const {question} = this.state;
        const {dispatch} = this.props;
        if (question) {
            dispatch(questionCreateActions.questionCreate(question));
        }
    }

    render() {
        const {classes} = this.props;

        const {fetching} = this.props;
        const {question, submitted} = this.state;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="question"
                            name="question"
                            label="Question"
                            type="text"
                            value={question}
                            autoFocus
                            onChange={this.handleChange}
                            error={submitted && !question}
                            helperText={submitted && !question && "Question is required"}/>
                        <Button
                            variant="contained"
                            fullWidth
                            type="submit"
                            color="primary"
                            className={classes.submit}>
                            Submit
                        </Button>
                        {fetching &&
                        <CircularProgress className={classes.spinner}/>
                        }
                    </form>
                </div>
            </Container>
        );
    }

}

function mapStateToProps(state) {
    const {fetching} = state.questionCreate;
    return {
        fetching
    };
}

const connectedQuestionCreatePage = withStyles(useStyles, {withTheme: true})(withRouter(connect(mapStateToProps)(QuestionCreate)));
export {connectedQuestionCreatePage as QuestionCreate};