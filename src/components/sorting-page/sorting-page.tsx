import { FC, useState, useEffect, FormEvent } from "react";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './sorting-page.module.css';
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Direction } from "../../types/direction";

type TArr = {
  value: number;
  color?: ElementStates;
}

export const SortingPage: FC = () => {
  const [arr, setArr] = useState<TArr[]>([]);
  const [nameSort, setNameSort] = useState<string>('choice');
  const [loader, setLoader]= useState(false);

  const randomArr = () => {
    const randomNumber = (minLen: number, maxLen: number) => {
      return Math.floor(Math.random() * (maxLen - minLen) + minLen);
    };

    const num = randomNumber(3, 18);
    const randomArr = Array(num)
      .fill(null)
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

  const swap = (arr: TArr[], firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

  const delay = (time: number) =>
    new Promise((resolve) => setTimeout(resolve, time));
  
  //по убыванию
  const selectionSortDes = async (arr: TArr[]) => {
    setLoader(true)
    const { length } = arr;
    for (let i = 0; i < length - 1; i++) {
      let maxInd = i;
      for (let j = i + 1; j < length; j++) {
        arr[i].color = ElementStates.Changing;
        arr[j].color = ElementStates.Changing;
        setArr([...arr]);
        await delay(SHORT_DELAY_IN_MS)
        if (arr[j].value > arr[maxInd].value) {
          maxInd = j;   
        }
        arr[j].color = ElementStates.Default;
        setArr([...arr]);
      }
      swap(arr, i, maxInd);
      arr[i].color = ElementStates.Modified;
    }
    arr[length - 1].color = ElementStates.Modified;
    setArr([...arr]);
    setLoader(false)
  }


  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.form}>
        <div className={styles.radioButtons}>
          <RadioInput label="Выбор" checked={nameSort === 'choice' ? true : false}/>
          <RadioInput label="Пузырёк" checked={nameSort === 'bubble' ? true : false}/>
        </div>
        <div className={styles.sortButtons}>
          <Button type="button" text="По возрастанию" extraClass='ascending'/>
          <Button type="button" text="По убыванию" extraClass='descending' sorting={Direction.Descending} onClick={()=>selectionSortDes(arr)} isLoader={loader}/>
        </div>
        <Button type="submit" text="Новый массив" onClick={()=>handleClick}/>
      </form>
      <div  className={styles.result}>
      {arr.map((item, index) => {
            return (
              <Column
                index={item.value}
                key={index}
                extraClass="mr-3 ml-3"
                state={item.color}
              ></Column>
            );
          })}
        
      </div>
    </SolutionLayout>
  );
};
