import React, {useState, useEffect} from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
require("./styles.css")

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    // const [newBlog, setNewBlog] = useState("")

    useEffect(() => {
        blogService
            .getAll()
            .then(blogs =>
                setBlogs(blogs)
            )  
    }, [])

    useEffect(() => {
        const currentlyLoggedIn = window.localStorage.getItem("currentlyLoggedIn")
        if (currentlyLoggedIn) {
            const user = JSON.parse(currentlyLoggedIn)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                userName, password
            })
            window.localStorage.setItem(
                "currentlyLoggedIn", JSON.stringify(user)
            )
            blogService.setToken(user.token)

            setUser(user)
            setUserName("")
            setPassword("")
        } catch (error) {
            console.log(errorMessage)
            setErrorMessage("Incorrect login info")
            setTimeout(() => {
                setErrorMessage(null)
            }, 6000)
        }
    }

    const loginForm = () => (
        <form onSubmit = {handleLogin}>
            <div>
                Type your user name here:
                    <input
                        type= "text"
                        value= {userName}
                        name= "userName"
                        onChange= {({target}) => setUserName(target.value)}
                    />
            </div>
            <div>
                Type your password here:
                    <input
                        type = "password"
                        value = {password}
                        name = "password"
                        onChange = {({target}) => setPassword(target.value)}
                    />
            </div>
            <button type="submit"> Log in </button>
        </form>
    )
    /*
    const blogForm = () => (
        <form onSubmit = {addBlog}>
            <input
                value = {newBlog}
                onChange = {handleBlogChange}
            />
            <button type = "submit"> Add new blog </button>
        </form>
    )
    */

    return (
        <div>
            <h1> Blog application </h1>
            {(user === null)
                ? loginForm()
                : <div>
                    <p> Logged in as {user.userName}
                        <button onClick = {() => {
                            window.localStorage.removeItem("currentlyLoggedIn")
                            setUser(null)
                        }}>
                        Log out
                        </button>
                    </p>
                    <h2> List of blogs </h2>
                    {blogs.map(blog =>
                        <Blog key = {blog.id} blog = {blog} />
                    )}
                    {
                        // blogForm()
                    }
                </div>
            }
        </div>
    )
}

export default App
