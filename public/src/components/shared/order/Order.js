import React from "react";
import {FaTrash} from "react-icons/fa";

export default class Order extends React.Component {
    render() {
        return (
            <div className={'item'}>
                <img src={'/ProductImages/' + this.props.item.image} alt={this.props.item.title}></img>
                <h2>{this.props.item.title}</h2>
                <b>{this.props.item.price} грн</b>
                <FaTrash class="delete-icon" onClick={() => this.props.onDelete(this.props.item.id)}/>
            </div>
        )
    }
}