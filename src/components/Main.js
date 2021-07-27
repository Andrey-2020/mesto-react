import React from 'react';
import Card from './Card'
import api from '../utils/Api';
function Main(props) {
    const [userName, setUserName] = React.useState('Жак-Ив Кусто');
    const [userDescription, setUserDescription] = React.useState('Исследователь океана');
    const [userAvatar, setUserAvatar] = React.useState();
    const [cards, setCards] = React.useState([]);
    React.useEffect(() => {
        api.updateUserTask({
            name: `${userName}`,
            about: `${userDescription}`,
            avatar: `${userAvatar}`
        }, '')
            .then((userData) => {
                setUserName(userData.name);
                setUserDescription(userData.about);
                setUserAvatar(userData.avatar);

            })
            .catch(err => console.log('Ошибка. Запрос не выполнен: ', err))
    });

    React.useEffect(() => {
       api.getCardTasks()
            .then((cards) => {
                setCards(cards);
            })
            .catch(err => console.log('Ошибка. Запрос не выполнен: ', err))
    })

    return (
        <main>
            <section className="profile">
                <div className="profile__content">
                    <div className="profile__cover-avatar" onClick={props.onEditAvatar} style={{ backgroundImage: `url(${userAvatar})` }}>
                        {/* <img  className="profile__avatar"  alt="Аватар"  /> */}
                    </div>
                    <div className="profile__info">
                        <div className="profile__text">
                            <h1 className="profile__autor">{userName}</h1>
                            <button onClick={props.onEditProfile} className="profile__button profile__button_edit" type="button" aria-label="edit"></button>
                        </div>
                        <p className="profile__profession">{userDescription}</p>
                    </div>
                </div>
                <button onClick={props.onAddPlace} className="profile__button profile__button_add" type="button" aria-label="add"></button>

            </section>
            <section>
                <ul className="places">
                    {cards.map((card) => (
                        <Card card={card} key={card._id} onCardClick={props.onCardClick} />
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;
