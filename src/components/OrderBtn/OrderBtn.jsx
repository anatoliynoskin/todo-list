import styles from './orderBtn.module.css'
import orderImg from '../../assets/Polygon.svg'
import { useState } from 'react'
import classNames from 'classnames'
import { useTodosContext } from '../../context/todosContext'

export const OrderBtn = ({fieldName}) => {
  const {order, setOrder, todoList, changeTodoList} = useTodosContext();
  const [diraction, setDiraction] = useState(true);

  const handlerOrder = () => {
    setDiraction(!diraction);

    if (order.field != fieldName ) {
      setOrder({
        field: fieldName,
        type: "asc"
      })
    } else {
      if (order.type == "" || order.type === "desc") {
        setOrder({
          field: fieldName,
          type: "asc"
        });
      } else {
        setOrder({
          field: fieldName,
          type: "desc"
        });
      }
    }

    const todosSorted = [...todoList];
    if (order.type === "asc") {
      changeTodoList(todosSorted.sort((a, b) => {
        let left = a[fieldName];
        let right = b[fieldName];

        if (fieldName === 'date') {
          left =  Date.parse(left?.replace(' ', 'T'));
          right = Date.parse(right?.replace(' ', 'T'));
        }

        return left > right ? 1 : -1
      }));
    } else {
      changeTodoList(todosSorted.sort((a, b) => {
        let left = a[fieldName];
        let right = b[fieldName];

        if (fieldName === 'date') {
          left = Date.parse(left?.replace(' ', 'T'));
          right = Date.parse(right?.replace(' ', 'T'));
        }
        return left < right ? 1 : -1
      }));
    }
  }

  return(
    <img
      src={orderImg}
      alt="order"
      className={classNames([
        styles.order_btn,
        diraction ? styles.down : styles.up
      ])}
      onClick={handlerOrder}
    />
  )
}