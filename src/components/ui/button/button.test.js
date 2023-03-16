import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button';

describe('Тестирование компонента Button', () => {
    it('Кнопка с текстом', () => {
        render(<Button text='text' />);
        const btn = screen.getByText('text');
        expect(btn).toBeInTheDocument();
        expect(btn).toMatchSnapshot();
    });

    it('Кнопка без текста', () => {
        render(<Button />);
        const btn = screen.getByRole('button');
        expect(btn).toBeInTheDocument();
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