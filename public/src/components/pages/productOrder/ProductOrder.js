import React from "react";
import {CSSTransition} from 'react-transition-group';
import './Dialog.css';
import { v4 as uuidv4 } from 'uuid';

export default class ProductOrder extends React.Component {
    state = {
        errorMessages: {},
        userInfo: {
            name: "",
            phoneNumber: "",
            email: "",
            cardNumber: ""
        },
        deliveryMethods: {
            mail: false,
            courier: false,
            pickup: false
        },
        paymentMethod: {
            cash: false,
            online: false,
        },
        addressInfo: {
            city: "",
            address: ""
        },
        showDialog: false,
    }

    validateForm = () => {
        let isValid = true
        const error = {name: "", phoneNumber: "", email: "", delivery: "", payment: "", cardNumber: "", city: "", address: ""}
        const {userInfo, deliveryMethods, paymentMethod, addressInfo} = this.state

        isValid = this.handleEmptyInput(userInfo, deliveryMethods, paymentMethod, addressInfo, isValid, error)
        isValid = this.handleCorrectDataInput(userInfo, deliveryMethods, paymentMethod, addressInfo, isValid, error)

        if (!isValid) {
            return false
        }

        return isValid;
    }

    handleMainButtonClick = () => {
        if (this.validateForm()) {
            this.setState({showDialog: true})

            const orderForm = {
                orderId: uuidv4(),
                username:  this.state.userInfo.name,
                email: this.state.userInfo.email,
                cardNumber: this.state.userInfo.cardNumber,
                phoneNumber: this.state.userInfo.phoneNumber,
                deliveryMethod: this.state.deliveryMethods.pickup ? "pickup" : (this.state.deliveryMethods.mail ? "mail" : "courier"),
                paymentMethod: this.state.paymentMethod.online ? "online" : "cash",
                city: this.state.addressInfo.city,
                address: this.state.addressInfo.address,
                productsId: this.props.items.map(item => item.id)
            }

            this.props.createOrder(orderForm)
            console.log(orderForm)
            console.log("Замовлення зроблено успішно")
        } else {
            console.log("Виявлено помилки при оформленні замовлення");
        }
    }

    handleCorrectDataInput = (userInfo, deliveryMethods, paymentMethod, addressInfo, isValid, error) => {
        if(userInfo.name.length < 2 && userInfo.name.trim() !== ""){
            error.name = "Ви ввели некоретне ім'я"
            isValid = false
        }
        if(userInfo.phoneNumber.length < 6 && userInfo.phoneNumber.trim() !== ""){
            error.phoneNumber = "Ви ввели некоректний номер телефону"
            isValid = false
        }
        if(userInfo.email.length < 14 && userInfo.email.trim() !== ""){
            error.email = "Ви ввели некоретний електронний адрес"
            isValid = false
        }
        if(userInfo.cardNumber.length < 16 && paymentMethod.online === true){
            error.cardNumber = "Ви ввели некоректний номер карти"
            isValid = false
        }
        if(addressInfo.city.length < 3 && addressInfo.city.trim() !== ""){
            error.city = "Ви ввели некоректну назву міста"
            isValid = false
        }
        if(addressInfo.address.length < 10 && addressInfo.address.trim() !== ""){
            error.address = "Ви ввели некоректну адресу"
            isValid = false
        }

        return isValid
    }

    handleEmptyInput = (userInfo, deliveryMethods, paymentMethod, addressInfo, isValid, error) => {
        if (userInfo.name.trim() === "") {
            error.name = "Ім'я відсутнє"
            isValid = false
        }
        if (userInfo.phoneNumber.trim() === "") {
            error.phoneNumber = "Номер телефону відсутній"
            isValid = false
        }
        if (deliveryMethods.mail === false && deliveryMethods.courier === false && deliveryMethods.pickup === false) {
            error.delivery = "Поле доставки не заповнене"
            isValid = false
        }
        if (paymentMethod.cash === false && paymentMethod.online === false) {
            error.payment = "Поле оплати відсутнє"
            isValid = false
        }
        if(paymentMethod.online === true && userInfo.cardNumber.trim() === ""){
            error.cardNumber="Номер карти відсутній"
            isValid = false
        }
        if (addressInfo.address.trim() === "") {
            error.address = "Адрес відсутній"
            isValid = false
        }
        if (addressInfo.city.trim() === "") {
            error.city = "Місто відсутнє"
            isValid = false
        }

        this.setState({
            errorMessages: error
        }, () => {
            console.log(this.state.errorMessages)
        });
        return isValid
    }

