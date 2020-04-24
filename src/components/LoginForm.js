import React from "react"

const LoginForm = (props) => {
    const {
        handleSubmit,
        handleUserNameChange,
        handlePasswordChange,
        userName,
        password
    } = props

    return (
        <div>
            <h2> Log in here </h2>
            <form onSubmit = {handleSubmit}>
                <div>
                    Enter your user name:
                    <input
                        value = {userName}
                        onChange = {handleUserNameChange}
                    />
                </div>
                <div>
                    Enter your password:
                    <input
                        type = "password"
                        value = {password}
                        onChange = {handlePasswordChange}
                    />
                </div>
                <button type = "submit"> Log in </button>
            </form>
        </div>
    )
}

export default LoginForm
