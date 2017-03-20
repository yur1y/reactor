import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {IndexLink, Link} from 'react-router';
import  {LoginButtons}  from 'meteor/okgrow:accounts-ui-react';
import SAlertWrapper from '../../utils/SAlertWrapper';
import '../stylesheets/navigation.less';

export class Layout extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (   <div>
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                    data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"/>
                                <span className="icon-bar"/>
                                <span className="icon-bar"/>
                                <span className="icon-bar"/>
                            </button>
                            <Link className="navbar-brand  glyphicon glyphicon-home" to='/'>
                                Home</Link>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            {this.props.user ?
                                <ul className="nav navbar-nav">
                                    <li ><Link to="/events" className='glyphicon glyphicon-calendar'>Events<span
                                        className="sr-only"/></Link></li>
                                    <li><Link to="/groups" className='glyphicon glyphicon-globe'>Groups</Link></li>
                                    <li><Link to="/account" className='glyphicon glyphicon-user'>Account</Link></li>
                                </ul>
                                : ''}
                            <ul className="nav navbar-left">
                                <li>
                                    <LoginButtons  />
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div > <SAlertWrapper/></div>
                {this.props.children }
            </div>
        )
    }
}
Layout.propTypes = {
    user: PropTypes.string
};
export default createContainer(() => {
    return {
        user: Meteor.userId()
    }
}, Layout)