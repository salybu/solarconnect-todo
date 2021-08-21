/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useState, useEffect } from 'react';
import storage from 'utils/storage';

export type Itodo = {
  id: number;
  text: string;
  done: boolean;
  targetDate: string;
};

let initialTodos: Itodo[] = [];

export const useTodo = () => {
  const [todoState, setTodoState] = useState(initialTodos);
  const [nextIdState, setNextIdState] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [todoState]);

  const incrementNextId = () => {
    setNextIdState((prevState) => prevState + 1);
  };

  const toggleTodo = (id: number) => {
    //@TODO
    setTodoState((prevState) => {
      return prevState.map((todo: Itodo) => {
        if (todo.id === id) {
          return { ...todo, done: !todo.done };
        } else {
          return todo;
        }
      });
    });
  };

  const removeTodo = (id: number) => {
    console.log(todoState);
    setTodoState((prevState) => prevState.filter((todo: Itodo) => todo.id !== id));
  };

  const createTodo = (todo: Itodo) => {
    const nextId = nextIdState + 1;
    setTodoState((prevState) =>
      prevState.concat({
        ...todo,
        id: nextId,
      }),
    );
    console.log(todoState);
  };

  const loadData = () => {
    initialTodos = storage.get('todos');
    const nextId = storage.get('nextId');
    setTodoState(initialTodos);
    setNextIdState(nextId);
  };

  const saveData = () => {
    storage.set('todos', todoState);
    storage.set('nextId', nextIdState);
  };

  return {
    todoState,
    nextIdState,
    incrementNextId,
    toggleTodo,
    removeTodo,
    createTodo,
  };
};
