import React from "react";
import {useNavigate} from "react-router";
import ImageUploading from 'react-images-uploading';
import axios from "axios";

export default function Profile({user, logOut, setCurrentUser}) {
    const navigate = useNavigate()

    const userLogOut = () => {
        logOut()
        navigate("/")
    }

    const [image, setImage] = React.useState([]);

    const onChange = (imageList, addUpdateIndex) => {
        console.log(imageList, addUpdateIndex);

        if (imageList.length === 0) {
            deleteImage()
        } else {
            updateImage(imageList)
        }
        setImage(imageList);
    };

    const deleteImage = () => {
            axios.delete(`/deleteImage/${encodeURI(user.profileImage)}`).then((response) => {
                const updatedUser = {
                    ...user,
                    profileImage: "",
                };

                updateUserInformation(updatedUser);
                setCurrentUser(user.id, updatedUser)
            }).catch((deleteError) => {
                console.log("Помилка при видаленні картинки", deleteError);
            });
    }

    const updateImage = (imageList) => {
        let formData = new FormData();
        formData.append('file', imageList[0].file);

        axios.post('/uploadImage', formData)
            .then((response) => {
                console.log('Картинку завантажено вдало', response.data);

                const updatedUser = {
                    ...user,
                    profileImage: response.data.imageUrl,
                };

                updateUserInformation(updatedUser)
                setCurrentUser(user.id, updatedUser)
            })
            .catch((uploadError) => {
                console.error('Помилка при відправленні картинки', uploadError);
            });
    }

    const updateUserInformation = (updatedUser) => {
        axios.put(`/Data/users/${user.id}`, updatedUser)
            .then((putResponse) => {
                console.log('Інформацію користувача оновлено вдало', putResponse.data);
            })
            .catch((putError) => {
                console.error('Помилка при оновленні даних', putError);
            });
    }


    return (
        <div className={"profile"}>
            <div className={"side-bar"}>
                <div className="username">Ім'я: {user.username}</div>
                <div className="image-container">
                    <ImageUploading
                        multiple
                        value={image}
                        onChange={onChange}
                        maxNumber={1}
                        dataURLKey="data_url"
                    >
                        {({
                              imageList,
                              onImageUpload,
                              onImageUpdate,
                              onImageRemove,
                              isDragging,
                              dragProps,
                          }) => (
                            <div className="upload__image-wrapper">
                                {(imageList.length === 0 && user.profileImage === "") && (
                                    <button
                                        className={"image-putter"}
                                        style={isDragging ? { backgroundColor: '#ececec' } : undefined}
                                        onClick={onImageUpload}
                                        {...dragProps}
                                    >
                                        Натисніть або перетягніть картинку
                                    </button>
                                )}
                                &nbsp;
                                {(user.profileImage !== "" && imageList.length === 0) && (
                                    <div className="image-item">
                                        <img src={`/UsersImages/${user.profileImage}`} alt="Фото користувача" />
                                        <div className="image-item__btn-wrapper">
                                            <button onClick={() => onImageUpdate(0)}>Зінити</button>
                                            <button onClick={() => onImageRemove(0)}>Видалити</button>
                                        </div>
                                    </div>
                                )}
                                {imageList.map((image, index) => (
                                    <div key={index} className="image-item">
                                        <img src={image['data_url']} alt="Фото користувача" />
                                        <div className="image-item__btn-wrapper">
                                            <button onClick={() => onImageUpdate(index)}>Зінити</button>
                                            <button onClick={() => onImageRemove(index)}>Видалити</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ImageUploading>
                </div>
            </div>
            <div className={"main-bar"}>
                <div className="log-out-wrapper">
                    <div className='log-out' onClick={() => userLogOut()}>Вийти</div>
                </div>
            </div>
        </div>
    );
}