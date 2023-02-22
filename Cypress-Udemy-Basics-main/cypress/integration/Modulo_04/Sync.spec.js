/// <reference types="cypress"/>

describe('Wait...', () => {

    before(() => {
        cy.visit('http://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    });

    it('Deve aguarda elemento estar disponivel', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo').type('Funcionou')
    });

    it('Deve fazer retrys', () => {
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
    });

    it('Uso do find', () => {
        cy.get('#buttonList').click()

        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')

          //  cy.get('#lista li')
          //  .find('span')
          //  .should('contain', 'Item 2')

        cy.get('#lista li')
            .should('contain', 'Item 2')
    });

    it('Uso do timeout', () => {
        //cy.get('#buttonDelay').click()
        //cy.get('#novoCampo', {timeout: 1000}).should('exist')

        cy.get('#buttonList').click()

        cy.wait(5000)
        cy.get('#lista li span')
            .should('contain', 'Item 2')
    });

    it('Click Retry', () => {
        cy.get('#buttonCount').click()
        .should('have.value', '11')
    });

    it('Should vs Then', () => {
        cy.get('#buttonList').then($el => {
            expect($el).to.have.length(1)
        }).and('have.id', 'buttonList')
    });
})


