import React from "react";
import {useParams, useNavigate} from "react-router";


export default function ShowFullItem({items, onAdd, addOneElement}) {
    const {id} = useParams();
    const navigate = useNavigate();
    const product = items.find(item => item.id.toString() === id);

    if (!product) {
        return <p>Товар не знайдено</p>;
    }

    return (
        <div className={"show-full-item"}>
            <div className={"product-container"}>
                <div className={"product-image"}>
                    <img src={'/ProductImages/' + product.image} alt={product.title}></img>
                </div>
                <div className={"product-content"}>
                    <h1>{product.title + " " + product.productCode}</h1>
                    <div className={"product-info"}>
                        <p><span>Рейтинг:</span> 5</p>
                        <p><span>Бренд:</span> KIMBERLI</p>
                        <p><span>Артикул:</span> {product.productCode}</p>
                    </div>
                    <div className={"product-buy-field"}>
                        <div className="product-buy">
                            <div className={"product-buy-top"}>
                                <div className={"product-discount"}>Знижка: <span>0%</span></div>
                                <div className={"product-available"}><span>&#10004;</span>В наявності</div>
                            </div>
                            <div className={"product-buy-main"}>
                                <h1>{product.price} грн</h1>
                                <div className={"product-buttons"}>
                                    <div className={"product-button-1"}>
                                        <button className={"btn1"} onClick={() => {
                                            if (onAdd) onAdd(product)
                                        }}>В корзину
                                        </button>
                                        <button className={"btn2"} onClick={() => {
                                            addOneElement(product);
                                            navigate("/ProductOrder");
                                        }}>Замовити зараз
                                        </button>
                                    </div>
                                    <div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p><span>Про товар:</span> {product.description}</p>
                </div>
            </div>
        </div>
    );
};