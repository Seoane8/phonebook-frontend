import './styles/Person.css'

export const Person = ({person, handleDelete}) => {
    const {name, tfno, id} = person

    return (
        <li className='contact'>
            <img className='contact-image' src='./person.svg' alt='Person icon' />
            <div className='contact-info'>
                <strong>{name} </strong>
                <span>{tfno}</span>
            </div>
            <button className='delete-button' onClick={handleDelete(id, name)}>
                <img src='./trash.svg' alt='Delete' />
            </button>
        </li>
    )
}