import { TArrNumber, TArrString } from '../../types/types';

export const delay = (time: number) =>
    new Promise((resolve) => setTimeout(resolve, time));

export const swap = (arr: TArrNumber[] | TArrString[], firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
};