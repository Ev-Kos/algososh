import { FC, useState, ChangeEvent, FormEvent} from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './string.module.css';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { ElementStates } from '../../types/element-states';
import {DELAY_IN_MS} from '../../constants/delays'

type TString = {
  value: string;
  color: ElementStates;
}

export const StringComponent: FC = () => {
  const [string, setString] = useState('');
  const [arrStr, setArrStr] = useState<Array<TString>>();
  const [count, setCount] = useState({ start: -1, end: 99, loader: false });

  const onChange = (e: ChangeEvent<HTMLInputElement>)=>{
    setString(e.target.value);
  }

  const colorSwap = (arr: TString[], firstIndex: number, secondIndex: number): void => {
    arr[secondIndex].color = arr[firstIndex].color = ElementStates.Changing;
    if (secondIndex === firstIndex) {
      arr[secondIndex].color = ElementStates.Modified;
    }
    if (secondIndex - firstIndex < 2) {
      arr[secondIndex].color = arr[firstIndex].color = ElementStates.Modified;
    }
    if (firstIndex !== 0) {
      arr[secondIndex + 1].color = arr[firstIndex - 1].color = ElementStates.Modified;
    }
  }

  const swap = (arr: TString[], firstIndex: number, secondIndex: number) => {
    let tmp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = tmp;
    setCount({
      ...count,
      start: firstIndex + 1,
      end: secondIndex - 1,
      loader: true,
    });
    colorSwap(arr, firstIndex, secondIndex);
    if (firstIndex + 1 === secondIndex || firstIndex === secondIndex) {
      setCount({
        ...count,
        start: firstIndex + secondIndex + 1,
        end: 12,
        loader: false,
      });
    }
  }

  const handleClick = (e: FormEvent) =>{
    e.preventDefault();
    const word = string.split('').map((value, index) => ({value, color: ElementStates.Default, id: index}));
    reverseString(word);
    setCount({ ...count, start: -1, end: 12, loader: true });
  }

  const reverseString = (word: TString[]) => {
    let start = 0;
    let end = word.length - 1;
    let curr = 1;
    while (start <= end) {
      setArrStr([...word]);
      (function(start, end, curr) {
        setTimeout(() => {
          swap(word, start, end);
          setArrStr([...word]);
        }, DELAY_IN_MS * curr);
      })(start++, end--, curr++); 
    }
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={handleClick}>
        <Input isLimitText={true} maxLength={11} onChange={onChange}></Input>
        <Button text='Развернуть' type="submit" isLoader={count.loader} disabled={string.length > 0 ? false: true}></Button>
      </form>
      <div  className={styles.arr}>
        {
          arrStr?.map((item, index)=>(
            <Circle letter={item.value} key={index} state={item.color}/>
          ))
        }
      </div>
    </SolutionLayout>
  )
};
