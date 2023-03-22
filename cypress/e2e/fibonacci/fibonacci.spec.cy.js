describe('Тестирование последовательности Фибоначчи', () => {
    const result = [1, 1, 2, 3, 5, 8];
    const colorDefault = "rgb(0, 50, 255)";
    beforeEach(() => {
        cy.visit('http://localhost:3000/fibonacci');
        cy.get('input[type="number"]').as('input');
        cy.get('button[type="submit"]').as('button');
    });

    it('Если в инпуте пусто, кнопка не активна', () => {
        cy.get('@input').should('have.value', '');
        cy.get('@button').should('be.disabled');
    });

    // it('Числа генерируются корректно', () => {
    //     // cy.clock();
    //     // cy.get('@input').type('5').should('have.value', '5');
    //     // cy.get('@button').should('be.not.disabled').click();

    //     cy.get('div[class*="circle_circle"]')
        
    // });
})