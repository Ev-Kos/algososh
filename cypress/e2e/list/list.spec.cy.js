import { SHORT_DELAY_IN_MS } from '../../../src/constants/delays';

describe('Тестирование Связного списка', () => {
    const colorDefault = 'rgb(0, 50, 255)';
    const colorChanging = 'rgb(210, 82, 225)';
    const colorModified = 'rgb(127, 224, 81)';
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
        cy.get('div[class*="circle_circle"]').as('circle')
        //cy.get('[data-testid="arrow"]').as('arrow');
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
        cy.get('@circle')
            .should('have.length', 4)
            .should('have.css', 'border-color', colorDefault)
        cy.get('[data-testid="head"]').eq(0).contains('head')
        cy.get('[data-testid="tail"]').eq(3).contains('tail')
        cy.get('[data-testid="index"]').should('have.length', 4)
    });

    it('Добавление элемента в head работает верно', () => {
        cy.clock()
        cy.get('@circle')
        .should('have.length', 4)
        cy.get('@inputValue').type('1')
        cy.get('@addHeadButton').should('be.not.disabled')
        cy.get('@addTailButton').should('be.not.disabled')
        cy.get('@addHeadButton').should('be.not.disabled').click()
        cy.get('div[class*="circle_small"]').should('have.length', 1)
        .should('have.css', 'border-color', colorChanging)
        .contains('1')
        cy.tick(SHORT_DELAY_IN_MS)
        cy.get('div[class*="circle_small"]').should('not.exist')
        cy.get('@circle')
            .should('have.length', 5)
            .eq(0).should('have.css', 'border-color', colorModified)
            .contains('1')
        cy.get('[data-testid="head"]').eq(0).contains('head')
        cy.get('[data-testid="tail"]').eq(4).contains('tail')
        
        cy.get('@delHeadButton').should('be.disabled')
        cy.get('@delTailButton').should('be.disabled')
        cy.tick(SHORT_DELAY_IN_MS)
        cy.get('@circle').should('have.length', 5)
        .eq(0)
        .should('have.css', 'border-color', colorDefault)
        cy.tick(SHORT_DELAY_IN_MS)
        cy.get('@inputValue').should('have.value', '')
        cy.get('@delHeadButton').should('be.not.disabled')
        cy.get('@delTailButton').should('be.not.disabled')
        cy.get('@addHeadButton').should('be.disabled');
        cy.get('@addTailButton').should('be.disabled');
    });

    it('Добавление элемента в tail работает верно', () => {
        cy.clock()
        cy.get('@circle')
        .should('have.length', 4)
        cy.get('@inputValue').type('5')
        cy.get('@addHeadButton').should('be.not.disabled')
        cy.get('@addTailButton').should('be.not.disabled')
        cy.get('@addTailButton').should('be.not.disabled').click()
        cy.get('div[class*="circle_small"]').should('have.length', 1)
        .should('have.css', 'border-color', colorChanging)
        .contains('5')
        cy.tick(SHORT_DELAY_IN_MS)
        cy.get('div[class*="circle_small"]').should('not.exist')
        cy.get('@circle')
        .should('have.length', 5)
        .eq(4).should('have.css', 'border-color', colorModified)
        .contains('5')
        cy.get('[data-testid="tail"]').eq(4).contains('tail')
        cy.get('@delHeadButton').should('be.disabled')
        cy.get('@delTailButton').should('be.disabled')
        cy.tick(SHORT_DELAY_IN_MS)
        cy.get('@circle').should('have.length', 5)
        .eq(4)
        .should('have.css', 'border-color', colorDefault)
        cy.tick(SHORT_DELAY_IN_MS)
        cy.get('@inputValue').should('have.value', '')
        cy.get('@delHeadButton').should('be.not.disabled')
        cy.get('@delTailButton').should('be.not.disabled')
        cy.get('@addHeadButton').should('be.disabled');
        cy.get('@addTailButton').should('be.disabled');
    });

    it('Добавление элемента по индексу работает верно', () => {
        cy.clock()
        cy.get('@circle')
        .should('have.length', 4)
        cy.get('@inputValue').type('1')
        cy.get('@addHeadButton').should('be.not.disabled')
        cy.get('@addTailButton').should('be.not.disabled')
        cy.get('@inputIndex').type('2')
        cy.get('@addIndexButton').should('be.not.disabled')
        cy.get('@delIndexButton').should('be.not.disabled')
        cy.get('@addIndexButton').click()
        cy.get('@addHeadButton').should('be.disabled')
        cy.get('@addTailButton').should('be.disabled')
        cy.get('@delHeadButton').should('be.disabled')
        cy.get('@delTailButton').should('be.disabled')
        cy.get('@delIndexButton').should('be.disabled')
        cy.get('div[class*="circle_small"]')
            .should('have.css', 'border-color', colorChanging)
        cy.get('[data-testid="letter"]').eq(0).contains('1')
        cy.tick(SHORT_DELAY_IN_MS)
        cy.get('@circle')
        .eq(0)
        .should('have.css', 'border-color', colorChanging)
        cy.get('[data-testid="letter"]').eq(1).contains('1')
        cy.tick(SHORT_DELAY_IN_MS)
        cy.get('@circle')
        .eq(1)
        .should('have.css', 'border-color', colorChanging)
        cy.get('[data-testid="letter"]').eq(2).contains('1')
        cy.tick(SHORT_DELAY_IN_MS)
        cy.get('@circle')
        .eq(2)
        .should('have.css', 'border-color', colorModified)
        .contains('1')
        cy.tick(SHORT_DELAY_IN_MS)
        cy.get('@circle')
        .eq(2)
        .should('have.css', 'border-color', colorDefault)
        .contains('1')
        cy.get('@circle').should('have.length', 5)
        cy.tick(SHORT_DELAY_IN_MS)
        cy.get('@inputValue').should('have.value', '')
        cy.get('@inputIndex').should('have.value', '')
        cy.get('@delHeadButton').should('be.not.disabled')
        cy.get('@delTailButton').should('be.not.disabled')
        cy.get('@addHeadButton').should('be.disabled');
        cy.get('@addTailButton').should('be.disabled');
        cy.get('@addIndexButton').should('be.disabled');
        cy.get('@delIndexButton').should('be.disabled')
    });

    it('Удаление элемента из head рботает верно', () => {
        cy.clock()
        cy.get('@circle')
        .should('have.length', 4)
        cy.get('@delHeadButton').should('be.not.disabled').click()
        cy.get('@circle')
        .eq(0)
        .should('have.css', 'border-color', colorDefault)
        .should('have.text', '')
        cy.get('div[class*="circle_small"]')
        .should('have.css', 'border-color', colorChanging)
        cy.tick(SHORT_DELAY_IN_MS)
        cy.get('@circle')
        .should('have.length', 3)
        cy.get('[data-testid="head"]').eq(0).contains('head')
        cy.tick(SHORT_DELAY_IN_MS)
        cy.get('@delHeadButton').should('be.not.disabled')
        cy.get('@delTailButton').should('be.not.disabled')
        cy.get('@addHeadButton').should('be.disabled');
        cy.get('@addTailButton').should('be.disabled');
        cy.get('@addIndexButton').should('be.disabled');
        cy.get('@delIndexButton').should('be.disabled')
    });

    it('Удаление элемента из tail рботает верно', () => {
        cy.clock()
        cy.get('@circle')
         .should('have.length', 4)
        cy.get('@delTailButton').should('be.not.disabled').click()
        cy.get('@circle')
         .eq(3)
         .should('have.css', 'border-color', colorDefault)
         .should('have.text', '')
         cy.get('div[class*="circle_small"]')
         .should('have.css', 'border-color', colorChanging)
         cy.tick(SHORT_DELAY_IN_MS)
         cy.get('@circle')
        .should('have.length', 3)
        cy.get('[data-testid="tail"]').eq(2).contains('tail')
        cy.tick(SHORT_DELAY_IN_MS)
        cy.get('@delHeadButton').should('be.not.disabled')
        cy.get('@delTailButton').should('be.not.disabled')
        cy.get('@addHeadButton').should('be.disabled');
        cy.get('@addTailButton').should('be.disabled');
        cy.get('@addIndexButton').should('be.disabled');
        cy.get('@delIndexButton').should('be.disabled')
    });

    it('Удаление элемента по индексу работает верно', () => {
        cy.clock()
        cy.get('@circle').should('have.length', 4)
        cy.get('@inputIndex').type('2')
        cy.get('@delIndexButton').should('be.not.disabled').click()
        cy.get('@delHeadButton').should('be.disabled')
        cy.get('@delTailButton').should('be.disabled')
        cy.get('@addIndexButton').should('be.disabled');
        cy.get('@circle')
        .eq(0)
        .should('have.css', 'border-color', colorChanging)
        cy.tick(SHORT_DELAY_IN_MS)
        cy.get('@circle')
        .eq(1)
        .should('have.css', 'border-color', colorChanging)
        cy.tick(SHORT_DELAY_IN_MS)
        cy.get('@circle')
        .eq(2)
        .should('have.css', 'border-color', colorChanging).should('have.text', '')
        cy.get('div[class*="circle_small"]')
        .should('have.css', 'border-color', colorChanging)
        cy.tick(SHORT_DELAY_IN_MS)
        cy.get('@circle')
        .should('have.length', 3)
        cy.tick(SHORT_DELAY_IN_MS)
        cy.get('@inputIndex').should('have.value', '')
        cy.get('@delHeadButton').should('be.not.disabled')
        cy.get('@delTailButton').should('be.not.disabled')
        cy.get('@addHeadButton').should('be.disabled');
        cy.get('@addTailButton').should('be.disabled');
        cy.get('@addIndexButton').should('be.disabled');
        cy.get('@delIndexButton').should('be.disabled')
    });
})