

import html from './app.html?raw'
import todoStore, {Filters} from '../store/todo.store';
import { renderTodos } from './use-cases/render-todos';
import { renderPending } from './use-cases/render-pending'

const elemntIDs = {
    ClearCompleted: '.clear-completed',
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    TodoFilters: '.filtro',
    PendingCount: '#pending-count',
}

/**
 * 
 * @param {String} elementId 
 */
export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodo( todoStore.getCurrentFilter());
        renderTodos( elemntIDs.TodoList, todos);
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPending(elemntIDs.PendingCount);
    }


    //cuando la funcion App se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    //Referencias
    const newDescriptionInput = document.querySelector(elemntIDs.NewTodoInput);
    const TodoListUL = document.querySelector(elemntIDs.TodoList);
    const actClearCompleted = document.querySelector(elemntIDs.ClearCompleted);
    const FiltersLIs = document.querySelectorAll( elemntIDs.TodoFilters);

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

    actClearCompleted.addEventListener('click', ()=>{
        todoStore.deleteAllTodo();
        displayTodos();
    });

    FiltersLIs.forEach( element => {
        element.addEventListener('click', (element)=>{
            FiltersLIs.forEach(el => el.classList.remove('selected') );
            element.target.classList.add('selected');

            switch( element.target.text ){
                case 'Todos':
                    todoStore.setFilter( Filters.All )
                break;
                case 'Pendientes':
                    todoStore.setFilter( Filters.Pending )
                break;
                case 'Completados':
                    todoStore.setFilter( Filters.Completed )
                break;
            }

            displayTodos();

        });
    });



}