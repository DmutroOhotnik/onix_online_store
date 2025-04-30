import React, {useState} from "react";
import {FaShoppingBag} from "react-icons/fa"
import Order from "../shared/order/Order";
import {Link} from "react-router-dom";

const showOrders = (props) => {
    let sum = 0
    props.orders.forEach(el => {
        sum += el.price
    })

    return (
        <div>
            {props.orders.map(el => (
                <Order onDelete={props.onDelete} key={el.id} item={el}/>
            ))}
            <p className='sum'> Загальна ціна = {sum} грн</p>
            <Link to={"/ProductOrder"} className="order">Замовити</Link>
        </div>
    )
}

const showEmptyBag = () => {
    return (
        <div className={'empty'}>
            <h2>Корзина пуста</h2>
        </div>
    )
}

const Header = (props) => {
    let [bagOpen, setBagOpen] = useState(false)

    const handleLink = () => {
        if (props.isLoggedIn) {
            return '/Profile'
        }
        return '/Authorization'
    };

    return (
        <header>
            <div>
                <span className='logo'>Kimberli</span>
                <ul className='navigation'>
                    <li><Link to={'/'}>На головну</Link></li>
                    <li><Link to={'/About'}>Про нас</Link></li>
                    <li><Link to={'/Contacts'}>Контакти</Link></li>
                    <li><Link to={handleLink()}>Профіль</Link></li>
                </ul>
                <FaShoppingBag onClick={() => setBagOpen(bagOpen = !bagOpen)}
                               className={`shop-bag-button ${bagOpen && 'active'}`}/>

                {bagOpen && (
                    <div className={'shop-bag'}>
                        {props.orders.length > 0 ? showOrders(props) : showEmptyBag()}
                    </div>
                )}
            </div>
            <hr/>
        </header>
    )
}

export default Header