import { SHORT_DELAY_IN_MS } from '../../../src/constants/delays';
import { 
    colorDefault,
    colorChanging,
    circle,
    head,
    index 
} from '../constans';

describe('Тестирование Стека', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/stack');
        cy.get('input').as('input');
        cy.contains('Добавить').as('addButton');
        cy.contains('Удалить').as('delButton');
        cy.contains('Очистить').as('clearButton');
    });

    it('Если в инпуте пусто, кнопки не активны', () => {
        cy.get('@input').should('have.value', '');
        cy.get('@addButton').should('be.disabled');
        cy.get('@delButton').should('be.disabled');
        cy.get('@clearButton').should('be.disabled');
    });

    it('Тестирование добавления элемента в Стек', () => {
        cy.clock();
        cy.get('@input').type('1');
        cy.get('@addButton').should('be.not.disabled').click();
        cy.get(circle).eq(0).should('have.length', 1)
            .should('have.css', 'border-color', colorChanging)
            .contains('1');
        cy.get(head).contains('top');
        cy.get(index).eq(0).contains('0');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(circle).eq(0).should('have.css', 'border-color', colorDefault)
            .contains('1')
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@addButton').should('be.disabled');
        cy.get('@delButton').should('be.not.disabled');
        cy.get('@clearButton').should('be.not.disabled');

        cy.get('@input').type('2');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@addButton').should('be.not.disabled').click();
        cy.get(head).eq(0).should('be.empty');
        cy.get(circle).should('have.length', 2)
            .eq(0).should('have.css', 'border-color', colorDefault);   
        cy.get(circle).eq(1).should('have.css', 'border-color', colorChanging)
            .contains('2');
        cy.get(head).eq(1).contains('top');
        cy.get(head).eq(0).should('be.empty');
        cy.get(index).eq(1).contains('1');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(circle).eq(1).should('have.css', 'border-color', colorDefault)
            .contains('2');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@addButton').should('be.disabled');
        cy.get('@delButton').should('be.not.disabled');
        cy.get('@clearButton').should('be.not.disabled');
    });

    it('Тестирование удаления элемента из Стека', () => {
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
        
        cy.get(circle).should('have.length', 2)
            .eq(1).should('have.css', 'border-color', colorDefault);
        cy.get('@delButton').click();
        cy.get(circle).should('have.length', 2)
            .eq(1).should('have.css', 'border-color', colorChanging)
            .contains('2');
        cy.get(head).eq(1).contains('top');
        cy.get(index).eq(1).contains('1');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(circle).should('have.length', 1);
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@addButton').should('be.disabled');
        cy.get('@delButton').should('be.not.disabled');
        cy.get('@clearButton').should('be.not.disabled');

        cy.get('@delButton').click();
        cy.get(circle).eq(0).should('have.css', 'border-color', colorChanging)
            .contains('1');
        cy.get(head).eq(0).contains('top');
        cy.get(index).contains('0');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@addButton').should('be.disabled');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@delButton').should('be.disabled');
        cy.get('@clearButton').should('be.disabled');
        cy.get(circle).should('have.length', 0);
    });

    it('Тестирование очистки Стека', () => {
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
        cy.get('@clearButton').should('be.not.disabled').click();
        cy.get(circle).should('have.length', 0);
        cy.tick(SHORT_DELAY_IN_MS)
        cy.get('@clearButton').should('be.disabled');
    });
})