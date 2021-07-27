import Delete from '../images/Delete.svg';
function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
    }
    return (
        <li className="place">
            <div className="place__image" style={{ backgroundImage: `url(${props.card.link})` }} alt={props.card.name} onClick={handleClick} ></div>
            <img className="place__delete" src={Delete} alt="Удалить" />
            <div className="place__info">
                <h2 className="place__title">{props.card.name}</h2>
                <div className="place__like-container">
                    <button className="place__like" type="button" aria-label="like"></button>
                    <div className="place__number-of-like">{props.card.likes.length}</div>
                </div>
            </div>
        </li>
    );
}

export default Card;
