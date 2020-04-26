import React, {useState} from "react"

const BlogForm = (props) => {
    const {createBlog} = props
    const [newBlogTitle, setNewBlogTitle] = useState("")
    const [newBlogAuthor, setNewBlogAuthor] = useState("")
    const [newBlogAddress, setNewBlogAddress] = useState("")

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newBlogTitle,
            author: newBlogAuthor,
            url: newBlogAddress
        })
        setNewBlogTitle("")
        setNewBlogAuthor("")
        setNewBlogAddress("")
    }

    return (
        <div>
            <h2> Create new blog </h2>
            <form onSubmit = {addBlog}>
                <div>
                    Title:
                    <input
                        value = {newBlogTitle}
                        onChange = {({target}) => setNewBlogTitle(target.value)}
                    />
                </div>
                <div>
                    Author:
                    <input
                        value = {newBlogAuthor}
                        onChange = {({target}) => setNewBlogAuthor(target.value)}
                    />
                </div>
                <div>
                    URL:
                    <input
                        value = {newBlogAddress}
                        onChange = {({target}) => setNewBlogAddress(target.value)}
                    />
                </div>
                <button type = "submit"> Add new blog </button>
            </form>
        </div>
    )
}
export default BlogForm
