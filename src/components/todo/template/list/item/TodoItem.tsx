import { CheckOutlined, DeleteOutlined } from '@ant-design/icons';
import { Itodo } from 'components/todo/TodoService';
import React from 'react';
import styled, { css } from 'styled-components';

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #119955;
  font-size: 16px;
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;

const CheckCircle = styled.div<{ done: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 16px;
  border: 1px solid #33bb77;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #dddddd;
      color: #dddddd;
    `}
`;

const Text = styled.div<{ done: boolean }>`
  flex: 1;
  font-size: 16px;
  color: #119955;
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
      text-decoration: line-through;
    `}
`;

interface TodoItemProps {
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  todo: Itodo;
}

const TodoItem = ({ toggleTodo, removeTodo, todo }: TodoItemProps) => {
  return (
    <TodoItemBlock>
      <CheckCircle
        done={todo.done}
        onClick={() => {
          toggleTodo(todo.id);
        }}
      >
        {todo.done && <CheckOutlined />}
      </CheckCircle>
      <Text done={todo.done}>
        <div>{todo.text}</div>
        <div>~ &#9201; {todo.targetDate}</div>
      </Text>
      <Remove
        onClick={() => {
          removeTodo(todo.id);
        }}
      >
        <DeleteOutlined />
      </Remove>
    </TodoItemBlock>
  );
};

export default React.memo(TodoItem);
