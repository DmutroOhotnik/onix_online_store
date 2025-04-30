import React from "react";
import {Link} from "react-router-dom";
import * as Yup from "yup";
import {useFormik} from "formik";
import {useNavigate} from "react-router";

const AuthorizationSchema = Yup.object().shape({
    email: Yup.string().email("Введіть коректний електронний адрес").required("Емейл відсутній"),
    password: Yup.string().required("Пароль відсутній"),
});

export default function Authorization({users, setCurrentUser}) {
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: AuthorizationSchema,
        onSubmit: (values) => {
            handleLogin(values);
        },
    });

    const handleLogin = ({email, password}) => {
        const user = users.find((user) => user.email === email);

        if (user && user.password === password) {
            console.log("Успішно авторизовано")
            setCurrentUser(user.id);
            navigate("/")
        } else {
            formik.setFieldError("general", "Ви ввели неправильний емейл або пароль. Будь ласка перевірте дані");
        }
    };

    return (
        <div className="sign-in">
            <div className="heading">Вхід</div>
            <div className="registration-link">
                Або <Link to={"/Registration"}>Реєстрація</Link>
            </div>
            <form onSubmit={formik.handleSubmit} className="data-entering">
                {formik.errors.general && <div className="general-error">{formik.errors.general}</div>}
                <div>
                    <input
                        className={formik.errors.email && formik.touched.email ? "error" : ""}
                        placeholder="Email*"
                        type="text"
                        {...formik.getFieldProps("email")}
                    />
                    {formik.errors.email && formik.touched.email && <p>{formik.errors.email}</p>}
                </div>
                <div>
                    <input
                        className={formik.errors.password && formik.touched.password ? "error" : ""}
                        placeholder="Пароль*"
                        type="password"
                        {...formik.getFieldProps("password")}
                    />
                    {formik.errors.password && formik.touched.password && <p>{formik.errors.password}</p>}
                </div>
                <div className="submit-button">
                    <button type="submit">Увійти</button>
                    <Link to={"/Forgot-Password"}></Link>
                </div>
            </form>
        </div>
    );
};