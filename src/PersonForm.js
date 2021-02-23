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

    const handleSubmit = (event) => {
        event.preventDefault()

        const personsWithSameName = persons.filter(({name}) => name === newPerson.name)

        if (personsWithSameName.length !== 0) {
            return submitAddedPerson(personsWithSameName[0])
        }

        postPerson(newPerson).then(person => {
            setNotification({
                text: `Added ${person.name}`,
                type: 'message'
            })
            setPersons(prevPersons => [...prevPersons, person])
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
            .then(updatedPerson => {
                setPersons(prevPersons =>
                    prevPersons.map(person =>
                        person.id === id ? updatedPerson : person,
                    )
                )
                setNotification({
                    text: `Updated ${updatedPerson.name}`,
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
                setNotification({
                    text: `Information of ${newPerson.name} has already been removed from server`,
                    type: 'error'
                })
            })

        setNewPerson(INITIAL_NEW_PERSON)
        setTimeout(() =>
            setNotification({text:'', type:''}),
            5000
        )
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                name: <input type='text' onChange={handleChangeName} value={newPerson.name}/>
            </div>
            <div>
                number: <input type='text' onChange={handleChangeTfno} value={newPerson.tfno}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}