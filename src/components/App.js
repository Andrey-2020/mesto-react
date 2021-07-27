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
    const [selectedCard, setSelectedCard] = React.useState([]);
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
        setSelectedCard(card);
    }


    function closeAllPopups() {
        document.querySelectorAll('.popup').forEach((item) => { item.classList.remove("popup_opened"); })
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsEditImagePopupOpen(false);
    }

    return (
        <div className="root">
            <Header />
            <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
            <Footer />
            <PopupWithForm name="edit" title="Редактировать профиль" children={
                <>
                    <fieldset className="form__input-container form__input-container_type_edit">
                        <input className="form__input form__input_type_name-input" type="text" name="name"
                            placeholder="Жак-Ив Кусто" defaultValue="" minLength="2" maxLength="40" required id="name-input" />
                        <span className="name-input-error form__input-error"></span>
                        <input className="form__input form__input_type_job-input" type="text" name="profession"
                            placeholder="Исследователь океана" defaultValue="" minLength="2" maxLength="200" id="profession-input"
                            required />
                        <span className="profession-input-error form__input-error"></span>
                    </fieldset>  <button className="form__button" type="submit" aria-label="submit">Сохранить</button> </>} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
            <PopupWithForm name="add" title="Новое место" children={
                <>
                    <fieldset className="form__input-container form__input-container_type_add">
                        <input className="form__input form__input_type_name" type="text" name="name" placeholder="Название"
                            minLength="2" maxLength="30" id="place-input" required />
                        <span className="place-input-error form__input-error"></span>
                        <input className="form__input form__input_type_link" type="url" name="link"
                            placeholder="Ссылка на картинку" defaultValue=" " id="url-input" required />
                        <span className="url-input-error form__input-error"></span>
                    </fieldset> <button className="form__button form__button_type_add" type="submit" aria-label="submit">Создать</button> </>} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
            <PopupWithForm name="confirm" title="Вы уверены?" children={
                <button className="form__button form__button_type_confirm" type="submit" aria-label="submit">Да</button>} />
            <PopupWithForm name="update-avatar" title="Обновить аватар" children={
                <>
                    <fieldset className="form__input-container form__input-container_type_update-avatar">
                        <input className="form__input form__input_type_url-avatar" type="url" name="avatar"
                            placeholder="Ссылка" minLength="2" maxLength="200" id="avatar-input" required />
                        <span className="avatar-input-error form__input-error"></span>
                    </fieldset>
                    <button className="form__button form__button_type_update-avatar" type="submit"
                        aria-label="submit">Сохранить</button></>} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
            <ImagePopup card={selectedCard} isOpen={isEditImagePopupOpen} onClose={closeAllPopups} />
        </div>
    );
}

export default App;
