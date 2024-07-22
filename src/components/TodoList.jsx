import { useEffect } from "react";
import { useTodosContext } from "../context/todosContext";
import { TodoItem } from "./TodoItem/TodoItem";
import { OrderBtn } from "./OrderBtn/OrderBtn";

export const TodoList = () => {
  const {todoList, changeTodoList} = useTodosContext();

  useEffect(() => {
    if (localStorage.getItem('todoList') === null) {
      fetch('http://localhost:3001/todos')
      .then(res => res.json())
      .then((res) => {
        changeTodoList(res);
      })
    }
  }, [changeTodoList]);

  return (<table>
    <thead>
      <tr>
        <th>
          Заголовок
          <OrderBtn fieldName="title"/>
        </th>
        <th>
          Описание
          <OrderBtn fieldName="description"/>
        </th>
        <th>
          Дата окончания
          <OrderBtn fieldName="date"/>
        </th>
        <th>
          Выполнена
          <OrderBtn fieldName="completed"/>
        </th>
        <th>Редактировать</th>
        <th>Удалить</th>
      </tr>
    </thead>
    <tbody>
      {todoList && todoList.map((e) => <TodoItem key={e.id} {...e} />)}
    </tbody>
  </table>)
}