import React from 'react';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import api from '../utils/api';
function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditImagePopupOpen, setIsEditImagePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
    const [currentUser, setCurrentUser] = React.useState({ name: '', about: '', avatar: '', _id: '' })
    const [cards, setCards] = React.useState([]);
    React.useEffect(() => {
        api.getUserTasks()
            .then((userInform) => {
                setCurrentUser({ name: userInform.name, about: userInform.about, avatar: userInform.avatar, _id: userInform._id });
            })
            .catch(err => console.log('Ошибка. Запрос не выполнен: ', err))
    }, []);

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
    function handleUpdateUser(userData) {
        api.updateUserTask(userData, '')
            .then(() => {
                setCurrentUser({ name: userData.name, about: userData.about, avatar: currentUser.avatar, _id: currentUser._id });
                closeAllPopups();
            }
            )
    }
    function handleUpdateAvatar(avatarData) {
        api.updateUserTask(avatarData, 'avatar')
            .then(() => {
                setCurrentUser({ name: currentUser.name, about: currentUser.about, avatar: avatarData.avatar, _id: currentUser._id });
                closeAllPopups();
            }, '')
    }

    function handleCardDelete(deleteCard) {
        api.deleteTask(deleteCard._id).then(() => {
            setCards(cards.filter((card) => { return card._id !== deleteCard._id }));
        })
    }
    React.useEffect(() => {
        api.getCardTasks()
            .then((cards) => {
                setCards(cards);
            })
            .catch(err => console.log('Ошибка. Запрос не выполнен: ', err))
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
    return (
        <div className="root">
            <CurrentUserContext.Provider value={currentUser}>
                <Header />
                <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
                <ul className="places">
                    {cards.map((card) => (
                        <Card card={card} key={card._id} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
                    ))}
                </ul>
                <Footer />
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} buttonText={"Создать"} onAddCard={handleAddCard} />
                <PopupWithForm name="confirm" title="Вы уверены?" buttonText={"Да"} />
                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                <ImagePopup card={selectedCard} isOpen={isEditImagePopupOpen} onClose={closeAllPopups} />
            </CurrentUserContext.Provider>
        </div >
    );
}

export default App;
