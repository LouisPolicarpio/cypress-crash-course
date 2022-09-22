
beforeEach(() => {
  cy.visit('/habits')
})



describe('load page', () => {
  it('passes', () => {
  })

  it('dispays Habit Checklist', () => {
    cy.get('.Habit__heading-container').contains('Habit Checklist').should('be.visible')
  })

  it("displays nav bar", ()=> {
    cy.get(".SideNav").contains(".SideNav-list-items--active", "Habit").should('be.visible')
    cy.get(".SideNav").contains(".false", "Accomplishments").should('be.visible')
    cy.get(".SideNav").contains(".false", "Elements").should('be.visible')

  })
})



describe('add new habbit', () => {
  it('should trigger popup form when add is clicked', () => {
    cy.get('#habit-add-btn').click()
    cy.contains("Add a new habit").should('be.visible')
  })

  it("should add habbit to checklist when save changes is clicked ",()=>{
    cy.get('#habit-add-btn').click()
    cy.get("input[placeholder = 'Habit']").type("this is a test task")
    cy.contains("Save Changes").click();
    cy.get(".Habit-cards-container").contains("this is a test task").should("be.visible")
  })

  it("should popup should close when close is clicked", () => {
    cy.get('#habit-add-btn').click()
    cy.contains("Close").click();
    cy.contains("Add a new habit").should('not.exist')
  })

  it("should do nothing when text feild is blank and save changes is clicked ", () => {
    cy.get('#habit-add-btn').click()
    cy.contains("Save Changes").click();
    cy.contains("Add a new habit").should('be.visible')
  })

  it("should toggle task  icon when clicked ", () => {
    cy.get('#habit-add-btn').click()
    cy.get("input[placeholder = 'Habit']").type("this is a test task")
    cy.contains("Save Changes").click();
    cy.get(".Habit-cards-container").get("[src = '/static/media/close.fa7e5ead.svg']").should("be.visible")
    cy.get(".Habit-cards-container").contains("this is a test task").click()
    cy.get(".Habit-cards-container").get("[src = '/static/media/check.9e8832df.svg']").should("be.visible")
    cy.get(".Habit-cards-container").contains("this is a test task").click()
    cy.get(".Habit-cards-container").get("[src = '/static/media/close.fa7e5ead.svg']").should("be.visible")

  })

})


describe("navigation", () => {

  it("should  redirect to Accomplishments page when Accomplishments is clicked", ()=>{
    cy.get(".SideNav").contains("Accomplishments").click()
    cy.url().should("be.equal", "http://localhost:3000/accomplishments")
  })

  it("should  redirect to Elements page when Elements is clicked", () => {
    cy.get(".SideNav").contains("Elements").click()
    cy.url().should("be.equal", "http://localhost:3000/elements")
  })

})