import { FC, useMemo, useState, ChangeEvent } from 'react';
import { TArrString } from '../../types/types';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { Circle } from '../ui/circle/circle';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { Stack } from './stack';
import styles from './stack-page.module.css';
import { ElementStates } from '../../types/element-states';
import { delay } from '../utils/utils';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';

export const StackPage: FC = () => {
  const [arr, setArr] = useState<TArrString[]>([]);
  const [loader, setLoader]= useState({
    addBtn: false,
    deleteBtn: false,
    clearBtn: false});
  const [string, setString] = useState('');

  const stack = useMemo(() => {
    return new Stack<TArrString>();
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setString(e.target.value);
  }

  const addElement = async () => {
    setLoader((prevState) => ({ ...prevState, addBtn: true}));
    stack.push({value: string, color: ElementStates.Default});
    const top = stack.peak();
    setArr([...arr, {value: top?.value 
      ? top.value 
      : '', color: ElementStates.Changing}]);
    await delay(SHORT_DELAY_IN_MS);
    setArr([...arr, {value: top?.value 
      ? top.value 
      : '', color: ElementStates.Default}])
    await delay(SHORT_DELAY_IN_MS);
    setLoader((prevState) => ({ ...prevState, addBtn: false}));
    setString('');
  }

  const deleteElement = async () => {
    setLoader((prevState) => ({ ...prevState, deleteBtn: true}));
    arr[arr.length - 1].color = ElementStates.Changing;
    setArr([...arr]);
    await delay(SHORT_DELAY_IN_MS);
    stack.pop();
    arr.pop();
    setArr([...arr]);
    await delay(SHORT_DELAY_IN_MS);
    setLoader((prevState) => ({ ...prevState, deleteBtn: false}));
  }

  const clear = async () => {
    setLoader((prevState) => ({ ...prevState, clearBtn: true}));
    stack.clear();
    setArr([]);
    await delay(SHORT_DELAY_IN_MS);
    setLoader((prevState) => ({ ...prevState, clearBtn: false}));
  }

  return (
    <SolutionLayout title="Стек">
      <form className={styles.form}>
        <div className={styles.container}>
          <Input value={string} 
            isLimitText={true} 
            onChange={onChange} 
            maxLength={4} 
            placeholder='Введите значение'/>
          <Button text='Добавить' 
            type='submit' 
            onClick={addElement} 
            disabled={!string} 
            isLoader={loader.addBtn}>
          </Button>
          <Button text='Удалить' 
            type='button' 
            isLoader={loader.deleteBtn} 
            onClick={deleteElement} 
            disabled={stack.getSize() === 0 || loader.addBtn}>
          </Button>
        </div>
        <Button text='Очистить' 
          type='button' 
          onClick={clear} 
          isLoader={loader.clearBtn} 
          disabled={stack.getSize() === 0 || loader.addBtn || loader.deleteBtn}>
        </Button>
      </form>
      <div  className={styles.result}>
        {arr.map((item, index) => {
          return (
            <Circle 
              letter={item.value} 
              state={item.color} 
              key={index} 
              index={index} 
              head={(stack.getSize() - 1) === index ?'top' : ''}/>
          );
        })}
      </div>
    </SolutionLayout>
  );
};
