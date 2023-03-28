import { render, screen,  waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { StringComponent } from './string';
import {DELAY_IN_MS} from '../../constants/delays'

describe('Тестирование алгоритма разворота строки', () => {
    it('С четным количеством символов', () => {
        render(
          <BrowserRouter>
            <StringComponent />
          </BrowserRouter>
        )
        const input = screen.getByTestId('input');
        const button = screen.getByTestId('button');
        const testString = 'test';
    
        userEvent.type(input, testString);
        expect(input).toHaveValue(testString);
        userEvent.click(button);
        waitFor(() => {
            const elements = screen.getAllByTestId('circle').map((el) => el.textContent)
            expect(elements.join('')).toBe(Array(testString).reverse().join(''))
        }, {timeout: DELAY_IN_MS})
      });

    it('С нечетным количеством символов', () => {
        render(
            <BrowserRouter>
              <StringComponent />
            </BrowserRouter>
        )
        const input = screen.getByTestId('input');
        const button = screen.getByTestId('button');
        const testString = 'tests';
      
        userEvent.type(input, testString);
        expect(input).toHaveValue(testString);
        userEvent.click(button);
        waitFor(() => {
            const elements = screen.getAllByTestId('circle').map((el) => el.textContent)
            expect(elements.join('')).toBe(Array(testString).reverse().join(''))
        }, {timeout: DELAY_IN_MS})
    });

    it('С одним символом', () => {
        render(
            <BrowserRouter>
              <StringComponent />
            </BrowserRouter>
        )
        const input = screen.getByTestId('input');
        const button = screen.getByTestId('button');
        const testString = 't';
      
        userEvent.type(input, testString);
        expect(input).toHaveValue(testString);
        userEvent.click(button);
        waitFor(() => {
            const elements = screen.getAllByTestId('circle').map((el) => el.textContent)
            expect(elements.join('')).toBe(Array(testString).reverse().join(''))
        }, {timeout: DELAY_IN_MS})
    });

    it('С пустой строкой', () => {
        render(
            <BrowserRouter>
              <StringComponent />
            </BrowserRouter>
        )
        const input = screen.getByTestId('input');
        const button = screen.getByTestId('button');
        const testString = '';
      
        expect(input).toHaveValue(testString);
        expect(button).toBeDisabled();
    });
})