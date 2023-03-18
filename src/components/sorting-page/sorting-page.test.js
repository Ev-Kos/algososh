import { bubbleSortAscGen, 
  bubbleSortDesGen, 
  selectionSortAscGen, 
  selectionSortDesGen 
} from '../utils/utils';
import { ElementStates } from '../../types/element-states';

let emptyArr = [];
const initialArrOneEl = [{ value: 1, color: ElementStates.Default }];
const resultArrOneEl = [{ value: 1, color: ElementStates.Modified }];
const initialArray = [
  { value: 2, color: ElementStates.Default },
  { value: 4, color: ElementStates.Default },
  { value: 9, color: ElementStates.Default },
  { value: 0, color: ElementStates.Default },
];
const resultArrayAsc = [
  { value: 0, color: ElementStates.Modified },
  { value: 2, color: ElementStates.Modified },
  { value: 4, color: ElementStates.Modified },
  { value: 9, color: ElementStates.Modified },
];
const resultArrayDes = [
  { value: 9, color: ElementStates.Modified },
  { value: 4, color: ElementStates.Modified },
  { value: 2, color: ElementStates.Modified },
  { value: 0, color: ElementStates.Modified },
];

describe('Тестирование алгоритмов сортировки выбором и пузырьком', () => {
    it('Корректно сортирует пустой массив выбором по убыванию', () => {
      let elements = selectionSortDesGen([]);
        for (let el of elements) {
          emptyArr = el;
        }
        expect(emptyArr).toEqual([]);
    });
    it('Корректно сортирует пустой массив выбором по возрастанию', () => {
      let elements = selectionSortAscGen([]);
        for (let el of elements) {
          emptyArr = el;
        }
        expect(emptyArr).toEqual([]);
    });
    it('Корректно сортирует массив из одного элемента выбором по убыванию', () => {
      let elements = selectionSortDesGen(initialArrOneEl);
        for (let el of elements) {
          emptyArr = el;
        }
        expect(emptyArr).toEqual(resultArrOneEl);
    });
    it('Корректно сортирует массив из одного элемента выбором по возрастанию', () => {
      let elements = selectionSortAscGen(initialArrOneEl);
        for (let el of elements) {
          emptyArr = el;
        }
        expect(emptyArr).toEqual(resultArrOneEl);
    });
    it('Корректно сортирует массив из нескольких элементов выбором по убыванию', () => {
      let elements = selectionSortDesGen(initialArray);
        for (let el of elements) {
          emptyArr = el;
        }
        expect(emptyArr).toEqual(resultArrayDes);
    });
    it('Корректно сортирует массив из нескольких элементов выбором по возрастанию', () => {
      let elements = selectionSortAscGen(initialArray);
        for (let el of elements) {
          emptyArr = el;
        }
        expect(emptyArr).toEqual(resultArrayAsc);
    });

    it('Корректно сортирует пустой массив пузырьком по убыванию', () => {
      let elements = bubbleSortDesGen([]);
        for (let el of elements) {
          emptyArr = el;
        }
        expect(emptyArr).toEqual([]);
    });
    it('Корректно сортирует пустой массив пузырьком по возрастанию', () => {
      let elements = bubbleSortAscGen([]);
        for (let el of elements) {
          emptyArr = el;
        }
        expect(emptyArr).toEqual([]);
    });
    it('Корректно сортирует массив из одного элемента пузырьком по убыванию', () => {
      let elements = bubbleSortDesGen(initialArrOneEl);
        for (let el of elements) {
          emptyArr = el;
        }
        expect(emptyArr).toEqual(resultArrOneEl);
    });
    it('Корректно сортирует массив из одного элемента пузырьком по возрастанию', () => {
      let elements = bubbleSortAscGen(initialArrOneEl);
        for (let el of elements) {
          emptyArr = el;
        }
        expect(emptyArr).toEqual(resultArrOneEl);
    });
    it('Корректно сортирует массив из нескольких элементов пузырьком по убыванию', () => {
      let elements = bubbleSortDesGen(initialArray);
        for (let el of elements) {
          emptyArr = el;
        }
        expect(emptyArr).toEqual(resultArrayDes);
    });
    it('Корректно сортирует массив из нескольких элементов пузырьком по возрастанию', () => {
      let elements = bubbleSortAscGen(initialArray);
        for (let el of elements) {
          emptyArr = el;
        }
        expect(emptyArr).toEqual(resultArrayAsc);
    });
})