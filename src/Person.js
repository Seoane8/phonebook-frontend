export const Person = ({person, handleDelete}) => {
    const {name, tfno, id} = person

    return (
        <li>
            <strong>{name} </strong>
            <span>- {tfno}</span>
            <button onClick={handleDelete(id, name)}>delete</button>
        </li>
    )
}