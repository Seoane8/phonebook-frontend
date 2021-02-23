import {Person} from "./Person";
import {deletePerson} from "./service";

export const Persons = ({data, filter, setPersons}) => {

    const handleDelete = (id, name) => () => {
        if (!window.confirm(`Delete ${name}?`)){
            return
        }

        deletePerson(id).then(status => {
            if (status < 200 || status >= 300){
                return
            }

            setPersons(prevPersons => prevPersons.filter(
                person => person.id !== id
            ))
        })
    }

    return (
        <ul>
            {data
                .filter(({name}) =>
                    name.toLowerCase().includes(filter.toLowerCase())
                )
                .map(person =>
                    <Person
                        key={person.id}
                        person={person}
                        handleDelete={handleDelete}
                    />
                )
            }
        </ul>
    )
}