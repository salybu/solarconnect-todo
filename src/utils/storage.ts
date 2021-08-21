/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Itodo } from 'components/todo/TodoService';

const storage = {
  set: (key: string, object: Itodo[] | number) => {
    if (!localStorage) return null;

    localStorage[key] = JSON.stringify(object);
  },

  get: (key: string) => {
    if (!localStorage) return null;
    if (!localStorage[key]) return null;

    try {
      return JSON.parse(localStorage[key]);
    } catch (e) {
      return localStorage[key];
    }
  },
};

export default storage;
