import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {ItemEdit} from './ItemEdit';
import {ItemCart} from './ItemCart';

import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import {List,ListItem} from 'material-ui/List';

import Divider from 'material-ui/Divider';

import '../../stylesheets/main.less'


export class ItemsData extends Component {
    constructor(props) {
        super(props);
    }
    renderItems() {
        const styles = {
            root: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
            },
            gridList: {
                width: 550,
                height: 500,
                overflowY: 'auto',
            },
        };
       return (
           <div style={styles.root}>
               <GridList  cellHeight={200} style={styles.gridList}>
                   <Subheader>Available items</Subheader>

               {this.props.items.map((item)=>(
                   <GridTile key={item._id}
                   title={item.itemName}
                  subtitle={<span>cost:{item.cash}</span>}
                             actionIcon={<span style={{'marginBottom':'0px','marginLeft':'150px'}}>  <ItemCart   user={this.props.user} item={item}/>
                                 { this.props.user === item.owner ?
                                     (<span style={{'marginBottom':'30px','display':'block','marginRight':'20px'}}><ItemEdit   item={item} /></span>) : ''
                                         }</span>}
                   >  <img width={200} height={200} src={item.url} /></GridTile>
               ))}
               </GridList>
       </div>);
    }
    render(){
       return( <div>

            <Divider />
            <List>
                <Subheader key={'items_list'}>Items List</Subheader>
                {this.renderItems()}
            </List>
        </div>)
    }

}
ItemsData.propTypes = {
    items: PropTypes.array.isRequired,
    user: PropTypes.string.isRequired
};
