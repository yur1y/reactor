import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {createContainer} from 'meteor/react-meteor-data';
import {IndexLink, Link} from 'react-router';
import {Meteor} from 'meteor/meteor';

import {Items, ItemStore} from '../../../../imports/api/items/items.js';

import {UploadFS} from 'meteor/jalik:ufs';
import {ok, thisUrl} from  '../../../../imports/startup/both/helpers.js';

import {ItemEdit} from './ItemEdit';
import {itemInsert} from '../../../api/items/methods';
import {ItemCart} from './ItemCart';
import '../../stylesheets/navigation.less'

export class ItemsData extends Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
        $(document).ready(function () {
            $("#myTab a").click(function (e) {
                e.preventDefault();
                $(this).tab('show');
            });
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
        const cash = ReactDOM.findDOMNode(this.refs.cashInput).value.trim();
        const amount = ReactDOM.findDOMNode(this.refs.amountInput).value.trim();

        itemInsert(thisUrl(), name, cash, amount);

    }

    renderItems() {
        return this.props.items.map((item) => {
            return (<div key={item._id}>

                <div className="stitched">
                    <img height="100" width="100" src={item.url}/>
                    <p>name: {item.itemName}</p>
                    <p>price: {item.cash}$ </p>
                    <ItemCart key={item._id+'cart'} user={this.props.user} item={item}/>

                    { this.props.user === item.owner ?
                        (<ItemEdit key={item._id+'edit'} item={item} />) : ''
                    }
                </div>

            </div>)
        });
    }

    render() {
        return (
            <div className="container">


                <ul className="nav nav-tabs" id="myTab">
                    <li><a className="active glyphicon glyphicon-globe" href="#sectionA">Items</a></li>
                    <li><a className=" glyphicon glyphicon-plus" href="#sectionB">Add Item</a></li>
                </ul>
                <br/>
                <div className="tab-content">

                    <div id="sectionA" className="tab-pane fade in active">
                        {this.renderItems()}
                    </div>
                    <div id="sectionB" className="tab-pane fade in  ">

                        <form className="new-group" onSubmit={this.handleSubmit.bind(this)}>
                            <input type="text" required="required" minLength="3" className="form-control"
                                   placeholder="item name" ref="nameInput"/>

                            <input type="number" required="required" min='1' className="form-control"
                                   placeholder="price,$" ref="cashInput"/>

                            <input type="number" required="required" min="1" className="form-control"
                                   placeholder="amount" ref="amountInput"/>

                            <button className=" btn btn-default" type='submit'>
                                add item
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

ItemsData.propTypes = {
    items: PropTypes.array,
    user: PropTypes.string
};
export  default   createContainer(() => {
    Meteor.subscribe('items', thisUrl());
    return {
        items: Items.find({cash: {$exists: true}}, {sort: {createdAt: 1}}).fetch(),
        user: Meteor.userId()
    };
}, ItemsData);