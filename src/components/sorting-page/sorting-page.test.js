import { render, screen,  waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { selectionSortDes } from './sorting-page';
import {SHORT_DELAY_IN_MS} from '../../constants/delays';
import { TArrNumber } from '../../types/types';

const array = [];

describe('Тестирование алгоритмов сортировки выбором и пузырьком', () => {
    
    it('Корректно сортирует пустой массив выбором по убыванию', async () => {
        
    })
})