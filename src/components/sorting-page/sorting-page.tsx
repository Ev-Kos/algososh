import { useState, useEffect, FormEvent } from "react";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './sorting-page.module.css';
import { ElementStates } from "../../types/element-states";

type TArr = {
  value: number;
  color: ElementStates;
}

export const SortingPage: React.FC = () => {
  const [arr, setArr] = useState<TArr[]>([]);

  const randomArr = () => {
    const randomNumber = (minLen: number, maxLen: number) => {
      return Math.floor(Math.random() * (maxLen - minLen) + minLen);
    };

    const num = randomNumber(3, 18);
    const randomArr = Array(num)
      .fill(null)
      .map(() => Math.floor(Math.random() * 100));

    const arr = randomArr.map((value) => ({
      value,
      color: ElementStates.Default,
    }));

    setArr(arr);
  };

  useEffect(() => {
    randomArr();
  }, []);

  const handleClick = (e: FormEvent) => {
    e.preventDefault();
    randomArr();
  };
  
  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.form}>
        <div className={styles.radioButtons}>
          <RadioInput label="Выбор" value='choice' name="choice"/>
          <RadioInput label="Пузырёк" value='bubble' name="bubble"/>
        </div>
        <div className={styles.sortButtons}>
          <Button type="button" text="По возрастанию" extraClass='ascending'/>
          <Button type="button" text="По убыванию" extraClass='descending'/>
        </div>
        <Button type="submit" text="Новый массив" onClick={handleClick}/>
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
