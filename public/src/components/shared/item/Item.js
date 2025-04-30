import React from "react";
import {Link} from "react-router-dom";

export default class Item extends React.Component {
    render() {
        return (
            <div className='item'>
                <div className="image-container">
                    <Link to={`/Product/${this.props.item.id.toString()}`} onClick={() => {window.scrollTo(0, 0);}}>
                        <img src={'/ProductImages/' + this.props.item.image} alt={this.props.item.title}></img>
                    </Link>
                </div>
                <Link to={`/Product/${this.props.item.id.toString()}` } onClick={() => {window.scrollTo(0, 0);}}>
                    <h2>{this.props.item.title}</h2>
                </Link>
                <p>{this.props.item.collection}</p>
                <b>{this.props.item.price} грн</b>
                <div className='add-to-cart' onClick={() => this.props.onAdd(this.props.item)}>В корзину</div>
            </div>
        )
    }
}