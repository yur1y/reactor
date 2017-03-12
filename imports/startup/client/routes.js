import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Meteor} from 'meteor/meteor';

import '../../../client/main.html';
import Layout from '../../ui/layouts/layout';
import {NotFound} from '../../ui/pages/not-found';
import {Hello} from '../../ui/pages/hello';
import GroupsList from '../../ui/components/groups/GroupsList';
import GroupDetails from '../../ui/components/groups/GroupDetails';
import GroupEdit from '../../ui/components/groups/GroupEdit';

Meteor.startup(() => {

    render(
        <Router history={browserHistory}>

            <Route path='/' component={Layout}>
                <IndexRoute component={Hello}/>
                <Route path="/groups" component={GroupsList}/>
                <Route path='/groups/:group' component={GroupDetails} />
                <Route path='/groups/:group/edit' component={GroupEdit} />
            </Route>
            <Route path="*" component={NotFound}/>
        </Router>
        ,
        document.getElementById('render-target')
    );
});