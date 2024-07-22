import { useState, useReducer, useRef } from "react";
import { useTodosContext } from "../../context/todosContext"
import ReactInputMask from "react-input-mask";
import styles from "./todoItem.module.css"

export const TodoItem = ({id, title, description, date, completed}) => {
  const {todoList, changeTodoList} = useTodosContext();
  const [editMode, setEditMode] = useState(false);
  const [validation, setValidation] = useState(() => title && description);
  const titleRef = useRef();
  const descriptionRef = useRef();

  const initialState = {
    title,
    description,
    date,
    completed
  };

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

  const removeTodoItem = () => {
    changeTodoList(todoList.filter((e) => e.id !== id))
  }

  const editTodoItem = () => {
    setEditMode(true);
  }

  const saveTodoItem = () => {
    setEditMode(false);
    changeTodoList(todoList.map(e => {
      if (e.id === id) {
        return {
          ...e,
          title: form.title,
          description: form.description,
          date: form.date,
        }
      } else return e
    }));
  }
  const handlerChangeCompleted = () => {
    changeTodoList(todoList.map(e => e.id === id ? {...e, completed: !completed} : e));
  }

  return(<tr>
    <td>
      {editMode ?
      <input
        type="text"
        value={form.title}
        ref={titleRef}
        onChange={(event) => {handlerValidation(); dispatch({type: 'title', payload: event.target.value})}}
      /> :
      title}
    </td>
    <td>
      {editMode ?
      <textarea
        ref={descriptionRef}
        onChange={(event) => {handlerValidation(); dispatch({type: 'description', payload: event.target.value})}}
        value={form.description}
      /> :
      description}
    </td>
    <td>
      {editMode ?
      <ReactInputMask
        type="text"
        mask="9999-99-99 99:99:99"
        maskChar="_"
        value={form.date}
        onChange={(event) => dispatch({type: 'date', payload: event.target.value})}
      />:
      date}
    </td>
    <td>
      <input
        type="checkbox"
        checked={completed}
        onChange={handlerChangeCompleted}
      />
    </td>
    <td>
      {editMode ?
      <button onClick={saveTodoItem} disabled={!validation}>save</button> :
      <button onClick={editTodoItem}>edit</button>}
    </td>
    <td>
      <button onClick={removeTodoItem}>delete</button>
    </td>
  </tr>)
}