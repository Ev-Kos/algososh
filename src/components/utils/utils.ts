import { ElementStates } from '../../types/element-states';
import { TArrNumber, TArrString } from '../../types/types';

//задержка
export const delay = (time: number) =>
    new Promise((resolve) => setTimeout(resolve, time));

//обмен значений
export const swap = (arr: TArrNumber[] | TArrString[], firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
};

//генератор сортировки выбором по убыванию
export function* selectionSortDesGen(arr: TArrNumber[]): Generator<TArrNumber[]> {
    const { length } = arr;
    for (let i = 0; i < length - 1; i++) {
        let maxInd = i;
        for (let j = i + 1; j < length; j++) {
            arr[i].color = ElementStates.Changing;
            arr[j].color = ElementStates.Changing;
            yield [...arr];
            if (arr[j].value > arr[maxInd].value) {
            maxInd = j;   
            }
            arr[j].color = ElementStates.Default;
            yield [...arr];
        }
        swap(arr, i, maxInd);
        arr[i].color = ElementStates.Modified;
    }
    arr[length - 1].color = ElementStates.Modified;
    yield [...arr];
};

//генератор сортировки выбором по возрастанию
export function* selectionSortAscGen(arr: TArrNumber[]): Generator<TArrNumber[]> {
    const { length } = arr;
    for (let i = 0; i < length - 1; i++) {
        let minInd = i;
        for (let j = i + 1; j < length; j++) {
            arr[i].color = ElementStates.Changing;
            arr[j].color = ElementStates.Changing;
            yield [...arr];
            if (arr[j].value < arr[minInd].value) {
            minInd = j;   
            }
            arr[j].color = ElementStates.Default;
            yield [...arr];
        }
        swap(arr, i, minInd);
        arr[i].color = ElementStates.Modified;
    }
    arr[length - 1].color = ElementStates.Modified;
    yield [...arr];
};

//генератор сортировки пузырьком по убыванию
export function* bubbleSortDesGen(arr: TArrNumber[]): Generator<TArrNumber[]> {
    const { length } = arr;

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        arr[j].color = ElementStates.Changing;
        arr[j + 1].color = ElementStates.Changing;
        yield [...arr];
        if (arr[j].value < arr[j + 1].value) {
          swap(arr, j, j + 1);
        }
        arr[j].color = ElementStates.Default;
      }
      arr[length - i - 1].color = ElementStates.Modified;
    }
    yield [...arr];
}

//генератор сортировки пузырьком по возрастанию
export function* bubbleSortAscGen(arr: TArrNumber[]): Generator<TArrNumber[]> {
    const { length } = arr;

    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - i - 1; j++) {
            arr[j].color = ElementStates.Changing;
            arr[j + 1].color = ElementStates.Changing;
            yield [...arr];
            if (arr[j].value > arr[j + 1].value) {
                swap(arr, j, j + 1);
            }
            arr[j].color = ElementStates.Default;
        }
        arr[length - i - 1].color = ElementStates.Modified;
    }
    yield [...arr];
}