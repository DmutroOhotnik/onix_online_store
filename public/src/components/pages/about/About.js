import React from "react";

export default class About extends React.Component {
    render() {
        return (
            <div className={"about-us"}>
                <div className="about-us-content">
                    <div className="image-content">
                        <img src="/AboutUs/about_history_preview.png" alt="about_history_preview"/>
                    </div>
                    <div className="text-content">
                        <h2>2006</h2>
                        <h1>Заснування Ювелірного дому KIMBERLI</h1>
                        <p>Бренд KIMBERLI був заснований в 2005 році, у Вінниці, ювелірній столиці України та кузні
                            майстрів ювелірної справи, відомої далеко за межами країни. Своїм ім'ям компанія віддає
                            належну повагу найбільшому в світі родовищу алмазів – місту Кімберлі в Південній Африці.
                            Воно стало символом, вагомим ім'ям в алмазній промисловості, та гордістю нації, завдяки
                            KIMBERLI JEWELRY HOUSE.</p>
                    </div>
                </div>

                <div className="about-us-content">
                    <div className="text-content">
                        <h2>20018</h2>
                        <h1>Основна спеціалізація компанії</h1>
                        <p>Основна спеціалізація компанії – виробництво ювелірних прикрас із дорогоцінними каменями
                            найвищої якості. Творчий підхід, майстерність, високі стандарти та найтонша ручна робота над
                            кожним виробом сприяли тому, що компанія швидко зайняла гідне місце серед виробників прикрас
                            класу LUX. Кажуть, що ми потрапили не лише в ТОП, а в саме серце та залишилися там
                            назавжди…</p>
                    </div>
                    <div className="image-content">
                        <img src="/AboutUs/about_history_preview2.png" alt="about_history_preview2"/>
                    </div>
                </div>

                <div className="about-us-content">
                    <div className="image-content">
                        <img src="/AboutUs/about_history_preview3.png" alt="about_history_preview3"/>
                    </div>
                    <div className="text-content">
                        <h2>2021</h2>
                        <h1>Сьогодні саме ми задаємо тон</h1>
                        <p>Минав час, ми росли та розвивалися. Для зручності клієнтів, крім оффлайн магазинів, маємо
                            сучасний інтернет-магазин, завдяки якому ексклюзивні ювелірні прикраси ручної роботи
                            доступні поціновувачам розкоші по всьому світу. Сьогодні саме ми задаємо тон в дизайні
                            прикрас виробникам України. Найкращі наші твори щорічно представляють український ювелірний
                            бренд на міжнародних виставках, незмінно одержуючи високі оцінки та винагороди.</p>
                    </div>
                </div>
            </div>
        );
    }
}