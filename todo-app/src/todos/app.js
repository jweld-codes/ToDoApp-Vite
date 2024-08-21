

import html from './app.html?raw'
import todoStore from '../store/todo.store';
import { renderTodos } from './use-cases/render-todos';

const elemntIDs = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
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

    const newDescriptionInput = document.querySelector(elemntIDs.NewTodoInput);
    const TodoListUL = document.querySelector(elemntIDs.TodoList);

    newDescriptionInput.addEventListener('keyup', (event) => {
        if( event.keyCode != 13 ) return;
        if( event.target.value.trim().length === 0 ) return;

        todoStore.addTodo( event.target.value );
        displayTodos();
        event.target.value = '';
    });

    TodoListUL.addEventListener('click', ( event ) => {
        const elementToggle = event.target.closest('[data-id]');
        todoStore.toggleTodo( elementToggle.getAttribute('data-id') );
        displayTodos();
    });

    TodoListUL.addEventListener('click', ( event ) => {
        const elementDestroy = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');
        if(!element || !elementDestroy ) return;

        todoStore.deleteTodo( element.getAttribute('data-id') );
        displayTodos(); 



    });



}