describe('Тестирование переходов по страницам', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it('Переход на страницу fibbonacci и обратно на главную страницу', () => {
        cy.get('a[href*=fibonacci').click();
        cy.contains('Последовательность Фибоначчи');

        cy.get('p[class="text text_type_button text_color_link ml-4"]').click();
        cy.contains('МБОУ АЛГОСОШ');
    });

    it('Переход на страницу list и обратно на главную страницу', () => {
        cy.get('a[href*=list').click();
        cy.contains('Связный список');

        cy.get('p[class="text text_type_button text_color_link ml-4"]').click();
        cy.contains('МБОУ АЛГОСОШ');
    });

    it('Переход на страницу queue и обратно на главную страницу', () => {
        cy.get('a[href*=queue').click();
        cy.contains('Очередь');

        cy.get('p[class="text text_type_button text_color_link ml-4"]').click();
        cy.contains('МБОУ АЛГОСОШ');
    });

    it('Переход на страницу queue и обратно на главную страницу', () => {
        cy.get('a[href*=sorting').click();
        cy.contains('Сортировка массива');

        cy.get('p[class="text text_type_button text_color_link ml-4"]').click();
        cy.contains('МБОУ АЛГОСОШ');
    });

    it('Переход на страницу queue и обратно на главную страницу', () => {
        cy.get('a[href*=stack').click();
        cy.contains('Стек');

        cy.get('p[class="text text_type_button text_color_link ml-4"]').click();
        cy.contains('МБОУ АЛГОСОШ');
    });

    it('Переход на страницу queue и обратно на главную страницу', () => {
        cy.get('a[href*=recursion').click();
        cy.contains('Строка');

        cy.get('p[class="text text_type_button text_color_link ml-4"]').click();
        cy.contains('МБОУ АЛГОСОШ');
    });
    
})