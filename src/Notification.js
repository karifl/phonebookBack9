import getAnnounce from './getAnnounce';
import getError from './getError';


export const Notification = ({message}) => {

    const nullStyle = {
        height: 16,
        width: 0,
        color: 'green',
        fontStyle: 'bold',
        fontSize: 14,
        backgroundColor: 'khaki',
        backgroundColorOpacity: 0.0,
        borderWidth: '3',
        borderStyle: 'solid' ,
        borderColor: 'khaki'

    }

    const alertStyle = {
        height: 60,
        width: 400,
        color: 'red',
        fontStyle: 'bold',
        fontSize: 14,
        backgroundColor: 'lightpink',
        borderWidth: '3',
        borderStyle: 'solid' ,
        borderColor: 'red',
        textAlign: 'center'
      }
    const notificationStyle = {
        height: 60,
        width: 400,
        color: 'green',
        fontStyle: 'bold',
        fontSize: 14,
        backgroundColor: 'lightgray',
        borderWidth: '3',
        borderStyle: 'solid' ,
        borderColor: 'green',
        textAlign: 'center'
      }
    if(message === '') {
        return (
        <div style={nullStyle}>
                
                </div>
        )
        
    }
    if(getAnnounce() && !getError())
    {
        return (
            <div style={notificationStyle}>
                <h3>{message}</h3>
            </div>
        )
    } if(!getAnnounce() && getError()){
        return (
            <div style={alertStyle}>
            <h3>{message}</h3>   
            </div>
    
        )
    }
    
}