import React, {useState, useEffect} from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Message from "./components/Message"
require("./styles.css")

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [newBlogTitle, setNewBlogTitle] = useState("")
    const [newBlogAuthor, setNewBlogAuthor] = useState("")
    const [newBlogAddress, setNewBlogAddress] = useState("")

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
            setErrorMessage("Incorrect login info.")
            setTimeout(() => {
                setErrorMessage(null)
            }, 6000)
        }
    }

    const addBlog = async (event) => {
        event.preventDefault()
        const newBlog = await blogService.createBlog({
            title: newBlogTitle,
            author: newBlogAuthor,
            url: newBlogAddress
        })

        setBlogs(blogs.concat(newBlog))
        setNewBlogTitle("")
        setNewBlogAuthor("")
        setNewBlogAddress("")
        setMessage(`Successfully added ${newBlogTitle} by ${newBlogAuthor}.`)
        console.log(message)
        setTimeout(() => {
            setMessage(null)
        }, 6000)
    }

    const loginForm = () => (
        <form onSubmit = {handleLogin}>
            <div>
                Type your user name here:
                    <input
                        type = "text"
                        value = {userName}
                        name = "userName"
                        onChange = {({target}) => setUserName(target.value)}
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
    
    const blogForm = () => (
        <form onSubmit = {addBlog}>
            <div>
                Title:
                    <input
                        type = "text"
                        value = {newBlogTitle}
                        onChange = {({target}) => setNewBlogTitle(target.value)}
                    />
            </div>
            <div>
                Author:
                    <input
                        type = "text"
                        value = {newBlogAuthor}
                        onChange = {({target}) => setNewBlogAuthor(target.value)}
                    />
            </div>
            <div>
                URL:
                    <input
                        type = "text"
                        value = {newBlogAddress}
                        onChange = {({target}) => setNewBlogAddress(target.value)}
                    />
            </div>
            <button type = "submit"> Add new blog </button>
        </form>
    )


    return (
        <div>
            <h1> Blog application </h1>
            <Message message = {message} errorMessage = {errorMessage} />
            {(user === null)
                ? loginForm()
                : <div>
                    <p> Logged in as {user.userName}
                        <button onClick = {() => {
                            window.localStorage.removeItem("currentlyLoggedIn")
                            setUser(null)
                            setMessage("Logged out successfully.")
                            setTimeout(() => {
                                setMessage(null)
                            }, 3000)
                        }}>
                        Log out
                        </button>
                    </p>
                    <h2> Create new blog </h2>
                    {blogForm()}
                    <h3> List of blogs </h3>
                    {blogs.map(blog =>
                        <Blog key = {blog.id} blog = {blog} />
                    )}

                </div>
            }
        </div>
    )
}

export default App
