import { useState, useEffect } from 'react'
import axios from 'axios';
import serverService from './serverService';

export  const AddPerson = ({addNewPerson, updateThisPerson}) => {
  
  
 /* const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])*/

  const [persons, setPersons] = useState([])
  const [person, setPerson] = useState({})
  

  useEffect(() => {
    console.log("Fetching data from the server..")
    serverService
      .getAllData()
      .then(response => {
        console.log("data fetched! \n putting data inside persons variable")
        setPersons(response)
      })
      .catch(error => {
        console.log("Error in fetching the data!")
      })
    }, [])

  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  //const [personObject, setPersonObject] = useState({})

  function resetAddPerson(){
    setPerson({})  
    console.log("RESET: person is ", person)
    //findPerson(null, null)
    
    serverService
      .getAllData()
      .then(response => {
        console.log("data fetched! \n putting data inside persons variable")
        console.log("Data is : ", response)
        setPersons(response)
      })
      .catch(error => {
        console.log("Error in fetching the data!")
      })
 
   
}



  const handleNumberChange = (event) => {
    console.log("handleNumber:", event.target.name, " ", event.target.value  )
    setNewNumber(event.target.value)
  }

  const handleNameChange = (event) => {
    console.log("handleName:", event.target.name, " ", event.target.value )
    const userName = event.target.value
    setNewName(userName)


}
const addPerson = (event) => {
  event.preventDefault()
    console.log("newNumber is: ", newNumber)
    console.log("newName is: ", newName )



    let personObject = {
      name: newName,
      number: newNumber,
      id: persons.length +1,
    }

    
    console.log("PERSONS PRKL: ",persons)
    console.log("personObject:" , personObject)
    
    
    /*let shit =persons.find(person => (person.number === newNumber) || (person.name === newName))
    console.log(shit.name)*/
    //setPerson(persons.find(person => (person.number === newNumber) || (person.name === newName)))
    let person =  persons.find(person => (person.number === newNumber) || (person.name === newName)) 
    
    console.log("person: ", person )
      //alert (`Name: ${newName} or number: ${newNumber} already exists in the Phonebook`)
    if(person){
      if(person.name === newName){
        let text = `Name: ${newName} already exists in the Phonebook \n Would you like to replace the old number with a new one?`
          if(window.confirm(text) === true) {
            
            updateThisPerson(person.id, personObject)
                            
            resetAddPerson()
            personObject = {}
            console.log("personObject after updating: ", personObject)
            setNewNumber('')
            setNewName('')  
          }
          else{
          
          }
       } 
        else {
          if(person.number === newNumber){
          
            alert  (`Number: ${newNumber} already exists in the Phonebook`)
            
          }
          
          resetAddPerson()
          personObject ={}
          
          console.log("personObject after alert: ", personObject)
          setNewNumber('')
          setNewName('')  
        }
           
    }
      else {
              addNewPerson(personObject)
              
              resetAddPerson()
              
              personObject ={}
              console.log("personObject after adding: ", personObject)
              setNewNumber('')
              setNewName('')  
            }
  
   }
      
  return (
    //{persons, newName, newNumber, setNewName, setNewNumber}
  <form onSubmit={addPerson}>
  <h2>Add new one</h2>
    <div>
      name: <input 
        name="name"
        value={newName}
          onChange={handleNameChange}
        />
    </div>
  <div>
  number: <input
      name="number" 
      value={newNumber}
        onChange={handleNumberChange}
      />
</div>
  
  <div>
      <button type="submit">add</button>
  </div>
  <div>
        debug: {newName} {newNumber}
      </div> 
</form>
  )

  }
  
  export default AddPerson;                      