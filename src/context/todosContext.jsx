import React, { useCallback, useMemo } from "react";
import { useState, useContext } from "react";

const TodosContext = React.createContext();

export const useTodosContext = () => {
  return useContext(TodosContext);
}

export const TodosContextProvider = ({ children }) => {
  const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem('todoList')) || []);
  const [order, setOrder] = useState({
    field: '',
    type: '',
  });

  const changeTodoList = useCallback((list) => {
    setTodoList(list);
    localStorage.setItem('todoList', JSON.stringify(list));
  }, []);

  const contextValue = useMemo(() => ({
    todoList,
    changeTodoList,
    order,
    setOrder
  }), [todoList, order, changeTodoList]);

  return <TodosContext.Provider value={contextValue}>
    {children}
  </TodosContext.Provider>
}