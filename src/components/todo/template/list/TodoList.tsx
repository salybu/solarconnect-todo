import Nodata from 'components/common/Nodata';
import { Itodo } from 'components/todo/TodoService';
import React from 'react';
import styled from 'styled-components';
import TodoItem from './item/TodoItem';

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

interface TodoListProps {
  todos: Itodo[];
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}

const TodoList = ({ toggleTodo, removeTodo, todos }: TodoListProps) => {
  if (todos?.length === 0) {
    return (
      <TodoListBlock>
        <Nodata />
      </TodoListBlock>
    );
  }

  return (
    <TodoListBlock>
      {todos &&
        todos
          .sort((a, b) => {
            const dateA = new Date(a.targetDate).getTime();
            const dateB = new Date(b.targetDate).getTime();
            return dateA - dateB;
          })
          .filter((x) => x.done === false)
          .concat(todos.filter((x) => x.done === true))
          .map((todo) => <TodoItem toggleTodo={toggleTodo} removeTodo={removeTodo} key={todo.id} todo={todo} />)}
    </TodoListBlock>
  );
};

export default React.memo(TodoList);
