

import html from './app.html?raw'
import todoStore from '../store/todo.store';
import { renderTodos } from './use-cases/render-todos';

const elemntIDs = {
    TodoList: '.todo-list',
}

/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodo( todoStore.getCurrentFilter());
        renderTodos( elemntIDs.TodoList, todos);
    }



    //cuando la funcion App se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

}