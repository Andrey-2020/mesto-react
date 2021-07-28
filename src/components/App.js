import React from 'react';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditImagePopupOpen, setIsEditImagePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setIsEditImagePopupOpen(true);
        setSelectedCard({ name: card.name, link: card.link });
    }


    function closeAllPopups() {
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsEditImagePopupOpen(false);
        setSelectedCard({ name: '', link: '' });
    }

    return (
        <div className="root">
            <Header />
            <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
            <Footer />
            <PopupWithForm name="edit" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} buttonText={"Сохранить"}>
                <fieldset className="form__input-container form__input-container_type_edit">
                    <input className="form__input form__input_type_name-input" type="text" name="name"
                        placeholder="Жак-Ив Кусто" defaultValue="" minLength="2" maxLength="40" required id="name-input" />
                    <span className="name-input-error form__input-error"></span>
                    <input className="form__input form__input_type_job-input" type="text" name="profession"
                        placeholder="Исследователь океана" defaultValue="" minLength="2" maxLength="200" id="profession-input"
                        required />
                    <span className="profession-input-error form__input-error"></span>
                </fieldset>
            </PopupWithForm>
            <PopupWithForm name="add" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} buttonText={"Создать"}>
                <fieldset className="form__input-container form__input-container_type_add">
                    <input className="form__input form__input_type_name" type="text" name="name" placeholder="Название"
                        minLength="2" maxLength="30" id="place-input" required />
                    <span className="place-input-error form__input-error"></span>
                    <input className="form__input form__input_type_link" type="url" name="link"
                        placeholder="Ссылка на картинку" defaultValue=" " id="url-input" required />
                    <span className="url-input-error form__input-error"></span>
                </fieldset>
            </PopupWithForm>
            <PopupWithForm name="confirm" title="Вы уверены?" buttonText={"Да"} />
            <PopupWithForm name="update-avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} buttonText={"Сохранить"}>
                <fieldset className="form__input-container form__input-container_type_update-avatar">
                    <input className="form__input form__input_type_url-avatar" type="url" name="avatar"
                        placeholder="Ссылка" minLength="2" maxLength="200" id="avatar-input" required />
                    <span className="avatar-input-error form__input-error"></span>
                </fieldset>
            </PopupWithForm>
            <ImagePopup card={selectedCard} isOpen={isEditImagePopupOpen} onClose={closeAllPopups} />
        </div >
    );
}

export default App;
