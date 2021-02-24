

export const Person = ({person, handleDelete}) => {
    const {name, tfno, id} = person

    return (
        <li className='flex space-x-4 px-5 py-3 content-center'>
            <div className='m-auto'>
                <img width='40px' height='40px' className='bg-gray-100 rounded-full' src='./person.svg' alt='Person icon' />
            </div>
            <div className='flex-grow'>
                <strong>{name}</strong>
                <span className='block text-xs text-gray-600'>{tfno}</span>
            </div>
            <button className='m-auto' onClick={handleDelete(id, name)}>
                <img width='25px' height='25px' src='./trash.svg' alt='Trash' aria-label='Delete contact'  />
            </button>
        </li>
    )
}