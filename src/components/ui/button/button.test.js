import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button';

describe('Тестирование компонента Button', () => {
    it('Кнопка с текстом', () => {
        const btn = render(<Button text='text' />);
        const text = screen.getByText('text');
        expect(text).toBeInTheDocument();
        expect(btn).toMatchSnapshot();
    });

    it('Кнопка без текста', () => {
        const btn = render(<Button />);
        const withoutText = screen.getByRole('button');
        expect(withoutText).toBeInTheDocument();
        expect(btn).toMatchSnapshot();
    });

    it('Кнопка заблокирована', () => {
        const btn = render(<Button disabled={true} />);
        expect(btn).toMatchSnapshot();
    });

    it('Кнопка с индикацией загрузки', () => {
        const btn = render(<Button isLoader={true} />);
        expect(btn).toMatchSnapshot();
    });
    
    it('Корректность вызова колбека', () => {
        const onClick = jest.fn();
        render(<Button text='text' onClick={onClick} />);
        const btn = screen.getByText('text')
        fireEvent.click(btn);
        expect(onClick).toHaveBeenCalled();
    });
})