import React, {useState} from "react"
const Blog = (props) => {
    const {blog} = props
    const [displayAll, setDisplay] = useState(false)
    
    const toggleDisplay = () => {
        setDisplay(!displayAll)
    }
    return (
        <div>
            {!displayAll
                ? <div> {blog.title}
                    <button onClick = {toggleDisplay}> Expand </button>
                </div>
                : <div>
                    <p> {blog.title}
                        <button onClick = {toggleDisplay}> Collapse </button>
                    </p>
                    <p> {blog.author} </p>
                    <p> {blog.url} </p>
                    <p> Times thanked: {blog.thanks}
                        <button onClick = {() => console.log("Click")}>
                            You can click on this if you really want to
                        </button>
                    </p>
            </div>
            }
        </div>
    )
    
}
export default Blog
