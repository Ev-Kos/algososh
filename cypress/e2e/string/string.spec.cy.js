import {DELAY_IN_MS} from '../../../src/constants/delays';

describe('Тестирования разворота строки', () => {
    const colorDefault = 'rgb(0, 50, 255)';
    const colorChanging = 'rgb(210, 82, 225)';
    const colorModified = 'rgb(127, 224, 81)';
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
        cy.get('div[class*="circle_circle"]').should('have.length', 4).as('circles');

        cy.get('@circles').eq(0)
            .should('have.css', 'border-color', colorDefault).contains('w');
        cy.get('@circles').eq(1)
            .should('have.css', 'border-color', colorDefault).contains('o');
        cy.get('@circles').eq(2)
            .should('have.css', 'border-color', colorDefault).contains('r');
        cy.get('@circles').eq(3)
            .should('have.css', 'border-color', colorDefault).contains('d');

        cy.tick(DELAY_IN_MS);

        cy.get('@circles').eq(0)
            .should('have.css', 'border-color', colorChanging).contains('d');
        cy.get('@circles').eq(1)
            .should('have.css', 'border-color', colorDefault).contains('o');
        cy.get('@circles').eq(2)
            .should('have.css', 'border-color', colorDefault).contains('r');
        cy.get('@circles').eq(3)
            .should('have.css', 'border-color', colorChanging).contains('w');

        cy.tick(DELAY_IN_MS);

        cy.get('@circles').eq(0)
            .should('have.css', 'border-color', colorModified).contains('d');
        cy.get('@circles').eq(1)
            .should('have.css', 'border-color', colorModified).contains('r');
        cy.get('@circles').eq(2)
            .should('have.css', 'border-color', colorModified).contains('o');
        cy.get('@circles').eq(3)
            .should('have.css', 'border-color', colorModified).contains('w');
    });
})