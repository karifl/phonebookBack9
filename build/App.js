/* eslint-disable react/jsx-no-comment-textnodes */

import './App.css';
import React,{ useState, useEffect } from 'react';
import Lister from './Lister';
import AddPerson from './AddPerson';
import  SearchPerson  from './SearchPerson';
import triggerTrue from './triggerTrue';
import getTrigger from './getTrigger';
import axios from 'axios';
import serverService from './serverService';
import DeletePerson from './DeletePerson';
import { announceFalse, announceTrue } from './announceSwitch';
import { errorFalse, errorTrue} from './errorSwitch'
import { Notification } from './Notification';

const formStyle = {
  backgroundColor: 'khaki'
}



const App = () => {
  /*const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])*/

  const [persons, setPersons] = useState([])
  const [notificationMessage, setNotificationMessage] = useState('') 
  const [finalAppPerson, setFinalAppPerson] = useState([{}])
  const [myState, setMyState] = useState(1)
  

  useEffect(() => {
    console.log("Fetching data from the server..")
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
    }, [])
  

  const resetingFinal = () => {
    setFinalAppPerson({})
  }

  function resetProgram(){
//    setFinalAppPerson({})
      serverService
        .getAllData()
        .then(response => {
          console.log("data fetched! \n putting data inside persons variable")
          console.log("RESETData is : ", response)
          setPersons(response)
        })
        .catch(error => {
          console.log("Error in fetching the data!")
        })
  
        setMyState(0)   
  }


  const addNewPerson = (person) => {
    serverService
      .createData(person)
      .then(response => {
        announceTrue()
        console.log("data posted to server! \n putting new data inside persons variable")
        //showing the message on screen
        setNotificationMessage(`Added ${person.name}  to the server`)
        setPersons(persons.concat(response.data))
        console.log(response)
        
        setTimeout(() => {
          //resetting of the flags
          setNotificationMessage("")
          errorFalse()
          announceFalse()
        }, 5000)
        //Possible reset of the variables
        setTimeout(() => {
          resetProgram()
      },0)
      }) 
      .catch(error => {
        errorTrue()
        console.log("Error in posting the data!")
        //showing the message on screen
        setNotificationMessage("Error in posting the data!")
        setTimeout(() => {
          //resetting of the flags
          setNotificationMessage("")
          errorFalse()
          announceFalse()
        }, 5000)
      })
      //Possible reset of the variables
      setTimeout(() => {
        resetProgram()
    },0)     
        
     
    //setPersons(persons.concat(person));
    //console.log(persons)
  }

  const updateThisPerson = (id, myPerson) => {
    console.log("Chosen person's '(with an id ", id , "') information will be replaced with this", myPerson)
    serverService
      .updateData(id, myPerson)
      .then(returnedPerson => {
        announceTrue()
        console.log("Data updated in the server")
        //showing the message on screen
        setNotificationMessage(`Updated ${myPerson.name}  to the server`)
        setPersons(persons.map(person => person.id !== id ? person : person.number = returnedPerson))
        setTimeout(() => {
          //resetting of the flags
          setNotificationMessage("")
          errorFalse()
          announceFalse()
        }, 5000)
        setTimeout(() => {
           //Possible reset of the variables
           resetProgram()
      },0)
      })
    .catch(error => {
      errorTrue()
      console.log("Error in updating the data!")
      //showing the message on screen
      setNotificationMessage("Error in updating the data!")
      setTimeout(() => {
        //resetting of the flags
        setNotificationMessage("")
        errorFalse()
        announceFalse()
      }, 5000)
    })    
  }

  const deleteThisPerson = (idName,idValue) => {
    console.log("IDvalue is: ", idValue)
    
    serverService
    .deleteData(idValue)
    .then(response => {
      announceTrue()
      console.log("data deleted from server!")
      console.log("THEN IDvalue is: ", idValue)
      
      setPersons(persons.filter(person => person.id !== idValue))
      console.log("deleteThisPerson, persons: ", persons)
      //resetProgram()
         //showing the message on screen
      setNotificationMessage(`Deleted name ${idName} from the server`)
      setTimeout(() => {
        //resetting of the flags
        setNotificationMessage("")
        errorFalse()
        announceFalse()
      }, 5000)
      setTimeout(() => {
         //Possible reset of the variables
         window.location.reload(false)
         //resetProgram()  
      }, 0)
  })
  .catch(error => {
    errorTrue()
    console.log("Error in deleting the data!")
    //showing the message on screen
    setNotificationMessage(`The information of ${idName} has been already deleted from the server!`)
    setTimeout(() => {
      //resetting of the flags
      setNotificationMessage("")
      errorFalse()
        announceFalse()
    }, 5000)
  })
  //setPersons(persons.concat(person));
console.log(persons)
  } 


  const searchThisPerson = (listPersons) => {
    //setFinalPerson({})
    console.log("length: ",listPersons.length)
    if(listPersons.length === 0){
      setFinalAppPerson({})
    } else {
      console.log("checking HOOK: ", finalAppPerson)
      console.log("listPersons: ",listPersons)
      console.log("length: ",listPersons.length)
      setFinalAppPerson(listPersons)
    }
    finalAppPerson ? triggerTrue() : console.log("searchMyPerson: ", listPersons, " not found")
     // triggerTrue()
     if(!finalAppPerson === [{}]){
      console.log("FINAL RESULT: ",finalAppPerson.map(name => name))  
      console.log("trigger is: ",getTrigger())
    
     } else {  
      console.log("trigger is: ",getTrigger())
    
     }
      
    }
    
  

  return (
    <div style={formStyle}>
         <h2>Phonebook</h2>
    <Notification message = {notificationMessage}></Notification>
    <br/>

      <SearchPerson searchThisPerson={searchThisPerson} persons={persons} resettingFinal={resetingFinal}/>
     {console.log("DOWN HERE finalAppPerson: ",finalAppPerson)}
     <AddPerson addNewPerson ={addNewPerson} updateThisPerson={updateThisPerson}/>

      <h2>Numbers</h2>
      <ul> 
      { 
        //either we print the persons based on the search key or then the whole list
          getTrigger() ? finalAppPerson.map(person => 
            
          <div key= {person.name}>
          <Lister key={person.name} name={person.name} number={person.number} />
          <DeletePerson name={person.name} deleteThisPerson = {deleteThisPerson}  />
         </div> )
            
           : persons.map((person) =>
           <div key= {person.name}>
          <Lister key={person.name} name={person.name} number={person.number} />
          <DeletePerson name={person.name} deleteThisPerson = {deleteThisPerson} />
          </div> ) 
         } 
      </ul>

    </div>
  )
/*
       
*/
}


export default App;
