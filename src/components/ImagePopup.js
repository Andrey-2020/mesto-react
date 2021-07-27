
function ImagePopup(props) {
    return (
        <section className={`popup popup_type_image ${props.isOpen ? 'popup_opened' : ''}`}>
            <figure className="popup__image-caption">
                <button className="popup__button popup__button_type_image" type="button" aria-label="close" onClick={props.onClose}></button>
                <img className="popup__image"  src={props.card.link} alt="#"  />
                <p className="popup__caption">{props.card.name}</p>
            </figure>
        </section>
    );
}

export default ImagePopup;