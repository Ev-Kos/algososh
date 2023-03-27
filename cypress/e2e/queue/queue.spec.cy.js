import { SHORT_DELAY_IN_MS } from '../../../src/constants/delays';
import { 
    colorDefault,
    colorChanging,
    circle,
    head,
    index,
    tail 
} from '../constans';

describe('Тестирование Очереди', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/queue');
        cy.get('input').as('input');
        cy.contains('Добавить').as('addButton');
        cy.contains('Удалить').as('delButton');
        cy.contains('Очистить').as('clearButton');
        cy.get(circle).should('have.length', 7);
    });

    it('Если в инпуте пусто, кнопки не активны', () => {
        cy.get('@input').should('have.value', '');
        cy.get('@addButton').should('be.disabled');
        cy.get('@delButton').should('be.disabled');
        cy.get('@clearButton').should('be.disabled');
    });

    it('Тестирование добавления элемента в Очередь', () => {
        cy.clock();
        cy.get('@input').type('1');
        cy.get('@addButton').should('be.not.disabled').click();
        cy.get(circle).eq(0).should('have.css', 'border-color', colorChanging)
            .contains('1');
        cy.get(head).eq(0).contains('head');
        cy.get(index).eq(0).contains('0');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(circle).eq(0).should('have.css', 'border-color', colorDefault)
            .contains('1');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(tail).eq(0).contains('tail');
        cy.get('@addButton').should('be.disabled');
        cy.get('@delButton').should('be.not.disabled');
        cy.get('@clearButton').should('be.not.disabled');

        cy.get('@input').type('2');
        cy.get('@addButton').should('be.not.disabled').click();
        cy.get(circle).eq(1).should('have.css', 'border-color', colorChanging)
            .contains('2');
        cy.get(head).eq(0).contains('head');
        cy.get(index).eq(1).contains('1');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(circle).eq(1).should('have.css', 'border-color', colorDefault)
            .contains('2');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(tail).eq(1).contains('tail');
        cy.get('@addButton').should('be.disabled');
        cy.get('@delButton').should('be.not.disabled');
        cy.get('@clearButton').should('be.not.disabled');
    });

    it('Тестирование удаления элемента из Очереди', () => {
        cy.clock();
        cy.get('@input').type('1');
        cy.get('@addButton').should('be.not.disabled').click();
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(circle).eq(0).should('have.css', 'border-color', colorDefault)
            .contains('1');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@addButton').should('be.disabled');
        cy.get('@input').type('2');
        cy.get('@addButton').should('be.not.disabled').click();
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(circle).eq(1).should('have.css', 'border-color', colorDefault)
            .contains('2');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@addButton').should('be.disabled');
        cy.get('@delButton').should('be.not.disabled');
        cy.get('@clearButton').should('be.not.disabled');
        
        cy.get('@delButton').click();
        cy.get(circle).eq(0).should('have.css', 'border-color', colorChanging)
            .contains('1');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(circle).eq(0).should('have.css', 'border-color', colorDefault)
            .should('have.text', '');
        cy.get(head).eq(1).contains('head');

        cy.get('@delButton').click();
        cy.get(circle).eq(1).should('have.css', 'border-color', colorChanging)
            .contains('2');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(circle).eq(0).should('have.css', 'border-color', colorDefault)
            .should('have.text', '');
        cy.get(head).eq(1).should('be.empty');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@addButton').should('be.disabled');
        cy.get('@delButton').should('be.disabled');
        cy.get('@clearButton').should('be.disabled');
    });

    it('Тестирование очистки Очереди', () => {
        cy.clock();
        cy.get('@input').type('1');
        cy.get('@addButton').should('be.not.disabled').click();
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(circle).eq(0).should('have.css', 'border-color', colorDefault)
            .contains('1');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@addButton').should('be.disabled');
        cy.get('@input').type('2');
        cy.get('@addButton').should('be.not.disabled').click();
        cy.tick(SHORT_DELAY_IN_MS)
        cy.get(circle).eq(1).should('have.css', 'border-color', colorDefault)
            .contains('2');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@addButton').should('be.disabled');
        cy.get('@delButton').should('be.not.disabled');
        cy.get('@clearButton').should('be.not.disabled');
        cy.get('@clearButton').click();
        cy.get(circle).should('have.length', 7)
            .should('have.css', 'border-color', colorDefault)
            .should('have.text', '');
        cy.get(head).should('be.empty');
        cy.get(tail).should('be.empty');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@clearButton').should('be.disabled');
    });
})