import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './string.module.css';
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

export const StringComponent: React.FC = () => {
  return (
    <SolutionLayout title="Строка">
      <form className={styles.form}>
        <Input isLimitText={true} maxLength={11}></Input>
        <Button text='Развернуть' type="submit"></Button>
      </form>
    </SolutionLayout>
  );
};
