const Notification =({notification,setNotification,error})=>{
    if(notification.length===0){
        return (<></>)
    }
    else if(error){
        return(
            
            <div className="message error">
                {`${notification}`}
            </div>
    )}
    else{
        return(
            <div className="notification message">
                {`${notification}`}
            </div>
        )
    }

}
export default Notification;