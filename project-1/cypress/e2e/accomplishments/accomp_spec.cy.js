
beforeEach(()=>{
    cy.visit("/accomplishments")
})

describe('load page', () => {
    it('passes', () => {
    })

    it('dispays accomplisment title ', () => {
        cy.get('.Accomplishment__heading-container').contains('Accomplishment').should('be.visible')
    })



    it("displays nav bar", () => {
        cy.get(".SideNav").contains(".false", "Habit").should('be.visible')
        cy.get(".SideNav").contains(".SideNav-list-items--active", "Accomplishments").should('be.visible')
        cy.get(".SideNav").contains(".false", "Elements").should('be.visible')

    })

    it("displays title text feild",()=>{
        cy.get("input[data-cy='accomplishment-title-input']").should("be.visible")
    })

    it('dispays textarea for body', () => {
        cy.get("textarea[data-cy='accomplishment-input']").should('be.visible')
    })

    it('dispalyscheckbox', () => {
        cy.get(".Accomplishment-checkbox-container").find("input[type='checkbox']").should("be.visible")
        cy.get(".Accomplishment-checkbox-container").contains("This accomplishment is valid").should("be.visible")
    })


    it('dispalys submit button', () => {
        cy.contains("button","Submit Accomplishment").should("be.visible")

    })

    
})

describe("navigation", () => {

    it("should  redirect to Habits page when Habit is clicked", () => {
        cy.get(".SideNav").contains("Habit").click()
        cy.url().should("be.equal", "http://localhost:3000/habits")
    })

    it("should  redirect to Elements page when Elements is clicked", () => {
        cy.get(".SideNav").contains("Elements").click()
        cy.url().should("be.equal", "http://localhost:3000/elements")
    })

})

describe("handle incomplete submissions", () => {


    it("displays error message when missing title ", () => {
        cy.get("textarea[data-cy='accomplishment-input']").type("This is an Accomplishment description")
        cy.get(".Accomplishment-checkbox-container").find("input[type='checkbox']").click()
        cy.contains("button", "Submit Accomplishment").click()
        cy.contains("Complete the items above to continue").should("be.visible")

    })

    it('displays error message when missing title body', () => {
        cy.get("input[data-cy='accomplishment-title-input']").type("This is an Accomplishment Title")
        cy.get(".Accomplishment-checkbox-container").find("input[type='checkbox']").check()
        cy.contains("button", "Submit Accomplishment").click()
        cy.contains("Complete the items above to continue").should("be.visible")

    })

    it('displays error message when missing  checkbox', () => {
        cy.get("input[data-cy='accomplishment-title-input']").type("This is an Accomplishment Title")
        cy.get("textarea[data-cy='accomplishment-input']").type("This is an Accomplishment description")
        cy.contains("button", "Submit Accomplishment").click()
        cy.contains("Complete the items above to continue").should("be.visible")

    })


    it('dispalys submit button', () => {
        cy.contains("button", "Submit Accomplishment")

    })
})

describe("successful accomplishment submission",()=>{
    it('displays viladation', () => {
        cy.get("input[data-cy='accomplishment-title-input']").type("This is an Accomplishment Title")
        cy.get("textarea[data-cy='accomplishment-input']").type("This is an Accomplishment description")
        cy.get(".Accomplishment-checkbox-container").find("input[type='checkbox']").check()
        cy.contains("button", "Submit Accomplishment").click()
        cy.contains("This Accomplisment was Successfully Submitted").should("be.visible")
    })

    it('goes back to main accomplishment page when Go back is clicked', () => {
        cy.get("input[data-cy='accomplishment-title-input']").type("This is an Accomplishment Title")
        cy.get("textarea[data-cy='accomplishment-input']").type("This is an Accomplishment description")
        cy.get(".Accomplishment-checkbox-container").find("input[type='checkbox']").check()
        cy.contains("button", "Submit Accomplishment").click()
        cy.contains("button", "Go Back").click()

        cy.get('.Accomplishment__heading-container').contains('Accomplishment').should('be.visible')
        cy.get("input[data-cy='accomplishment-title-input']").should("be.visible").and("have.value", "")
        cy.get("textarea[data-cy='accomplishment-input']").should('be.visible').and("have.value", "")
        cy.get(".Accomplishment-checkbox-container").find("input[type='checkbox']").should("be.visible").and("not.be.checked")
        cy.contains("button", "Submit Accomplishment").should("be.visible")

    })
})