import { ElementStates } from './element-states';

export type TArrNumber = {
    value: number;
    color: ElementStates;
}

export type TArrString = {
    value: string;
    color: ElementStates;
}

export type TList = {
    value: string;
    color: ElementStates;
    arrow?:  boolean;
    topCircle?: boolean;
    bottomCircle?: boolean;
    smallCircle?: {
      value: string;
      color: ElementStates
    }
  }