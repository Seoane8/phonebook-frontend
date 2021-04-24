import {postPerson, updatePerson} from "./service";

export const PersonForm = ({newPerson, setNewPerson, persons, setPersons, setNotification, INITIAL_NEW_PERSON}) => {

    const handleChangeName = (event) =>
        setNewPerson(prevPerson => ({
            name: event.target.value,
            tfno: prevPerson.tfno
        }))

    const handleChangeTfno = (event) =>
        setNewPerson(prevPerson => ({
            name: prevPerson.name,
            tfno: event.target.value
        }))

    const notifyError = (msg) => 
        setNotification({
            text: msg,
            type: 'error'
        })

    const handleSubmit = (event) => {
        event.preventDefault()

        const personsWithSameName = persons.filter(({name}) => name === newPerson.name)

        if (personsWithSameName.length !== 0) {
            return submitAddedPerson(personsWithSameName[0])
        }

        postPerson(newPerson).then(response => {
            if (response.error) return notifyError(response.error)

            setNotification({
                text: `Added ${response.name}`,
                type: 'message'
            })
            setPersons(prevPersons => [...prevPersons, response])
        })

        setNewPerson(INITIAL_NEW_PERSON)
        setTimeout(() =>
            setNotification({text:'', type:''}),
            5000
        )
    }

    const submitAddedPerson = ({id}) => {
        const update = window.confirm(
            `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
        )

        if (!update) {
            return
        }

        updatePerson(newPerson, id)
            .then(response => {
                if (response.error) return notifyError(response.error)

                setPersons(prevPersons =>
                    prevPersons.map(person =>
                        person.id === id ? response : person,
                    )
                )
                setNotification({
                    text: `Updated ${response.name}`,
                    type: 'message'
                })
            })
            .catch(error => {
                console.log(error)
                setPersons(prevPersons =>
                    prevPersons.filter(person =>
                        person.id !== id
                    )
                )
                notifyError(`Information of ${newPerson.name} has already been removed from server`)
            })

        setNewPerson(INITIAL_NEW_PERSON)
        setTimeout(() =>
            setNotification({text:'', type:''}),
            5000
        )
    }

    const formStyle = ' bg-gray-200 fixed bottom-0 flex flex-row flex-wrap '+
        'justify-between content-start space-y-4 p-6 pt-4 '+
        'md:sticky md:col-start-4 md:col-span-2 md:row-start-2 md:row-end-4 md:h-full'

    const baseInputStyle = 'bg-gray-50 p-2 rounded-lg shadow-md outline-none '+
        'transition-all duration-75 ease-in-out focus:ring-2'

    const buttonStyle = 'bg-gray-50 inline w-10 p-1.5 rounded-full shadow-lg '+
        'transition-all duration-500 ease-in-out transform hover:scale-125 hover:bg-blue-500 '+
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-200'

    return (
        <form className={formStyle} onSubmit={handleSubmit}>
            <h2 className='m-auto'>Add new contact</h2>
            <input 
                className={baseInputStyle+' w-full'} 
                placeholder='Name...' 
                type='text' 
                onChange={handleChangeName} 
                value={newPerson.name} 
                aria-label='Contact name'
            />
            <input 
                className={baseInputStyle+' w-3/4 inline'} 
                placeholder='Number...' 
                type='tel' 
                onChange={handleChangeTfno} 
                value={newPerson.tfno} 
                aria-label='Telephone number' 
            />
            <button className={buttonStyle} type='submit' aria-label="Add contact">
                <svg viewBox="0 0 110 110" className='stroke-current text-blue-500 duration-500 ease-in-out hover:text-gray-50'>
                    <path d="M 55,0 l 0,120 M 0,56 l 120,0" strokeWidth="15" />
                </svg>
            </button>
        </form>
    )
}