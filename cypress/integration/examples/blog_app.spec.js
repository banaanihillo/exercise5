describe("The blog application", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000")
    })

    it("front page works", () => {
        cy.contains("Blog")
    })
    it("button for opening the login form works", () => {
        cy.contains("Log in").click()
    })
    it("responds with an error if log-in credentials are incorrect", () => {
        cy.contains("Log in").click()
        cy.get("#userNameInput").type("This user does not exist for sure")
        cy.get("#passwordInput").type("This one is certainly incorrect as well")
        cy.get("#loginButton").click()
        cy.get(".errorMessage")
            .should("contain", "Incorrect login info.")
            .and("have.css", "color", "rgb(139, 0, 139)")
        cy.get("html").should("not.contain", "Logged in")
    })
})

describe("While logged in to the blog application", () => {
    beforeEach(() => {
        cy.request("POST", "http://localhost:3001/api/test/reset")
        const user = {
            userName: "testUser",
            name: "This user is using the test",
            password: "This is the passphrase of the user"
        }
        cy.request("POST", "http://localhost:3001/api/users", user)
        cy.Login({userName: "testUser", password: "This is the passphrase of the user"})
    })
    it("the application correctly displays the currently logged-in user", () => {
        cy.contains("Logged in as testUser")
    })
    it("opening the blog form works", () => {
        cy.contains("Click to create a new blog").click()
    })

    it("creating a new blog works", () => {
        cy.contains("Click to create a new blog").click()
        cy.get("#Title").type("Creating New Entries via Cypress")
        cy.get("#Author").type("Cypressor")
        cy.get("#URL").type("Somewhere within the browser")
        cy.contains("Add new blog").click()
        cy.contains("Creating New Entries via Cypress")
        cy.get(".message")
            .should("contain", "Successfully added Creating New Entries via Cypress")
            .and("contain", "by Cypressor")
            .and("have.css", "color", "rgb(255, 0, 255)")
    })
})
/*
describe("After a blog has been created", () => {
    beforeEach(() => {
        cy.request("POST", "http://localhost:3001/api/test/reset")
        const user = {
            userName: "testUser",
            name: "This user is using the test",
            password: "This is the passphrase of the user"
        }
        cy.request("POST", "http://localhost:3001/api/users", user)
        cy.Login({userName: "testUser", password: "This is the passphrase of the user"})
        cy.CreateBlog({
            title: "Created by an External Command",
            author: "Command User",
            URL: "/commands.js"
        })
    })
    it("more information can be shown", () => {
        cy.contains("Expand").click()
    })
    it("the blog can be thanked"), () => {
        cy.contains("Expand").click()
    }
})
*/
