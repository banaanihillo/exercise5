import React from "react"
import "@testing-library/jest-dom/extend-expect"
import {render} from "@testing-library/react"
import Blog from "./Blog"

test("Rendering the blog works", () => {
    const blog = {
        title: "Something something something",
        author: "An Author"
    }
    const component = render(
        <Blog blog = {blog} />
    )
    console.log(blog)
    expect(component.container).toHaveTextContent(
        "Something something something",
        "An Author"
    )
    expect(blog.thanks).not.toBeDefined
})
