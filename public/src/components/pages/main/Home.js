import React from "react";
import Collections from "../../section/Collections";
import Items from "../../shared/item/Items";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <Collections chooseCollection={this.props.chooseCollection}/>
                <Items items={this.props.currentItems} onAdd={this.props.addToOrder}/>
            </div>
        );
    }
}