import { FC } from 'react';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './stack-page.module.css';

export const StackPage: FC = () => {
  return (
    <SolutionLayout title="Стек">
      <form className={styles.form}>
        <div className={styles.container}>
          <Input isLimitText={true} maxLength={4} placeholder='Введите значение'/>
          <Button text='Добавить' type='submit'></Button>
          <Button text='Удалить' type='button'></Button>
        </div>
        <Button text='Очистить' type='button'></Button>
      </form>
      {/* <div  className={styles.result}>
        {arr.map((item, index) => {
          return (
            <Column index={item.value} key={index} state={item.color}></Column>
          );
        })}
      </div> */}
    </SolutionLayout>
  );
};
