import React from 'react';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithConfirm from './PopupWithConfirm'
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import api from '../utils/api';
function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditImagePopupOpen, setIsEditImagePopupOpen] = React.useState(false);
    const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
    const [idDeleteCard, setIdDeleteCard] = React.useState('');
    const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
    const [currentUser, setCurrentUser] = React.useState({ name: '', about: '', avatar: '', _id: '' })
    const [cards, setCards] = React.useState([]);


    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }
    function handleConfirmDeleteClick(deleteCard) {
        setIsConfirmPopupOpen(true);
        setIdDeleteCard(deleteCard._id);
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
        setIsConfirmPopupOpen(false);
        setIdDeleteCard('');
        setSelectedCard({ name: '', link: '' });
    }
    function handleUpdateUser(userData) {
        api.updateUserTask(userData, '')
            .then(() => {
                setCurrentUser({ name: userData.name, about: userData.about, avatar: currentUser.avatar, _id: currentUser._id })
                closeAllPopups();
            })
            .catch(err => console.log('Ошибка. Запрос не выполнен: ', err))

    }
    function handleUpdateAvatar(avatarData) {
        api.updateUserTask(avatarData, 'avatar')
            .then(() => {
                setCurrentUser({ name: currentUser.name, about: currentUser.about, avatar: avatarData.avatar, _id: currentUser._id });
                closeAllPopups();
            })
            .catch(err => console.log('Ошибка. Запрос не выполнен: ', err))
    }

    React.useEffect(() => {
        Promise.all([api.getUserTasks(), api.getCardTasks()])
            .then(([userInform, cards]) => {
                setCurrentUser(userInform);
                setCards(cards);
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен: ', err);
            })
    }, [])

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    }
    function handleAddCard(сardData) {
        api.createCardTask(сardData)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(err => console.log('Ошибка. Запрос не выполнен: ', err))
    }
    function handleCardDelete() {
        api.deleteTask(idDeleteCard)
            .then(() => {
                setCards(cards.filter((card) => { return card._id !== idDeleteCard }));
                closeAllPopups();
            })
            .catch(err => console.log('Ошибка. Запрос не выполнен: ', err))
    }
    return (
        <div className="root">
            <CurrentUserContext.Provider value={currentUser}>
                <Header />
                <Main cards={cards} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} onCardLike={handleCardLike} onDeleteClick={handleConfirmDeleteClick} />
                <Footer />
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} buttonText={"Создать"} onAddCard={handleAddCard} />
                <PopupWithConfirm isOpen={isConfirmPopupOpen} onClose={closeAllPopups} onDeleteCard={handleCardDelete} />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                <ImagePopup card={selectedCard} isOpen={isEditImagePopupOpen} onClose={closeAllPopups} />
            </CurrentUserContext.Provider>
        </div >
    );
}

export default App;
