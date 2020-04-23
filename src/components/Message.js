import React from "react"

const Message = (props) => {
    const {message, errorMessage} = props
    if (message === null && errorMessage === null) {
        return null
    } else  if (message) {
        return (
            <div className = "message">
                {message}
            </div>
        )
    } else {
        return (
            <div className = "errorMessage">
                {errorMessage}
            </div>
        )
    }
}

export default Message
