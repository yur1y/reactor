import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Meteor} from 'meteor/meteor';

import '../../../client/main.html';
import Layout from '../../ui/layouts/Layout';
import {NotFound} from '../../ui/pages/Not-Found';
import {About} from '../../ui/pages/About';
import Hello from '../../ui/pages/Hello';

import GroupsPage from '../../ui/components/groups/GroupPage';
import GroupDetails from '../../ui/components/groups/GroupDetails';
import GroupEdit from '../../ui/components/groups/GroupEdit';

import EventPage from '../../ui/components/events/EventPage';
import EventDetails from '../../ui/components/events/EventDetails';
import EventEdit  from '../../ui/components/events/EventEdit';
import Account   from '../../ui/components/users/Account';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

Meteor.startup(() => {

    render(
        <MuiThemeProvider>
        <Router history={browserHistory}>

            <Route path='/' component={Layout}>
                <IndexRoute component={Hello}/>
                <Route path="/groups" component={GroupsPage}/>
                <Route path='/groups/:group' component={GroupDetails}/>
                <Route path='/groups/:group/edit' component={GroupEdit}/>
                <Route path="/events" component={EventPage}/>
                <Route path='/events/:event' component={EventDetails}/>
                <Route path='/events/:event/edit' component={EventEdit}/>
                <Route path="/account" component={Account}/>
                <Route path='/about' component={About}/>
            </Route>
            <Route path="*" component={NotFound}/>
        </Router>
        </MuiThemeProvider>
        ,
        document.getElementById('render-target')
    );
});