    updateName = (newName) => {
        this.setState((prevState) => ({
            userInfo: {
                ...prevState.userInfo,
                name: newName,
            },
        }));
    };

    updatePhoneNumber = (newPhoneNumber) => {
        this.setState((prevState) => ({
            userInfo: {
                ...prevState.userInfo,
                phoneNumber: newPhoneNumber,
            },
        }));
    };

    updateEmail = (newEmail) => {
        this.setState((prevState) => ({
            userInfo: {
                ...prevState.userInfo,
                email: newEmail,
            },
        }));
    };

    updateCity = (newCity) => {
        this.setState((prevState) => ({
            addressInfo: {
                ...prevState.addressInfo,
                city: newCity,
            },
        }));
    };

    updateAddress = (newAddress) => {
        this.setState((prevState) => ({
            addressInfo: {
                ...prevState.addressInfo,
                address: newAddress,
            },
        }));
    };

    handleChooseMethodDelivery = (method) => {
        this.setState((prevState) => ({
            deliveryMethods: Object.fromEntries(
                Object.entries(prevState.deliveryMethods).map(([key, value]) => [
                    key,
                    key === method ? !value : false,
                ])
            ),
            errorMessages: {
                ...prevState.errorMessages,
                delivery: "",
            },
        }));


    };

    handleChoosePaymentMethod = (method) => {
        this.setState((prevState) => ({
            paymentMethod: Object.fromEntries(
                Object.entries(prevState.paymentMethod).map(([key, value]) => [
                    key,
                    key === method ? !value : false,
                ])
            ),
            errorMessages: {
                ...prevState.errorMessages,
                payment: "",
            },
        }));
    };

    addCard = (newCardNumber) => {
            this.setState((prevState) => ({
                userInfo: {
                    ...prevState.userInfo,
                    cardNumber: newCardNumber,
                },
            }))
    }

