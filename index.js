
const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const app = express()

let testURL = './src/App.js'

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-12345"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-523523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    },
    {
        "id": 5,
        "name": "Seymour Butts",
        "number": "39-21-76484377"
    }
]
app.use(express.json())

//https://www.atatus.com/blog/a-beginners-guide-to-morgan-npm-logger/







// If you want Morgan to create a login file

/*var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
app.use(morgan('combined', {stream: accessLogStream}))
*/

//Creating tokens with Morgan

morgan.token('host', function(req, res){
    return req.headers['host']
})

morgan.token('reqBody', function(req, res){
    return JSON.stringify(req.body)
})

// Using morgan here


//app.use(morgan('tiny'))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms --- :reqBody '))

//app.use(morgan('CUSTOM MORGAN --- :method :url :status :res[content-length] - :response-time ms --- :reqBody '))



app.get(testURL, function(request, response){
    //response.send('<h1> phonebook step 9 for backend </h1>')
    app.use(morgan('tiny')) 
})




app.get('/notes', (request, response) => {
    //console.log('' + numbers[1].name + '' + numbers[1].number)
    //response.send('<h1>' + numbers[1].name + numbers[1].number + '</h1>')
    response.json(notes)
})



app.get(testURL, (request, response) => {
    //console.log('' + numbers[1].name + '' + numbers[1].number)
    //response.send('<h1>' + numbers[1].name + numbers[1].number + '</h1>')
    const person = persons.map(person => person)
    response.json(person)
})

app.get('/info', (request, response) => {
    let time = Date()
    response.send('<h2> Phonebook has info for ' + persons.length + ' people. <br/><br/> ' + Date() + '</h2>' )
    console.log("Phonebook's info and time ", Date())
})



app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const myPerson = persons.find(person => person.id === id)

    if(myPerson){
        response.json(myPerson)
    } else {
        response.statusMessage = "Current id does not exists, comrade."
        console.log(response.statusMessage)
        response.status(404).send('<h1> Error 404 Not Found </h1> <h2> '+ response.statusMessage + '<h2/>')
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    
    response.statusMessage = "Current id has been deleted, comrade."
    console.log(response.statusMessage)
    response.status(204).send('<h1> Error 204 No Content </h1> <h2> '+ response.statusMessage + '<h2/>')

})

const generateId= () => {
    const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
    let num =Math.floor(Math.random() * (maxId +2))
//    console.log("generated id is: ", num)
    return num
}

const generateMax = () => {
    
    const max = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
 //   console.log("MAX is: ", max )
    return max
}

app.post('/api/persons', (request, response) => {
  //  console.log("request headers: ", request.headers)
  //  console.log("request body: ",request.body)
    const body = request.body
    console.log(body)
    if(!body){
        return response.status(400).json({
            error: 'content missing'
        })
    } else if(!body.name || !body.number){
        return response.status(400).json({
            error: 'name or number missing'
        })
    }
    const nameFound = persons.find(person => person.name === body.name)   
    const numberFound = persons.find(person => person.number === body.number)

    if(nameFound || numberFound){
        return response.status(400).json({
            error: 'name or number already exists in the phonebook!'
        })
    }

    let myID = 0


    const addInfo = () => {

    let idCan = Number(generateId())
    let idMax = Number(generateMax())
    if(idCan === idMax+1){
        myID = idCan
        console.log("myID is: ", myID)
        const myName = body.name
        const myNumber = body.number
//        console.log("myName is: ", myName)
//        console.log("myNumber is: ", myNumber)
//        console.log("persons-array's length: ", persons.length)
        const newPerson = {
            id: myID,
            name: myName,
            number: myNumber,
            
        }
    
        persons = persons.concat(newPerson)
        response.json(newPerson)
    
        }
        else {
            addInfo()
            generateId()
            generateMax()
        }
    }
    addInfo()

})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log('Server running on port  ', PORT)
})
