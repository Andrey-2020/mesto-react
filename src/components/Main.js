import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile">
                <div className="profile__content">
                    <div className="profile__cover-avatar" onClick={props.onEditAvatar} style={{ backgroundImage: `url(${currentUser.avatar})` }}>
                        {/* <img  className="profile__avatar"  alt="Аватар"  /> */}
                    </div>
                    <div className="profile__info">
                        <div className="profile__text">
                            <h1 className="profile__autor">{currentUser.name}</h1>
                            <button onClick={props.onEditProfile} className="profile__button profile__button_edit" type="button" aria-label="edit"></button>
                        </div>
                        <p className="profile__profession">{currentUser.about}</p>
                    </div>
                </div>
                <button onClick={props.onAddPlace} className="profile__button profile__button_add" type="button" aria-label="add"></button>
            </section>
        </main>
    );
}

export default Main;
