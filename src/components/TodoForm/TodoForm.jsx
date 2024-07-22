import { useTodosContext } from "../../context/todosContext";
import { useRef, useState, useReducer} from "react";
import ReactInputMask from "react-input-mask";
import styles from "./todoForm.module.css"

export const TodoForm = () => {
  const {todoList, changeTodoList} = useTodosContext();
  const titleRef = useRef('');
  const descriptionRef = useRef('');
  const [validation, setValidation] = useState(false);

  const initialState = {
    title: '',
    description: '',
    date: '',
    completed: false
  };

  const reduser = (state, {type, payload}) => {
    switch (type) {
      case 'title':
        return {...state, title: payload};
      case 'description':
        return {...state, description: payload};
      case 'date':
        return {...state, date: payload};
      case 'completed':
        return {...state, completed: payload};

      default:
        return state;
    }
  }

  const [form, dispatch] = useReducer(reduser, initialState);

  const handlerValidation = () => {
    if (titleRef.current.value === '') {
      setValidation(false);
      titleRef.current.classList.add(styles.required);
    } else if (descriptionRef.current.value === '') {
      setValidation(false);
      descriptionRef.current.classList.add(styles.required);
    } else {
      setValidation(true);
      descriptionRef.current.classList.remove(styles.required);
      titleRef.current.classList.remove(styles.required);
    }
  }

  return (
    <div className={styles.form}>
      <h2>Создать новую задачу</h2>
      <input
        className={styles.input}
        type="text"
        value={form.title}
        placeholder="Заголовок"
        ref={titleRef}
        onChange={(event) => {handlerValidation(); dispatch({type: 'title', payload: event.target.value})}}
      />
      <label className={styles.label}>
        Выполнена
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={form.completed}
          onChange={(event) => {dispatch({type: 'completed', payload: event.target.value})}}
        />
        </label>
      <textarea
        className={styles.input}
        placeholder="Описание"
        ref={descriptionRef}
        onChange={(event) => {handlerValidation(); dispatch({type: 'description', payload: event.target.value})}}
        value={form.description}
      />
      <ReactInputMask
        className={styles.input}
        type="text"
        mask="9999-99-99 99:99:99"
        maskChar="_"
        value={form.date}
        onChange={(event) => {handlerValidation(); dispatch({type: 'date', payload: event.target.value})}}
        placeholder="Дата"
      />
      <button
        disabled={!validation}
        onClick={
        () => {
          {titleRef.current.value &&
            changeTodoList([...todoList,
              {
                "id": `${todoList.length + 1}`,
                "title": form.title,
                "description": form.description,
                "completed": form.completed,
              }
            ]);
            titleRef.current.value = '';
            descriptionRef.current.value = '';
          }
        }
      }>add</button>
    </div>
  )
}