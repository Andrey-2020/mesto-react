
function PopupWithForm(props) {
    return (
        <section className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className={`popup__container popup__container_type_${props.name}`}>
                <h2 className={`popup__heading popup__heading_type_${props.name}`}>{props.title}</h2>
                <form className={`form form_type_${props.name}`} name={`form-${props.name}`} noValidate>
                    {props.children}
                </form>
                <button className="popup__button" type="button" aria-label="close" onClick={props.onClose}></button>
            </div>
        </section>
    );
}

export default PopupWithForm;
