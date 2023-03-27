import { SHORT_DELAY_IN_MS } from '../../../src/constants/delays';
import { 
    circle, 
    colorDefault, 
    colorChanging, 
    colorModified, 
    head, 
    tail, 
    index,
    circleSmall,
    circleText 
} from '../constans';

describe('Тестирование Связного списка', () => {
    
    beforeEach(() => {
        cy.visit('http://localhost:3000/list');
        cy.get('[data-testid="inputValue"]').as('inputValue')
        cy.contains('Добавить в head').as('addHeadButton');
        cy.contains('Добавить в tail').as('addTailButton');
        cy.contains('Удалить из head').as('delHeadButton');
        cy.contains('Удалить из tail').as('delTailButton');
        cy.get('[data-testid="inputIndex"]').as('inputIndex');
        cy.contains('Добавить по индексу').as('addIndexButton');
        cy.contains('Удалить по индексу').as('delIndexButton');
    });

    it('Если в инпутах пусто, кнопки не активны', () => {
        cy.get('@inputValue').should('have.value', '');
        cy.get('@addHeadButton').should('be.disabled');
        cy.get('@addTailButton').should('be.disabled');
        cy.get('@delHeadButton').should('be.not.disabled');
        cy.get('@delTailButton').should('be.not.disabled');
        cy.get('@inputIndex').should('have.value', '');
        cy.get('@addIndexButton').should('be.disabled');
        cy.get('@delIndexButton').should('be.disabled');
    });

    it('Отрисовки дефолтного списка', () => {
        cy.get(circle).should('have.length', 4)
            .should('have.css', 'border-color', colorDefault);
        cy.get(head).eq(0).contains('head');
        cy.get(tail).eq(3).contains('tail');
        cy.get(index).should('have.length', 4);
    });

    it('Добавление элемента в head', () => {
        cy.clock();
        cy.get(circle).should('have.length', 4);
        cy.get('@inputValue').type('1');
        cy.get('@addTailButton').should('be.not.disabled');
        cy.get('@addHeadButton').should('be.not.disabled').click();
        cy.get(circleSmall).should('have.length', 1)
            .should('have.css', 'border-color', colorChanging)
            .contains('1');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(circleSmall).should('not.exist');
        cy.get(circle).should('have.length', 5)
            .eq(0).should('have.css', 'border-color', colorModified)
            .contains('1');
        cy.get(head).eq(0).contains('head');
        cy.get(tail).eq(4).contains('tail');
        cy.get('@delHeadButton').should('be.disabled');
        cy.get('@delTailButton').should('be.disabled');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(circle).should('have.length', 5).eq(0)
            .should('have.css', 'border-color', colorDefault);
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@inputValue').should('have.value', '');
        cy.get('@delHeadButton').should('be.not.disabled');
        cy.get('@delTailButton').should('be.not.disabled');
        cy.get('@addHeadButton').should('be.disabled');
        cy.get('@addTailButton').should('be.disabled');
    });

    it('Добавление элемента в tail', () => {
        cy.clock();
        cy.get(circle).should('have.length', 4);
        cy.get('@inputValue').type('5');
        cy.get('@addHeadButton').should('be.not.disabled');
        cy.get('@addTailButton').should('be.not.disabled').click();
        cy.get(circleSmall).should('have.length', 1)
            .should('have.css', 'border-color', colorChanging)
            .contains('5');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(circleSmall).should('not.exist');
        cy.get(circle).should('have.length', 5).eq(4)
            .should('have.css', 'border-color', colorModified)
            .contains('5');
        cy.get(tail).eq(4).contains('tail');
        cy.get('@delHeadButton').should('be.disabled');
        cy.get('@delTailButton').should('be.disabled');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(circle).should('have.length', 5).eq(4)
            .should('have.css', 'border-color', colorDefault);
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@inputValue').should('have.value', '');
        cy.get('@delHeadButton').should('be.not.disabled');
        cy.get('@delTailButton').should('be.not.disabled');
        cy.get('@addHeadButton').should('be.disabled');
        cy.get('@addTailButton').should('be.disabled');
    });

    it('Добавление элемента по индексу', () => {
        cy.clock();
        cy.get(circle).should('have.length', 4);
        cy.get('@inputValue').type('1');
        cy.get('@addHeadButton').should('be.not.disabled');
        cy.get('@addTailButton').should('be.not.disabled');
        cy.get('@inputIndex').type('2');
        cy.get('@delIndexButton').should('be.not.disabled');
        cy.get('@addIndexButton').should('be.not.disabled').click();
        cy.get('@addHeadButton').should('be.disabled');
        cy.get('@addTailButton').should('be.disabled');
        cy.get('@delHeadButton').should('be.disabled');
        cy.get('@delTailButton').should('be.disabled');
        cy.get('@delIndexButton').should('be.disabled');
        cy.get(circleSmall)
            .should('have.css', 'border-color', colorChanging);
        cy.get(circleText).eq(0).contains('1');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(circle).eq(0)
            .should('have.css', 'border-color', colorChanging);
        cy.get(circleText).eq(1).contains('1');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(circle).eq(1)
            .should('have.css', 'border-color', colorChanging);
        cy.get(circleText).eq(2).contains('1');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(circle).eq(2)
            .should('have.css', 'border-color', colorModified)
            .contains('1');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(circle).eq(2)
            .should('have.css', 'border-color', colorDefault)
            .contains('1');
        cy.get(circle).should('have.length', 5);
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@inputValue').should('have.value', '');
        cy.get('@inputIndex').should('have.value', '');
        cy.get('@delHeadButton').should('be.not.disabled');
        cy.get('@delTailButton').should('be.not.disabled');
        cy.get('@addHeadButton').should('be.disabled');
        cy.get('@addTailButton').should('be.disabled');
        cy.get('@addIndexButton').should('be.disabled');
        cy.get('@delIndexButton').should('be.disabled');
    });

    it('Удаление элемента из head', () => {
        cy.clock();
        cy.get(circle).should('have.length', 4);
        cy.get('@delHeadButton').should('be.not.disabled').click();
        cy.get(circle).eq(0)
            .should('have.css', 'border-color', colorDefault)
            .should('have.text', '');
        cy.get(circleSmall).should('have.css', 'border-color', colorChanging);
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(circle).should('have.length', 3);
        cy.get(head).eq(0).contains('head');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@delHeadButton').should('be.not.disabled');
        cy.get('@delTailButton').should('be.not.disabled');
        cy.get('@addHeadButton').should('be.disabled');
        cy.get('@addTailButton').should('be.disabled');
        cy.get('@addIndexButton').should('be.disabled');
        cy.get('@delIndexButton').should('be.disabled');
    });

    it('Удаление элемента из tail', () => {
        cy.clock();
        cy.get(circle).should('have.length', 4);
        cy.get('@delTailButton').should('be.not.disabled').click();
        cy.get(circle).eq(3)
            .should('have.css', 'border-color', colorDefault)
            .should('have.text', '');
        cy.get(circleSmall).should('have.css', 'border-color', colorChanging);
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(circle).should('have.length', 3);
        cy.get(tail).eq(2).contains('tail');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@delHeadButton').should('be.not.disabled');
        cy.get('@delTailButton').should('be.not.disabled');
        cy.get('@addHeadButton').should('be.disabled');
        cy.get('@addTailButton').should('be.disabled');
        cy.get('@addIndexButton').should('be.disabled');
        cy.get('@delIndexButton').should('be.disabled');
    });

    it('Удаление элемента по индексу', () => {
        cy.clock();
        cy.get(circle).should('have.length', 4);
        cy.get('@inputIndex').type('2');
        cy.get('@delIndexButton').should('be.not.disabled').click()
        cy.get('@delHeadButton').should('be.disabled');
        cy.get('@delTailButton').should('be.disabled');
        cy.get('@addIndexButton').should('be.disabled');
        cy.get(circle).eq(0)
            .should('have.css', 'border-color', colorChanging);
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(circle).eq(1)
            .should('have.css', 'border-color', colorChanging);
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(circle).eq(2)
            .should('have.css', 'border-color', colorChanging)
            .should('have.text', '');
        cy.get(circleSmall).should('have.css', 'border-color', colorChanging);
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(circle).should('have.length', 3);
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@inputIndex').should('have.value', '');
        cy.get('@delHeadButton').should('be.not.disabled');
        cy.get('@delTailButton').should('be.not.disabled');
        cy.get('@addHeadButton').should('be.disabled');
        cy.get('@addTailButton').should('be.disabled');
        cy.get('@addIndexButton').should('be.disabled');
        cy.get('@delIndexButton').should('be.disabled');
    });
})