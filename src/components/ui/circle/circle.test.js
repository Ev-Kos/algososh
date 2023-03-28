import { render, screen, fireEvent } from '@testing-library/react';
import { ElementStates } from '../../../types/element-states';
import { Circle } from './circle';

describe('Тестирование компонента Circle', () => {
    it('Без букв', () => {
        const circle = render(<Circle letter='' />);
        expect(circle).toMatchSnapshot();
    });

    it('С буквами', () => {
        const circle = render(<Circle letter='test' />);
        const letter = screen.getByText('test');
        expect(letter).toBeInTheDocument();
        expect(circle).toMatchSnapshot();
    });

    it('С head', () => {
        const circle = render(<Circle head={'test'}/>);
        const head = screen.getByText('test');
        expect(head).toBeInTheDocument();
        expect(circle).toMatchSnapshot();
    });

    it('С react-элементом в head', () => {
        const circle = render(<Circle head={<Circle />}/>);
        expect(circle).toMatchSnapshot();
    });

    it('С tail', () => {
        const circle = render(<Circle tail={'test'}/>);
        const tail = screen.getByText('test');
        expect(tail).toBeInTheDocument();
        expect(circle).toMatchSnapshot();
    });

    it('С react-элементом в tail', () => {
        const circle = render(<Circle tail={<Circle />} />);
        expect(circle).toMatchSnapshot;
    });

    it('С index', () => {
        const circle = render(<Circle index='test' />);
        const index = screen.getByText('test');
        expect(index).toBeInTheDocument();
        expect(circle).toMatchSnapshot;
    });

    it('С isSmall ===  true', () => {
        const circle = render(<Circle isSmall={true} />);
        expect(circle).toMatchSnapshot;
    });
    
    it('В состоянии default', () => {
        const circle = render(<Circle state={ElementStates.Default} />);
        expect(circle).toMatchSnapshot;
    });
    
    it('В состоянии changing', () => {
        const circle = render(<Circle state={ElementStates.Changing} />);
        expect(circle).toMatchSnapshot;
    });
    
    it('В состоянии modified', () => {
        const circle = render(<Circle state={ElementStates.Modified} />);
        expect(circle).toMatchSnapshot;
    });
})