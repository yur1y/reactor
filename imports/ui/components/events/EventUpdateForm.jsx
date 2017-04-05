import {Meteor} from 'meteor/meteor';
import React, {Component, PropTypes} from 'react';
import {Link, browserHistory} from 'react-router';
import {createContainer} from 'meteor/react-meteor-data';
import {getSlug} from 'meteor/ongoworks:speakingurl';
import {DateTimePicker} from 'meteor/alonoslav:react-datetimepicker-new';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

export class EventUpdateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: null, group: null, newDate: null,status:null
        }
    }
    updateEvent(event) {
        event.preventDefault();
        const name = event.target.nameInput.value;
        const date = this.state.newDate.format('MMMM DD, YYYY HH:mm');
        const status =this.state.status;

        if (name.length >= 3) {
            Meteor.call('events.update', this.state.event._id, name, date, this.state.event.name, status,
                function (err, res) {
                    if (!err) {
                        browserHistory.push(`/events/${getSlug(name)}/edit`);
                    }
                });
        }
    }
    removeEvent() {
        Meteor.call('events.remove', this.state.event._id);
        browserHistory.push('/events');
    }
    changeStatus(event, index, status){
        this.setState({status });
    }
    render() {
          const event =this.props.event;
            this.state.event=event;
            return (
                <form onSubmit={this.updateEvent.bind(this)}>
                    <TextField underlineShow={false} id='1' floatingLabelText="Event Name" fullWidth={true} name="nameInput"   defaultValue={event.name}/>
                    <br/>
                    <div>
                        <SelectField  onChange={this.changeStatus.bind(this)} name="statusInput" floatingLabelText='Choose event status' value={this.state.status} >
                            <MenuItem value={"ordering"} primaryText="Ordering"/>
                            <MenuItem value={"ordered"} primaryText="Ordered"/>
                            <MenuItem value={"delivering"} primaryText="Delivering"/>
                            <MenuItem value={"delivered"} primaryText="Delivered"/>
                        </SelectField>
                        <br/>
                        <DatePicker hintText={"Choose event date"||this.state.newDate.format('MMMM DD, YYYY HH:mm')}
                                    onChange={(event,date)=>{this.refs.timeInput.openDialog();this.state.newDate=moment(date,'MMMM DD, YYYY HH:mm');}}
                                    minDate={new Date()} ref='dateInput' name='dateInput'   mode="landscape"/>
                        <div  style={{'display':'none'}}>
                            <TimePicker format={'24hr'} onChange={(event,time)=>{
                                this.state.newDate.add(moment(time).hours(),'h').add(moment(time).minutes(),'m');
                            }} name="timeInput" ref="timeInput" min={new Date()} mode="landscape" /></div>
                    </div>
                    <div  > <RaisedButton fullWidth={true} onClick={this.removeEvent.bind(this)}
                                                                           label="Delete" />
                        <RaisedButton fullWidth={true}  type="submit" label="Update" />
                    </div>
                    <br/>
                </form>)
}}

EventUpdateForm.propTypes = {
    event: PropTypes.object.isRequired
};