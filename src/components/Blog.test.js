import React from "react"
import "@testing-library/jest-dom/extend-expect"
import {render, fireEvent} from "@testing-library/react"
import Blog from "./Blog"
import {prettyDOM} from "@testing-library/dom"

test("Rendering the blog works", () => {
    const blog = {
        title: "Something something something",
        author: "An Author",
        url: "an address",
        thanks: 2
    }
    const component = render(
        <Blog blog = {blog} />
    )
    component.debug()
    expect(component.container).toHaveTextContent(
        "Something something something"
    )
    expect(component.container).not.toHaveTextContent("an address")
})

test("Additional blog information is rendered upon button click", () => {
    const blog = {
        title: "Buttons and Displays",
        author: "Displayist",
        url: "/info",
        thanks: 5,
        user: "User of this test"
    }
    const user = {
        name: "User of this test"
    }
    const toggleDisplay = jest.fn()
    const component = render(
        <Blog
            blog = {blog}
            toggleDisplay = {toggleDisplay}
            user = {user} />
    )
    component.debug()
    expect(component.container).not.toHaveTextContent("Times thanked")

    const button = component.getByText("Expand")
    console.log(prettyDOM(button))
    fireEvent.click(button)
    component.debug()
    expect(component.container).toHaveTextContent("Times thanked")
    expect(component.container).toHaveTextContent("/info")
})
