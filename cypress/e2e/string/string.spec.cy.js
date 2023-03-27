import {DELAY_IN_MS} from '../../../src/constants/delays';
import {
    colorDefault,
    colorChanging,
    colorModified,
    circle
} from '../constans';

describe('Тестирования разворота строки', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/recursion');
        cy.get('[data-testid="input"]').as('input');
        cy.get('[data-testid="button"]').as('button');
    });

    it('Если в инпуте пусто, кнопка не активна', () => {
        cy.get('@input').should('have.value', '');
        cy.get('@button').should('be.disabled');
    });

    it('Строка разворачивается корректно', () => {
        cy.clock();
        cy.get('@input').type('word').should('have.value', 'word');
        cy.get('@button').should('be.not.disabled').click();
        cy.get(circle).should('have.length', 4);

        cy.get(circle).eq(0)
            .should('have.css', 'border-color', colorDefault).contains('w');
        cy.get(circle).eq(1)
            .should('have.css', 'border-color', colorDefault).contains('o');
        cy.get(circle).eq(2)
            .should('have.css', 'border-color', colorDefault).contains('r');
        cy.get(circle).eq(3)
            .should('have.css', 'border-color', colorDefault).contains('d');

        cy.tick(DELAY_IN_MS);

        cy.get(circle).eq(0)
            .should('have.css', 'border-color', colorChanging).contains('d');
        cy.get(circle).eq(1)
            .should('have.css', 'border-color', colorDefault).contains('o');
        cy.get(circle).eq(2)
            .should('have.css', 'border-color', colorDefault).contains('r');
        cy.get(circle).eq(3)
            .should('have.css', 'border-color', colorChanging).contains('w');

        cy.tick(DELAY_IN_MS);

        cy.get(circle).eq(0)
            .should('have.css', 'border-color', colorModified).contains('d');
        cy.get(circle).eq(1)
            .should('have.css', 'border-color', colorModified).contains('r');
        cy.get(circle).eq(2)
            .should('have.css', 'border-color', colorModified).contains('o');
        cy.get(circle).eq(3)
            .should('have.css', 'border-color', colorModified).contains('w');
    });
})