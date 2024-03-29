import { FC, useState, useEffect, FormEvent } from 'react';
import { Button } from '../ui/button/button';
import { Column } from '../ui/column/column';
import { RadioInput } from '../ui/radio-input/radio-input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './sorting-page.module.css';
import { ElementStates } from '../../types/element-states';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { Direction } from '../../types/direction';
import { bubbleSortAscGen, bubbleSortDesGen, delay, selectionSortAscGen, selectionSortDesGen, swap } from '../utils/utils';
import { TArrNumber } from '../../types/types';

type TInput = {
  choice: boolean;
  bubble: boolean;
}

export const SortingPage: FC = () => {
  const [arr, setArr] = useState<TArrNumber[]>([]);
  const [loader, setLoader]= useState({
    ascBtn: false,
    descBtn: false,
    arrBtn: false
  });
  const [input, setInput] = useState<TInput>({choice: true, bubble: false});

  const randomArr = () => {
    const randomNumber = (minLen: number, maxLen: number) => {
      return Math.floor(Math.random() * (maxLen - minLen) + minLen);
    };
    const num = randomNumber(3, 18);
    const randomArr = Array(num).fill(null)
      .map(() => Math.floor(Math.random() * 100));
    const array = randomArr.map((value) => ({
      value,
      color: ElementStates.Default,
    }));
    setArr(array);
  };

  useEffect(() => {
    randomArr();
  }, []);

  const handleClick = (e: FormEvent) => {
    e.preventDefault();
    randomArr(); 
  };

  

  //по убыванию
  const selectionSortDes = async (arr: TArrNumber[]) => {
    setLoader((prevState) => ({ ...prevState, descBtn: true, arrBtn: true}));
    const { length } = arr;
    let gen = selectionSortDesGen(arr)
    for (let i = 0; i < length - 1; i++) {
      for (let j = i + 1; j < length; j++) {
        setArr(gen.next().value);
        await delay(SHORT_DELAY_IN_MS)
        setArr(gen.next().value);
      }
    }
    setArr(gen.next().value);
    setLoader((prevState) => ({ ...prevState, descBtn: false, arrBtn: false}));
  }

  //по возрастанию
  const selectionSortAsc = async (arr: TArrNumber[]) => {
    setLoader((prevState) => ({ ...prevState, ascBtn: true, arrBtn: true}));
    const { length } = arr;
    let gen = selectionSortAscGen(arr);
    for (let i = 0; i < length - 1; i++) {
      for (let j = i + 1; j < length; j++) {
        setArr(gen.next().value);
        await delay(SHORT_DELAY_IN_MS)
        setArr(gen.next().value);
      }
    }
    setArr(gen.next().value);
    setLoader((prevState) => ({ ...prevState, ascBtn: false, arrBtn: false}));
  }

  //по убыванию пузырьком
  const bubbleSortDes = async (arr: TArrNumber[]) => {
    setLoader((prevState) => ({ ...prevState, descBtn: true, arrBtn: true}));
    const { length } = arr;
    let gen = bubbleSortDesGen(arr);

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        setArr(gen.next().value);
        await delay(SHORT_DELAY_IN_MS);
      }
    }
    setArr(gen.next().value);
    setLoader((prevState) => ({ ...prevState, descBtn: false, arrBtn: false}));
  };

  //по возрастанию пузырьком
  const bubbleSortAsc = async (arr: TArrNumber[]) => {
    setLoader((prevState) => ({ ...prevState, ascBtn: true, arrBtn: true}));
    const { length } = arr;
    let gen = bubbleSortAscGen(arr);

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        setArr(gen.next().value);
        await delay(SHORT_DELAY_IN_MS);
      }
    }
    setArr(gen.next().value);
    setLoader((prevState) => ({ ...prevState, ascBtn: false, arrBtn: false}));
  };

  const selectInput = (item: string) => {
    if (item === 'choice') {
      input.choice
        ? setInput({ ...input, choice: false })
        : setInput({ choice: true, bubble: false });
    }
    if (item === 'bubble') {
      input.bubble
        ? setInput({ ...input, bubble: false })
        : setInput({ choice: false, bubble: true });
    }
  }

  return (
    <SolutionLayout title='Сортировка массива'>
      <form className={styles.form}>
        <div className={styles.radioButtons}>
          <RadioInput label='Выбор' 
            checked={input.choice} 
            onChange={() => {selectInput('choice')}}/>
          <RadioInput label='Пузырёк' 
            checked={input.bubble} 
            onChange={() => {selectInput('bubble')}}/>
        </div>
        <div className={styles.sortButtons}>
          <Button type='button' 
            text='По возрастанию' 
            extraClass='ascending' 
            sorting={Direction.Ascending} 
            disabled={loader.descBtn} 
            isLoader={loader.ascBtn ? true: false} 
            onClick={() => {input.choice ? selectionSortAsc(arr) : bubbleSortAsc(arr)}}>
          </Button>
          <Button type='button' 
            text='По убыванию' 
            extraClass='descending' 
            sorting={Direction.Descending} 
            disabled={loader.ascBtn} 
            isLoader={loader.descBtn ? true: false} 
            onClick={() => {input.choice ? selectionSortDes(arr) : bubbleSortDes(arr)}}>
          </Button>
        </div>
        <Button type='submit' 
          text='Новый массив' 
          onClick={()=>handleClick} 
          disabled={loader.arrBtn ? true: false}>
        </Button>
      </form>
      <div  className={styles.result}>
        {arr.map((item, index) => {
          return (
            <Column index={item.value} key={index} state={item.color}></Column>
          );
        })}
      </div>
    </SolutionLayout>
  );
}
