import React, {useState, useImperativeHandle} from "react"

const Togglable = React.forwardRef((props, ref) => {
    const {buttonLabel, children} = props
    const [visible, setVisibility] = useState(false)
    const formHidden = {display: visible ? "none" : ""}
    const formVisible = {display: visible ? "" : "none"}
    const toggleVisibility = () => {
        setVisibility(!visible)
    }
    
    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style = {formHidden}>
                <button onClick = {toggleVisibility}> {buttonLabel} </button>
            </div>
            <div style = {formVisible}>
                {children}
                <button onClick = {toggleVisibility}> Hide form </button>
            </div>
        </div>
    )
})
export default Togglable
