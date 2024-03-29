import { FC, useState, FormEvent, ChangeEvent } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './fibonacci-page.module.css';
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { delay } from '../utils/utils';

export const FibonacciPage: FC = () => {
  const [number, setNumber] = useState<number>(0);
  const [arrNumber, setArrNumber] = useState<number[]>([]);
  const [loader, setLoader] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNumber(Number(e.target.value));
  };

  const fibIterative = (num: number): number[] => {
    let arr: number[] = [0, 1];
    for (let i = 2; i < num + 1; i++) {
      arr.push(arr[i - 2] + arr[i - 1]);
    }
    return arr.slice(1);
  };

  const handleClick = async (e: FormEvent) => {
    e.preventDefault();
    let inputValue = Number(number);
    setLoader(true);
    const renderArr: number[] = [];
    const array = fibIterative(inputValue + 1);
    
    for(let el of array) {
      await delay(SHORT_DELAY_IN_MS);
      renderArr.push(el);
      setArrNumber([...renderArr]);
    }
    if(array.length - 1 === renderArr.length - 1) {
      setLoader(false);
    }
  }

  return (
    <SolutionLayout title='Последовательность Фибоначчи'>
      <form className={styles.form} onSubmit={handleClick}>
        <Input type='number' isLimitText={true} max={19} min={1} onChange={onChange}></Input>
        <Button text='Рассчитать' 
          type='submit' 
          isLoader={loader} 
          disabled={number > 0 && number <= 19 ? false: true}>
        </Button>
      </form>
      <div  className={styles.result}>
        {arrNumber.map((value, index)=> (
           <Circle letter={String(value)} key={index} index={index}/>
          ))
        }
      </div>
    </SolutionLayout>
  );
};
