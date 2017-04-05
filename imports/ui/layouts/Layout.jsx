import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import { Link ,browserHistory} from 'react-router';
import  {LoginButtons}  from 'meteor/okgrow:accounts-ui-react';
import SAlertWrapper from '../../utils/SAlertWrapper';
import Profile from '../components/users/Profile';

import '../stylesheets/main.less';

import {Tabs, Tab} from 'material-ui/Tabs';

import FontIcon from 'material-ui/FontIcon';
export class Layout extends Component {
    constructor(props) {
        super(props);
        this.state={
            login:true
        };
        this.clickLink=this.clickLink.bind(this)
    }
    componentDidMount(){
        $('.loginClosed').click( ()=> {
            if(this.state.login===true){
                setTimeout(()=>{
                    $('#login-name-link').trigger('click');
                this.state.login =false;
                },1)
            }
        });
    }
    closeLogin(){
        $('.login-close-text').click();
            this.state.login=true
    }
    clickLink(link){
        this.closeLogin();
        browserHistory.push(link);
    }
    render() {
        const styles = {
            appBar: {
                flexWrap: 'wrap'
            },
            tabs: {width: '100%'},
            iconRight:{marginRight:'25%',
                display: 'block',
            width:'60%'},
            iconStyles :{
                color:'white',
            },
            login:{fontSize:'14px',fontColor:'white',    textTransform: 'uppercase'}
        };
        return ( <div> {this.props.user ?  <div><Tabs style={styles.tabs} >
                            <Tab   onClick={this.clickLink.bind(this,'/')}
                                icon={<FontIcon  className="material-icons"
                                                 style={styles.iconStyles}>home</FontIcon>}
                                label="Home"    />
            <Tab  onClick={  this.clickLink.bind(this,'/events')}
                                icon={<FontIcon  className="material-icons"
                                                 style={styles.iconStyles}>event</FontIcon>}
                              label="Events"    />
                            <Tab  onClick={this.clickLink.bind(this,'/groups')}
                                icon={<FontIcon  className="material-icons"
                                                 style={styles.iconStyles}>store</FontIcon>}
                                label="Groups"    />
                            <Tab  onClick={ this.clickLink.bind(this,'/account')}
                                icon={<FontIcon  className="material-icons"
                                                 style={styles.iconStyles}>account_circle</FontIcon>}
                                label="Account"     />
                            <Tab onClick={ this.clickLink.bind(this,'/about')}
                                icon={<FontIcon  className="material-icons"
                                                 style={styles.iconStyles}>keyboard</FontIcon>}
                                label="About"    />
                            <Tab className="loginClosed"
                                icon={!this.props.user?<FontIcon  className="material-icons"
                                                       style={styles.iconStyles}>face</FontIcon>:<Profile  name={false} user={this.props.user}/>}
                                label ={  <div style={styles.login}><LoginButtons  /></div> }
                                onClick={()=>{
                                    if($('#login-dropdown-list').is(':visible')){
                                        this.closeLogin();
                                    }else{$('#login-sign-in-link').trigger('click'); }
                                    } }
                            />
                        </Tabs>
        </div>:
            <div><Tabs style={styles.tabs} >
                <Tab onClick={this.closeLogin}
                     icon={<FontIcon  className="material-icons"
                                      style={styles.iconStyles}>home</FontIcon>}
                     label="Home"   containerElement={ <Link  to="/"/> } />

                <Tab onClick={this.closeLogin}
                     icon={<FontIcon  className="material-icons"
                                      style={styles.iconStyles}>keyboard</FontIcon>}
                     label="About"   containerElement={ <Link  to="/about"/> } />
                <Tab
                    icon={<FontIcon  className="material-icons"
                                     style={styles.iconStyles}>face</FontIcon>}
                    label ={  <div style={styles.login}><LoginButtons  /></div> }
                    onClick={()=>{
                        if($('#login-dropdown-list').is(':visible')){
                            this.closeLogin();
                        }else{$('#login-sign-in-link').trigger('click'); }
                    } }
                />
            </Tabs>
               </div>}
            <SAlertWrapper/>
            {this.props.children}
                </div>)
    }
}
Layout.propTypes = {
    user: PropTypes.object
};
export default createContainer(() => {
    if(Meteor.userId()){
        Meteor.subscribe('users');
    }
    return {
        user: Meteor.user()
    }
}, Layout)