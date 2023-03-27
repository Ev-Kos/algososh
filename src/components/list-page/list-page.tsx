import { FC, useState, useMemo, ChangeEvent } from 'react';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { HEAD, TAIL } from '../../constants/element-captions';
import { ElementStates } from '../../types/element-states';
import { TList } from '../../types/types';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { ArrowIcon } from '../ui/icons/arrow-icon';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import { delay } from '../utils/utils';
import { LinkedList } from './list';
import styles from './list-page.module.css';

export const ListPage: FC = () => {
  const [list, setList] = useState<TList[]>(([
    {value: '0', color: ElementStates.Default}, 
    {value: '34', color: ElementStates.Default}, 
    {value: '8', color: ElementStates.Default}, 
    {value: '1', color: ElementStates.Default}]));
  const [value, setValue] = useState<string>('');
  const [index, setIndex] = useState<number | null>(null);
  const [loader, setLoader] = useState({
    addHead: false,
    addTail: false,
    deleteHead: false,
    deleteTail: false,
    addIndex: false,
    deleteIndex: false,
  });
  const [disabled, setDisabled] = useState({
    addHead: false,
    addTail: false,
    deleteHead: false,
    deleteTail: false,
    addIndex: false,
    deleteIndex: false,
  });


  const linkedList = useMemo(() => {
    return new LinkedList<string>(['0', '34', '8', '1']);
  },[])

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) =>{
    setValue(e.target.value);
  }
  const onChangeIndex = (e: ChangeEvent<HTMLInputElement>) =>{
    setIndex(Number(e.target.value))
  }

  const addHead = async () => {
    setLoader((prevState) => ({ ...prevState, addHead: true }));
    setDisabled((prevstate) => ({
      ...prevstate,
      deleteHead: true,
      deleteTail: true,
    }));
    linkedList.insertAt(value, 0);
    if(list.length !== 0) {
      list[0] = {...list[0], topCircle: true, smallCircle: {value: value, color: ElementStates.Changing}}
      setList([...list]);
      await delay(SHORT_DELAY_IN_MS);
      list[0] = {...list[0], topCircle: false}
    }
    list.unshift({
      value: value,
      color: ElementStates.Modified
    })
    setList([...list]);
    await delay(SHORT_DELAY_IN_MS);
    list[0] = {...list[0], color: ElementStates.Default}
    setList([...list]);
    await delay(SHORT_DELAY_IN_MS);
    setValue('');
    setLoader((prevState) => ({ ...prevState, addHead: false }));
    setDisabled((prevstate) => ({
      ...prevstate,
      deleteHead: false,
      deleteTail: false,
    }));
  };

  const addTail = async() =>{
    setLoader((prevState) => ({ ...prevState, addTail: true }));
    setDisabled((prevstate) => ({
      ...prevstate,
      deleteHead: true,
      deleteTail: true,
    }));
    linkedList.append(value);
    if(list.length !== 0) {
      list[list.length - 1] = {...list[list.length - 1], topCircle: true, smallCircle: {value: value, color: ElementStates.Changing}}
      setList([...list]);
      await delay(SHORT_DELAY_IN_MS);
      list[list.length - 1] = {...list[list.length - 1], topCircle: false}
    }
    list.push({
      value: value,
      color: ElementStates.Modified
    })
    setList([...list]);
    await delay(SHORT_DELAY_IN_MS);
     list[list.length - 1] = {...list[list.length - 1], color: ElementStates.Default}
     setList([...list]);
     await delay(SHORT_DELAY_IN_MS);
     setValue('');
     setLoader((prevState) => ({ ...prevState, addTail: false }));
     setDisabled((prevstate) => ({
       ...prevstate,
       deleteHead: false,
       deleteTail: false,
     }));
  }

  const deleteHead = async() =>{
    setLoader((prevState) => ({ ...prevState, deleteHead: true }));
    setDisabled((prevstate) => ({
      ...prevstate,
      deleteTail: true,
    }));
    linkedList.deleteHead();
    const delEl = list[0].value;
    list[0] = {...list[0], value: '', bottomCircle: true, smallCircle: {value: delEl, color: ElementStates.Changing}}
    setList([...list]);
    await delay(SHORT_DELAY_IN_MS);
    list[0] = {...list[0], bottomCircle: false};
    list.shift();
    setList([...list]);
    await delay(SHORT_DELAY_IN_MS);
    setLoader((prevState) => ({ ...prevState, deleteHead: false }));
    setDisabled((prevstate) => ({
      ...prevstate,
      deleteTail: false,
    }));
  }

  const deleteTail = async() =>{
    setLoader((prevState) => ({ ...prevState, deleteTail: true }));
    setDisabled((prevstate) => ({
      ...prevstate,
      deleteHead: true,
    }));
    linkedList.removeAt(list.length - 1);
    const deleteElem = list[list.length - 1].value;
    list[list.length - 1] = {...list[list.length - 1], value: '', bottomCircle: true, smallCircle: {value: deleteElem, color: ElementStates.Changing}}
    setList([...list]);
    await delay(SHORT_DELAY_IN_MS);
    list[list.length - 1] = {...list[list.length - 1], bottomCircle: false};
    list.pop();
    setList([...list]);
    await delay(SHORT_DELAY_IN_MS);
    setLoader((prevState) => ({ ...prevState, deleteTail: false }));
    setDisabled((prevstate) => ({
      ...prevstate,
      deleteHead: false,
    }));
  }

  const addIndex = async() =>{
    setLoader((prevState) => ({ ...prevState, addIndex: true }));
    setDisabled({
      addHead: true,
      addTail: true,
      deleteHead: true,
      deleteTail: true,
      addIndex: true,
      deleteIndex: true,
    });
    if (index === 0) {
      addHead();
    }
    if(index) {
      linkedList.insertAt(value, index);
      list[0] = {...list[0], topCircle: true, smallCircle: {value: value, color: ElementStates.Changing}}
      setList([...list]);
      await delay(SHORT_DELAY_IN_MS);
      for(let i = 1; i <= index; i++){
        list[i] = {...list[i], topCircle: true, smallCircle: {value: value, color: ElementStates.Changing}}
        list[i-1] = {...list[i-1], color: ElementStates.Changing, arrow: true, topCircle: false}
        setList([...list]);
        await delay(SHORT_DELAY_IN_MS);
      }
      list[index] = {...list[index], topCircle: false};
      list.splice(index, 0 ,{value: value , color: ElementStates.Modified})
      setList([...list]);
      await delay(SHORT_DELAY_IN_MS);
      list.map((item)=>{ return (item.color = ElementStates.Default, item.arrow = false )});
      setList([...list]);
      await delay(SHORT_DELAY_IN_MS);
      setIndex(null)
      setValue('')
    }
    setLoader((prevState) => ({ ...prevState, addIndex: false }));
    setDisabled({
      addHead: false,
      addTail: false,
      deleteHead: false,
      deleteTail: false,
      addIndex: false,
      deleteIndex: false,
    });
  }

  const deleteIndex = async() =>{
    setLoader((prevState) => ({ ...prevState, deleteIndex: true }));
    setDisabled({
      addHead: true,
      addTail: true,
      deleteHead: true,
      deleteTail: true,
      addIndex: true,
      deleteIndex: true,
    });
    if(index){
      linkedList.removeAt(index);
      for(let i = 0; i < index; i++){
        list[i] = {...list[i], color: ElementStates.Changing, arrow: true}
        setList([...list]);
        await delay(SHORT_DELAY_IN_MS);
      }
      const deleteElem = list[index].value;
      list[index] = {...list[index], value: '', color: ElementStates.Changing, arrow: false, bottomCircle: true, smallCircle: {value: deleteElem, color: ElementStates.Changing}}
      setList([...list]);
      await delay(SHORT_DELAY_IN_MS);
      list.splice(index, 1);
      list.map((item)=>{ return (item.color = ElementStates.Default, item.arrow = false )});
      setList([...list]);
      await delay(SHORT_DELAY_IN_MS);
      setIndex(null);
    } 
    setLoader((prevState) => ({ ...prevState, deleteIndex: false }));
    setDisabled({
      addHead: false,
      addTail: false,
      deleteHead: false,
      deleteTail: false,
      addIndex: false,
      deleteIndex: false,
    });
  }

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.form}>
        <div className={styles.container}>
          <Input data-testid='inputValue'
            value={value} 
            isLimitText={true} 
            onChange={onChangeValue} 
            maxLength={4} 
            placeholder='Введите значение'
            extraClass={styles.input}/>
          <Button text='Добавить в head' 
            linkedList='small'
            type='button'
            onClick={addHead}
            disabled={
              (value.length === 0 && index === null) ||
              disabled.addHead ||
              (value.length === 0 && index !== null)
            }
            isLoader={loader.addHead}>
          </Button>
          <Button text='Добавить в tail'
            linkedList='small' 
            type='button'
            onClick={addTail}
            disabled={
              (value.length === 0 && index === null) ||
              disabled.addTail ||
              (value.length === 0 && index !== null)
            }
            isLoader={loader.addTail}>
          </Button>
          <Button text='Удалить из head'
            linkedList='small' 
            type='button'
            onClick={deleteHead}
            disabled={
              (list.length === 0 && index === null) ||
              disabled.deleteHead
            }
            isLoader={loader.deleteHead}>
          </Button>
          <Button text='Удалить из tail'
            linkedList='small' 
            type='button'
            onClick={deleteTail}
            disabled={
              (list.length === 0 && index === null) ||
              disabled.deleteTail
            }
            isLoader={loader.deleteTail}>
          </Button>
        </div>
        <div className={styles.container}>
          <Input data-testid='inputIndex'
            value={index? `${index}` : ''} 
            placeholder='Введите индекс' 
            type='number' 
            max={list.length - 1} 
            onInput={onChangeIndex}
            extraClass={styles.input}
            isLimitText={true}/>
          <Button text='Добавить по индексу'
            linkedList='big' 
            type='button'
            onClick={addIndex}
            disabled={
              (value.length === 0 && index === null) ||
              (value.length === 0 && index !== null) ||
              (value.length !== 0 && index === null) ||
              (index !== null && (list.length - 1 < index)) ||
              disabled.addIndex ||
              index === null
            }
            isLoader={loader.addIndex}>
          </Button>
          <Button text='Удалить по индексу'
            linkedList='big' 
            type='button'
            onClick={deleteIndex}
            disabled={
              (list.length === 0 && index === null) ||
              (list.length === 0 && index !== null) ||
              (list.length !== 0 && index === null) ||
              (index !== null && (list.length - 1 < index)) ||
              disabled.addIndex ||
              index === null
            }
            isLoader={loader.deleteIndex}>
          </Button>
        </div>
      </form>
      <div  className={styles.result}>
        {list.map((item, index) => {
          return (
            <div className={styles.item} key={index}>
              <div className={`${styles.circle}`}>
                {
                  item.topCircle &&
                  <Circle letter={item.smallCircle?.value} 
                    state={item.smallCircle?.color} 
                    isSmall={true} 
                    extraClass={`${styles.topCircle}`}/> 
                }
                <Circle letter={item.value} 
                  state={item.color} 
                  index={index} 
                  head={(index === 0) && !item.topCircle ? HEAD : ''} 
                  tail={(index === list.length - 1) && !item.bottomCircle ? TAIL : ''}/>
                {
                  item.bottomCircle &&
                  <Circle letter={item.smallCircle?.value} 
                    state={item.smallCircle?.color} 
                    isSmall={true} 
                    extraClass={`${styles.bottomCircle}`}/> 
                }
              </div>
              {list.length - 1 !== index &&
                <ArrowIcon data-testid='arrow' fill={item.arrow ? '#D252E1' : '#0032FF'}/>
              }
            </div>
          )
        })}
      </div>
    </SolutionLayout>
  );
};
