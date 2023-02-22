/// <reference types="cypress"/>

describe('Helpers', () => {
    it('Wrap', () => {
        const obj = {nome: 'user', idade: 20}
        expect(obj).to.have.property('nome')
        cy.wrap(obj).should('have.property', 'nome')

        cy.visit('http://wcaquino.me/cypress/componentes.html')
        // cy.get('#formNome').then($el => {
        //    cy.wrap($el).type('Funciona via cypress')
        //    // $el.val('funciona via Jquery')
        // });

        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
               resolve(10) 
            },500);
        })

        cy.get('#buttonSimple').then(()=>{
            console.log('primeiro botão');
        })

        //promise.then(num => console.log(num))
        cy.wrap(promise).then(ret => console.log(ret))

        cy.get('#buttonList').then(()=>{
            console.log('segundo botão');
        })

        cy.wrap(1).then(num => {
            return 2
        }). should('be.equal', 2)
    });

    it('Its..', () => {
        const obj = {nome: 'user', idade: 20}
        cy.wrap(obj).should('have.property', 'nome', 'user')
        cy.wrap(obj).its('nome').should('be.equal', 'user')

        const obj2 = {nome: 'user', idade: 20, endereco:{ rua: 'avenida 3'}}
        //cy.wrap(obj2).its('endereco').should('have.property', 'rua')
        cy.wrap(obj2).its('endereco').its('rua').should('contain', 'avenida 3')
        cy.wrap(obj2).its('endereco.rua').should('contain', 'avenida 3')

        cy.visit('http://wcaquino.me/cypress/componentes.html')
        cy.title().its('length').should('be.equal', 20)
    });

    it('Invoke', () => {
        const getValue = () => 1;
        const soma = (a,b) => a+b;

        cy.wrap({fn: getValue}).invoke('fn').should('be.equal', 1)
        cy.wrap({fn: soma}).invoke('fn', 5,5).should('be.equal', 10)

        cy.visit('http://wcaquino.me/cypress/componentes.html')
        cy.get('#formNome').invoke('val', 'Texto via invoke')
        cy.window().invoke('alert', 'Dá pra ver?')

        cy.get('#resultado').invoke('html', '<input type="button" value="hack"/>')
    });
});