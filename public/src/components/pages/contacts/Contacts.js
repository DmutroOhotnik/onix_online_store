import React from "react";

export default class Contacts extends React.Component {
    render() {
        return (
            <div className="contacts">
                <div className="contacts-banners">
                    <div className="contacts-banner img1">
                        <div className="heading">РОБОТА В KIMBERLI JEWELRY HOUSE</div>
                        <div className="phone-number">+38 (063) 154 36 05</div>
                        <div className="email">hr@kimberli.ua</div>
                    </div>
                    <div className="contacts-banner img2">
                        <div className="heading">ВІДДІЛ МАРКЕТИНГУ</div>
                        <div className="email">marketing@kimberli.ua</div>
                    </div>
                </div>

                <div className="feedback">
                    <div className="feedback-heading">Зворотній зв'язок</div>
                    <div className="feedback-form">
                        <div className="user-inputs">
                            <input placeholder={"Ім'я"}></input>
                            <input placeholder={"Номер: +38(XXX)-XX-XX-XXX"}></input>
                        </div>
                        <textarea placeholder={"Повідомлення"}></textarea>
                        <button>Відправити</button>
                    </div>
                </div>
            </div>
        );
    }
}