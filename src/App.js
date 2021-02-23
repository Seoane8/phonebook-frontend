import React, {useState, useEffect} from 'react'
import {PersonForm} from "./PersonForm"
import {Filter} from "./Filter"
import {Persons} from "./Persons"
import {getPersons} from "./service";
import {Notification} from "./Notification";
import './styles/App.css'

const INITIAL_NEW_PERSON = {
    name: '',
    tfno: ''
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newPerson, setNewPerson] = useState(INITIAL_NEW_PERSON)
    const [filter, setFilter] = useState('')
    const [notification, setNotification] = useState({text:'', type:'message'})


    useEffect(() => {
        getPersons()
            .then(persons => setPersons(persons))
    }, [])


    return (
        <div className='wrapper'>
            <h1>Contacts</h1>
            <Notification {...notification}/>
            <Filter
                filter={filter}
                setFilter={setFilter}
            />
            {persons.length === 0 ?
                <p>Empty list</p> :
                <Persons
                    data={persons}
                    setPersons={setPersons}
                    filter={filter}
                />
            }
            <PersonForm
                newPerson={newPerson}
                setNewPerson={setNewPerson}
                persons={persons}
                setPersons={setPersons}
                setNotification={setNotification}
                INITIAL_NEW_PERSON={INITIAL_NEW_PERSON}
            />
            

        </div>
    )
}

export default App
