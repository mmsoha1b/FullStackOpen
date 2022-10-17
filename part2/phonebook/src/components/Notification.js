const Notification = ({message,err})=>{
    if (message===null){
        return null
    }
    else if(err){
        return(
            <>
            <div className="error message">
                {message}
            </div>
            </>
        )
    }
    return(
        <>
        <div className="notification message">
            {message}
        </div>
        </>
    )
}
export default Notification