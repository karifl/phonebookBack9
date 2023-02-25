import serverService from './serverService';
import { useState, useEffect } from 'react';

export  const DeletePerson = ({ name, deleteThisPerson }) => {
  
    const [persons, setPersons] = useState([])
  
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
    const deleteMe =() => {
        console.log("name is :" ,name)
        console.log("DELETER: persons: ",persons)
        let idValue = 0
        for (let i =0; i < persons.length; i++){
           if (name === persons[i].name){
                console.log("name: ", name , " has been found at place: ", persons[i].id )
                idValue = persons[i].id
           }
            
        }
        console.log("IDvalue is: ", idValue)
  //     console.log("WHAT IS THIS: ",deleteThisPerson) 
       deleteThisPerson(name,idValue)
  }
        
return (
    <div>
        <button type="submit"
        onClick={deleteMe}>Delete</button>
    </div>

)
  
}  
export default DeletePerson