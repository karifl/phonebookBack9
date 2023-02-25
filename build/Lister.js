import react from 'react';


const Lister = (props) => {

    console.log("LISTER: ",props.name , props.number)
      return (
        <div>
          <li key={props.name}>{props.name} {props.number}</li> 
        </div>
        ) 

  }

  export default Lister