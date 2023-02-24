import { useState } from 'react'
import getTrigger from './getTrigger';
import triggerFalse from './triggerFalse';
export default function SearchPerson ({searchThisPerson, persons, resettingFinal}) {

  const [searchPerson, setSearchPerson] = useState('')
  const [searchNumber, setSearchNumber] = useState('')
  const [searchPersons, setSearchPersons] = useState([])
  const [searchNumbers, setSearchNumbers] = useState([])
  const [finalPerson, setFinalPerson] = useState([{}])

  
  const handleSearchPerson = (event) => {
    console.log("handleSearch:", event.target.name, " ", event.target.value )
    setSearchPerson(event.target.value)
  }

   
   const searchMyPerson = (event) => {
    event.preventDefault()
    console.log("searchMyPerson searchPerson is: ", searchPerson)
    if((typeof searchPerson !== "undefined") && (searchPerson !== "")) {
      //searching for a name or names
      
     // const filterRequested1  = persons.map(person => (person.name.toLowerCase().match(searchPerson.toLowerCase())))
     const filterRequested1 = persons.filter((person) =>  person.name.toLowerCase().includes(searchPerson.toLowerCase()))

     const filterRequested2 = filterRequested1.filter(n => n)
      console.log("first filter: ",filterRequested1)
      console.log("second filter: ",filterRequested2)

    

      //map them for the array in SearchPersons
      filterRequested1.map(name => setSearchPersons(searchPersons.push(name))) 
  //    filterRequested3.map(name => setSearchPersons(searchPersons.push(name)))
      console.log("searchPersons: ",searchPersons)

      //try to find the numbers by matching the names with the persons-array
      let numberFilter1=[]
      for(let i=0; i< searchPersons.length; i++){
        console.log("Loop -> searchPerson : ", searchPersons[i])
        numberFilter1.push(persons.filter(myName => (myName.name.match(searchPersons[i].name))))
      }
      console.log("first num filter: ",numberFilter1)
      numberFilter1 = numberFilter1.map(name => name.map(person => person.number))



      

      let numberFilter2 =[]
      
      for(let j=0; j<numberFilter1.length; j++){
        numberFilter2.push(numberFilter1[j][0])
      }  
      //numberFilter2= numberFilter1.slice(0,3)

      //Once filtered, the numbers will be put on a array of controlled element
      console.log("second num filter: ",numberFilter2)
      numberFilter2.map(number => setSearchNumbers(searchNumbers.push(number))) 
      
      console.log("searchNumbers: ",searchNumbers)
      
      // The last step: we gather both numbers and names and create personObjects to be printed. 
      for(let l=0; l<searchPersons.length; l++){
        const myPersonObject = {
          name: searchPersons[l],
          number: searchNumbers[l],
          id: l,
        }
        console.log("myPersonObject going in: ", myPersonObject)
        //setFinalPerson(finalPerson.push(myPersonObject))
        finalPerson[l]= myPersonObject.name  
              
      }
     // setFinalPerson(finalPerson)
      console.log("finalPerson: ",finalPerson.map(name => name))

    //  searchPerson ? triggerObject.value = true : console.log("searchMyPerson: ", searchPerson, " not found")
     // setSearchNumber(requestedPerson.number)
      searchThisPerson(finalPerson)
    } else{
      console.log("searchbar is empty.")
      console.log("SeachTrigger is: ", getTrigger())
     
    }
    
  } 

  const reset = () => {
    setSearchNumber('')
    setSearchPerson('')
    setSearchNumbers([])
    setSearchPersons([])
    setFinalPerson([])
    triggerFalse()
    resettingFinal()
  }

  



return(
<form onSubmit={searchMyPerson}>
      <div>
          search: <input 
            name="search"
            value={searchPerson}
              onChange={handleSearchPerson}
              
            />
        </div>
        <label>
        <div>
            <button type="submit" hidden>search</button>
        </div>

        </label>
        <label>
          <div>
              <button onClick={reset} type="submit">reset</button>
          </div>
        </label>
        <div>
        debug: {searchPerson}
      </div> 
      </form>
    )
}

