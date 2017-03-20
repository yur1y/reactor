import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Meteor} from 'meteor/meteor';

import '../../../client/main.html';
import Layout from '../../ui/layouts/Layout';
import {NotFound} from '../../ui/pages/Not-Found';
import Hello from '../../ui/pages/Hello';

import GroupsList from '../../ui/components/groups/GroupsList';
import GroupDetails from '../../ui/components/groups/GroupDetails';
import GroupEdit from '../../ui/components/groups/GroupEdit';

import EventsList from '../../ui/components/events/EventList';
import EventDetails from '../../ui/components/events/EventDetails';
import EventEdit  from '../../ui/components/events/EventEdit';
import Account   from '../../ui/components/users/Account';
Meteor.startup(() => {

    render(
        <Router history={browserHistory}>

            <Route path='/' component={Layout}>
                <IndexRoute component={Hello}/>
                <Route path="/groups" component={GroupsList}/>
                <Route path='/groups/:group' component={GroupDetails}/>
                <Route path='/groups/:group/edit' component={GroupEdit}/>
                <Route path="/events" component={EventsList}/>
                <Route path='/events/:event' component={EventDetails}/>
                <Route path='/events/:event/edit' component={EventEdit}/>
                <Route path="/account" component={Account} />
            </Route>
            <Route path="*" component={NotFound}/>
        </Router>
        ,
        document.getElementById('render-target')
    );
});