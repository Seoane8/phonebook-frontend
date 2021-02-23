export const Notification = ({text, type}) => {

    return text === '' ?
        null :
        <div className={`notification ${type}`}>
            {text}
        </div>

}