    render() {
        let sum = 0;
        this.props.items.forEach(el => {
            sum += el.price
        })

        return (
            <div className="order-container">
                <div className="header">Замовлення товару</div>
                <div className="delivery-info">
                    <div className="input-container">
                        <div className="header"><span>Дані:</span></div>
                        <div className="input-data">
                            <div>
                                <input className = {this.state.errorMessages.name && "error"}  placeholder="Ім'я*" value={this.state.userInfo.name}
                                       onChange={(text) => this.updateName(text.target.value)}/>
                                {this.state.errorMessages.name && <p>{this.state.errorMessages.name}</p>}
                            </div>
                            <div>
                                <input className = {this.state.errorMessages.phoneNumber && "error"} placeholder="Номер телефону*" value={this.state.userInfo.phoneNumber}
                                       onChange={(text) => this.updatePhoneNumber(text.target.value)}/>
                                {this.state.errorMessages.phoneNumber && <p>{this.state.errorMessages.phoneNumber}</p>}
                            </div>
                            <div>
                                <input className = {this.state.errorMessages.email && "error"} placeholder="Email" value={this.state.userInfo.email}
                                       onChange={(text) => this.updateEmail(text.target.value)}/>
                                {this.state.errorMessages.email && <p>{this.state.errorMessages.email}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="input-container">
                        <div className="header"><span>Оберіть метод доставки</span></div>
                        <div className="delivery-method-selector">
                            <div className={`select-container`}>
                                <div className="checkbox-container"><input className={this.state.errorMessages.delivery && "checkbox-error"} type="checkbox"
                                                                           checked={this.state.deliveryMethods.mail}
                                                                           onChange={() => this.handleChooseMethodDelivery("mail")}/>Доставка
                                    у відділення пошти
                                </div>
                                <p>Ціна за доставку визначається компанією перевезником</p>
                            </div>

                            <div className="select-container">
                                <div className="checkbox-container"><input className={this.state.errorMessages.delivery && "checkbox-error"} type="checkbox"
                                                                           checked={this.state.deliveryMethods.courier}
                                                                           onChange={() => this.handleChooseMethodDelivery("courier")}/>Доставка
                                    кур'єром
                                </div>
                                <p>Ціна за доставку визначається компанією перевезником</p>
                            </div>

                            <div className="select-container">
                                <div className="checkbox-container"><input className={this.state.errorMessages.delivery && "checkbox-error"} type="checkbox"
                                                                           checked={this.state.deliveryMethods.pickup}
                                                                           onChange={() => this.handleChooseMethodDelivery("pickup")}/>Самовивіз
                                </div>
                                <p>Безкоштовно</p>
                            </div>
                        </div>
                    </div>
                    <div className="input-container">
                        <div className="header"><span>Адреса доставки</span></div>
                        <div className="input-data">
                            <div>
                                <input className={this.state.errorMessages.city && "error"} placeholder="Місто*" value={this.state.addressInfo.city}
                                       onChange={(text) => this.updateCity(text.target.value)}/>
                                {this.state.errorMessages.city && <p>{this.state.errorMessages.city}</p>}
                            </div>
                            <div>
                                <input className={this.state.errorMessages.address && "error"} placeholder="Адреса*" value={this.state.addressInfo.address}
                                       onChange={(text) => this.updateAddress(text.target.value)}/>
                                {this.state.errorMessages.address && <p>{this.state.errorMessages.address}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="input-container">
                        <div className="header"><span>Метод оплати</span></div>
                        <div className="pay-method-container">
                            <div className="select-container">
                                <div className="checkbox-container"><input className={this.state.errorMessages.payment && "checkbox-error"} type="checkbox"
                                                                           checked={this.state.paymentMethod.cash}
                                                                           onChange={() => this.handleChoosePaymentMethod("cash")}/>Готівкою
                                </div>
                            </div>
                            <div className="select-container">
                                <div className="checkbox-container"><input className={this.state.errorMessages.payment && "checkbox-error"} type="checkbox"
                                                                           checked={this.state.paymentMethod.online}
                                                                           onChange={() => this.handleChoosePaymentMethod("online")}/>Онлайн
                                </div>
                            </div>
                            {this.state.paymentMethod.online === true ? (
                                <div className="input-data">
                                    <div>
                                        <input className={this.state.errorMessages.cardNumber && "error"}
                                               placeholder="Номер карти"
                                               value={this.state.userInfo.cardNumber}
                                               onChange={(newCardNumber)=>{this.addCard(newCardNumber.target.value)}}/>
                                        {this.state.errorMessages.cardNumber && <p>{this.state.errorMessages.cardNumber}</p>}
                                    </div>
                                </div>
                            ) : ""}
                        </div>

                    </div>
                </div>
                <div className="order-info">
                    <p>Загальна кількість замовлень складає: {this.props.items.length}</p>
                    <p>Загальна сума замовлення: {sum} грн</p>
                </div>
                <div className="create-order-button">
                    {this.state.showDialog && (
                        <CSSTransition
                            in={this.state.showDialog}
                            timeout={300}
                            classNames="dialog"
                            unmountOnExit
                        >
                            <div className="dialog">
                                <p>Дякуємо, що зробили замовлення! Скоро вам зателефонують для уточнення інформації щодо вашого замовлення</p>
                                <button onClick={() => {
                                    this.setState({showDialog: false})
                                    window.location.assign("/")
                                }}>
                                    На головну сторінку
                                </button>
                            </div>
                        </CSSTransition>
                    )}

                    <button onClick={() => this.handleMainButtonClick()}>
                        Замовити
                    </button>
                </div>
            </div>
        );
    }
}