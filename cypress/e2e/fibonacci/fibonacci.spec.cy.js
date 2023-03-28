import { circle } from "../constans";

describe('Тестирование последовательности Фибоначчи', () => {
    const result = [1, 1, 2, 3, 5, 8];
    beforeEach(() => {
        cy.visit('http://localhost:3000/fibonacci');
        cy.get('input[type="number"]').as('input');
        cy.get('button[type="submit"]').as('button');
    });

    it('Если в инпуте пусто, кнопка не активна', () => {
        cy.get('@input').should('have.value', '');
        cy.get('@button').should('be.disabled');
    });

    it('Числа генерируются корректно', () => {
        cy.get('@input').type(5).should('have.value', 5);
        cy.get('div[class*=result]').children().should('have.length', 0);
        cy.get('@button').should('be.not.disabled').click();

        for (let i = 0; i < result.length; i++) {
            cy.get('div[class*=result]')
                .children()
                .last()
                .find(circle)
                .should('have.text', result[i]);
        };    
    });
})