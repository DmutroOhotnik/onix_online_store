import React, {useState} from "react";
import {Link} from "react-router-dom";

export default function Footer() {
    const [email, setEmail] = useState("");
    const attachMainButton = () => {
        console.log(email)
        setEmail("")
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    return (
        <footer>
            <div className="subscribe">
                <div className='container-fluid'>
                    <div className='subscribe-icon'>&#128386;</div>
                    <div className='subscribe-header'><p>Підписка</p></div>
                    <div className='promotext'>Отримуйте тільки якісні статті!</div>
                    <div className='subscribe-form'>
                        <input placeholder='Email' value={email} onChange={handleEmailChange}/>
                        <button onClick={attachMainButton}>Підписатися</button>
                    </div>
                </div>
            </div>
            <div className="top-footer">
                <div className='content'>
                    <div className="logo">
                        Kimberli<br/>
                        <span>Jewelry House</span>
                    </div>
                    <div className='menu'>
                        <ul>
                            <li><Link to={"/Other"}>Доставка</Link></li>
                            <li><Link to={"/Other"}>Оплата</Link></li>
                            <li><Link to={"/Other"}>Публічний договір</Link></li>
                            <li><Link to={"/Other"}>Політика Конфіденційності</Link></li>
                            <li><Link to={"/Other"}>Поврення товару</Link></li>
                            <li><Link to={"/Other"}>Контакти</Link></li>
                            <li><Link to={"/Other"}>Сервіс</Link></li>
                            <li><Link to={"/Other"}>FAQ</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bottom-footer">© 2023 Kimberli</div>
        </footer>
    )
}