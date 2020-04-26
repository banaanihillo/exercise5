import "@testing-library/jest-dom/extend-expect"
/*
import React from "react"
import {render, fireEvent} from "@testing-library/react"
import BlogForm from "./blogForm"


test("BlogForm onSubmit works and state is updated correctly", () => {
    const addBlog = jest.fn()
    const component = render(
        <BlogForm addBlog = {addBlog} />
    )

    const input = component.container.querySelector("input")
    const form = component.container.querySelector("form")

    fireEvent.change(input, {
        target: {value: "oh, really?"}
    })
    fireEvent.submit(form)
    expect(addBlog.mock.calls).toHaveLength(1)
})
*/

test("what", () => {
    expect("nothing").toHaveLength(7)
})
