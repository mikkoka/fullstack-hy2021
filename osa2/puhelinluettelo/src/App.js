import React, { useState, useEffect } from 'react'
import personService from './services/personService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterString, setFilterString ] = useState('')
  const [ notificationMessage, setNotificationMessage ] = useState(null)
  const [ notificationStyle, setNotificationStyle ] = useState({})

  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  const notify = (msg, style) => {
    setNotificationMessage(msg)
    setNotificationStyle(style)
    setTimeout(() => {
      setNotificationMessage('')
    setNotificationStyle(null)
    }, 5000)
  }

  useEffect(() => {

    personService.getAll()
      .then(resp => {
        setPersons(resp)
    })
  }, [])

  const onNameInput = (event) => setNewName(event.target.value)
  const onNumberInput = (event) => setNewNumber(event.target.value)
  const filterPersons = target => 
    persons.filter(p => p.name.toLowerCase().includes(target.toLowerCase()))

  const onFilterStringChange = (event) => {
    setFilterString(event.target.value)
  }

  const updateEntry = (arrayIndex) => {
    const personToUpdate = persons[arrayIndex]

    const updatedPerson = {
      ...personToUpdate,
      number: newNumber 
    }

    personService
      .updatePerson(updatedPerson)
      .then(resp => {
        setPersons(persons.map((p) => p.name !== resp.name ? p : resp))
        setNewName('')
        setNewNumber('')
        notify(`Entry for ${updatedPerson.name} successfully updated`, successStyle)
      })
  }

  const addNewEntry = (event) => {
    event.preventDefault()
    const indexOfNewName = persons.findIndex(p => p.name === newName)

    if (indexOfNewName > -1) {
      const makeChange = window.confirm(`${newName} is already added to phonebook. Replace old number with new one?`)
      if (makeChange) {
        updateEntry(indexOfNewName)
      }
      return 
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    personService.post(newPerson)
    .then(newP => {
      setPersons(persons.concat(newP))
      setNewName('')
      setNewNumber('')
      notify(`${newP.name} successfully added`, successStyle)
    })
  
  }
  const deleteEntry = (i, name) => {
    const goOn = window.confirm(`Confirm deletion of entry for ${name}?`)
    if(goOn) {
      personService.deletePerson(i).then(() => {
        setPersons(persons.filter(p => p.id !== i))
        notify(`${name} successfully deleted`, successStyle)

      }).catch ((err) => notify(`${name} has already been deleted`, errorStyle))
      
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>

      {notificationMessage 
        ? <p style={notificationStyle}>{notificationMessage}</p>
        : <div></div>
      }   

      <Filter 
        filterString={filterString} 
        onFilterStringChange={onFilterStringChange}>
      </Filter>

      <PersonForm 
        addNewEntry={addNewEntry}
        newName={newName}
        newNumber={newNumber}
        onNameInput={onNameInput}
        onNumberInput={onNumberInput}>
      </PersonForm>

      <Numbers 
        filterPersons={filterPersons}
        filterString={filterString}
        deleteEntry={deleteEntry}>
      </Numbers>

    </div>
  )


}

const Filter = ({filterString, onFilterStringChange}) => {
  return (
    <div>
        filter shown with: <input value={filterString} onChange={onFilterStringChange}></input>
    </div>
  )
}
const PersonForm = ({addNewEntry, newName, newNumber, onNameInput, onNumberInput}) => {
  return (
    <div>
      <h2>Add new number</h2>
      <form onSubmit={addNewEntry}>
        <div>
          name: <input value={newName} onChange={onNameInput}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={onNumberInput}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Numbers = ({filterString, filterPersons, deleteEntry}) => {
  return (
    <div>

<h2>Numbers</h2>
      {filterPersons(filterString).map(p => <p key={p.name}>{p.name} {p.number} <button onClick={() => deleteEntry(p.id, p.name)}>Delete</button></p>)}
    </div>
  )
}


// const Notification = ({notificationMessage, notificationStyle}) => {
//   return (
//     <p style={notificationStyle}>{notificationMessage}</p>
//   )

// }

export default App
