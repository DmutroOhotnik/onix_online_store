import React from "react";
import * as Yup from "yup";
import {useFormik} from "formik";
import {useNavigate} from "react-router";

const RegistrationSchema = Yup.object().shape({
    username: Yup.string().min(2, "Кількість літер має перевищувати 2").required("Ім'я відсутнє"),
    password: Yup.string().min(8, "Введіть пароль більше 8 символів").required("Пароль відсутній"),
    repeatPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Паролі не співпадають")
        .required("Повторення паролю відсутнє"),
    email: Yup.string().email("Ви ввели некоректний електронний адрес").required("Емейл відсутній"),
    phoneNumber: Yup.string().min(6, "Ви ввели некоректний телефонний номер"),
    address: Yup.string().min(10, "Ви ввели некоректну адресу"),
});

const Registration = ({users, setCurrentUser, createUser}) => {
    const navigate = useNavigate()

    const isUserAlreadyExists = (email, phoneNumber) => {
        return users.some((user) => user.email === email || user.phoneNumber === phoneNumber);
    };

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            repeatPassword: "",
            phoneNumber: "",
            email: "",
            address: "",
        },
        validationSchema: RegistrationSchema,
        onSubmit: (values) => {
            if (isUserAlreadyExists(values.email, values.phoneNumber)) {
                formik.setFieldError("general", "Такий користувач вже присутній в системі");
            } else {
                console.log("Форма подана успішно:", values);
                const user = {
                    id: users[users.length - 1].id + 1,
                    username: values.username,
                    password: values.password,
                    email: values.email,
                    phoneNumber: values.phoneNumber,
                    address: values.address,
                    profileImage: ""
                }
                createUser(user)
                console.log("Користувача внесено до системи")
                setCurrentUser(user.id, user)
                navigate("/")
            }
        },
    });

    return (
        <div className="register">
            <div className="page-container">
                <div className="register-heading">Реєстрація</div>
                <div className="user-data-input">
                    <div>
                        <input
                            className={formik.errors.username && formik.touched.username ? "error" : ""}
                            type="text"
                            placeholder={"Ім'я*"}
                            {...formik.getFieldProps("username")}
                        />
                        {formik.errors.username && formik.touched.username && <p>{formik.errors.username}</p>}
                    </div>
                    <div>
                        <input
                            className={formik.errors.password && formik.touched.password ? "error" : ""}
                            type="password"
                            placeholder={"Пароль*"}
                            {...formik.getFieldProps("password")}
                        />
                        {formik.errors.password && formik.touched.password && <p>{formik.errors.password}</p>}
                    </div>
                    <div>
                        <input
                            className={formik.errors.repeatPassword && formik.touched.repeatPassword ? "error" : ""}
                            type="password"
                            placeholder={"Повторіть пароль*"}
                            {...formik.getFieldProps("repeatPassword")}
                        />
                        {formik.errors.repeatPassword && formik.touched.repeatPassword && (
                            <p>{formik.errors.repeatPassword}</p>
                        )}
                    </div>
                    <div>
                        <input
                            className={formik.errors.email && formik.touched.email ? "error" : ""}
                            type="email"
                            placeholder={"Email*"}
                            {...formik.getFieldProps("email")}
                        />
                        {formik.errors.email && formik.touched.email && <p>{formik.errors.email}</p>}
                    </div>
                    <div>
                        <input
                            className={formik.errors.phoneNumber && formik.touched.phoneNumber ? "error" : ""}
                            type="text"
                            placeholder={"Номер телефону"}
                            {...formik.getFieldProps("phoneNumber")}
                        />
                        {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                            <p>{formik.errors.phoneNumber}</p>
                        )}
                    </div>
                    <div>
                        <input
                            className={formik.errors.address && formik.touched.address ? "error" : ""}
                            type="text"
                            placeholder={"Адреса"}
                            {...formik.getFieldProps("address")}
                        />
                        {formik.errors.address && formik.touched.address && <p>{formik.errors.address}</p>}
                    </div>
                </div>
                {formik.errors.general && (
                    <div className="general-error">{formik.errors.general}</div>
                )}
                <div className="submit-button">
                    <button onClick={formik.handleSubmit}>Створити акаунт</button>
                </div>
            </div>
        </div>
    );
};
export default Registration;