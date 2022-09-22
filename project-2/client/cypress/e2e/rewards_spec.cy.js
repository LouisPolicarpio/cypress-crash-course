beforeEach(()=>{
  cy.visit('/rewards')

})


describe('empty spec', () => {
  it('passes', () => {
    cy.get("ul")
      .should("contain", "500 points for drinking 8 cups of water for 7 straight day")
    
  })
})