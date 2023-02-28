import { FC, useState, useMemo, ChangeEvent } from 'react';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { HEAD, TAIL } from '../../constants/element-captions';
import { ElementStates } from '../../types/element-states';
import { TArrString } from '../../types/types';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { delay } from '../utils/utils';
import { Queue } from './gueue';
import styles from './queue-page.module.css';

export const QueuePage: FC = () => {
  const [arr, setArr] = useState<TArrString[]>(Array(7).fill({value: '', color: ElementStates.Default}));
  const [loader, setLoader]= useState({
    addBtn: false,
    deleteBtn: false,
    clearBtn: false});
  const [string, setString] = useState('');

  const queue =  useMemo(() => {
    return new Queue<TArrString>(7);
  },[]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setString(e.target.value);
  }

  const addElement = async () => {
    setLoader((prevState) => ({ ...prevState, addBtn: true}));
    queue.enqueue({value: string, color: ElementStates.Default});
    arr[queue.tail - 1] = {value: string , color: ElementStates.Changing}
    setArr([...arr])
    await delay(SHORT_DELAY_IN_MS);
    arr[queue.tail - 1] = {value: string , color: ElementStates.Default}
    setArr([...arr])
    await delay(SHORT_DELAY_IN_MS);
    setString('');
    setLoader((prevState) => ({ ...prevState, addBtn: false}));
  }

  const deleteElement = async () => {
    setLoader((prevState) => ({ ...prevState, deleteBtn: true}));
    arr[queue.head].color = ElementStates.Changing;
    setArr([...arr]);
    await delay(SHORT_DELAY_IN_MS)
    arr[queue.head].value = '';
    arr[queue.head].color = ElementStates.Default;
    setArr([...arr]);
    queue.dequeue();
    setLoader((prevState) => ({ ...prevState, deleteBtn: false}));
  }

  const clear = async () => {
    setLoader((prevState) => ({ ...prevState, clearBtn: true}));
    queue.clear();
    setArr(Array(7).fill({value: '', color: ElementStates.Default}));
    await delay(SHORT_DELAY_IN_MS);
    setLoader((prevState) => ({ ...prevState, clearBtn: false}));
  }

  return (
    <SolutionLayout title="Очередь">
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
            disabled={!string || queue.tail === 7 }
            isLoader={loader.addBtn}>
          </Button>
          <Button text='Удалить' 
            type='button' 
            isLoader={loader.deleteBtn} 
            onClick={deleteElement} 
            disabled={queue.isEmpty() || loader.addBtn}>
          </Button>
        </div>
        <Button text='Очистить' 
          type='button' 
          onClick={clear} 
          isLoader={loader.clearBtn} 
          disabled={loader.addBtn || loader.deleteBtn || queue.isEmpty()}>
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
              head={index === queue.head && arr[index] ? HEAD : ''}
              tail={index === queue.tail - 1 && arr[index] ? TAIL : ''}/>
          );
        })}
      </div>
    </SolutionLayout>
  );
};
