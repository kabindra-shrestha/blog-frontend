import React from 'react';
import {Link} from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Drawer from "@mui/material/Drawer/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon";
import ExitToAppIcon from '@mui/icons/ExitToApp';
import HomeIcon from '@mui/icons/Home';
import ListItemText from "@mui/material/ListItemText/ListItemText";
import Divider from "@mui/material/Divider";
import {routeConstants} from "../_constants";
import {AddCircle, ExpandLess, ExpandMore, Help, People, Person} from "@mui/icons";
import Collapse from "@mui/material/Collapse";
import {makeStyles} from "@mui/material/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export default function DrawerNavigation() {
    const classes = useStyles();
    const [isUserOpen, setIsUserOpen] = React.useState(false);
    const [isQuestionOpen, setIsQuestionOpen] = React.useState(false);

    const handleUserClick = () => {
        setIsUserOpen(!isUserOpen);
    };

    const handleQuestionClick = () => {
        setIsQuestionOpen(!isQuestionOpen);
    };

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <Toolbar/>
            <div className={classes.drawerContainer}>
                <List>
                    <ListItem button key={routeConstants.SITE} component={Link}
                              to={routeConstants.SITE_URL}>
                        <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                        <ListItemText primary={routeConstants.SITE}/>
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    <ListItem button key={routeConstants.DASHBOARD} component={Link}
                              to={routeConstants.DASHBOARD_URL}>
                        <ListItemIcon><HomeIcon/></ListItemIcon>
                        <ListItemText primary={routeConstants.DASHBOARD}/>
                    </ListItem>
                    <ListItem button onClick={handleUserClick}>
                        <ListItemIcon>
                            <Person/>
                        </ListItemIcon>
                        <ListItemText primary={routeConstants.USER}/>
                        {isUserOpen ? <ExpandLess/> : <ExpandMore/>}
                    </ListItem>
                    <Collapse in={isUserOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button key={routeConstants.USER_LIST} component={Link}
                                      to={routeConstants.USER_LIST_URL}
                                      className={classes.nested}>
                                <ListItemIcon>
                                    <People/>
                                </ListItemIcon>
                                <ListItemText primary={routeConstants.USER_LIST}/>
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem button onClick={handleQuestionClick}>
                        <ListItemIcon>
                            <Help/>
                        </ListItemIcon>
                        <ListItemText primary={routeConstants.QUESTION}/>
                        {isQuestionOpen ? <ExpandLess/> : <ExpandMore/>}
                    </ListItem>
                    <Collapse in={isQuestionOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button key={routeConstants.QUESTION_CREATE} component={Link}
                                      to={routeConstants.QUESTION_CREATE_URL}
                                      className={classes.nested}>
                                <ListItemIcon>
                                    <AddCircle/>
                                </ListItemIcon>
                                <ListItemText primary={routeConstants.QUESTION_CREATE}/>
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
            </div>
        </Drawer>
    );
}