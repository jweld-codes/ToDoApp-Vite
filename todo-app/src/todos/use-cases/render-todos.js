
import { Todo } from '../models/todo.models';
import { createTodoHTML } from './create-todo-html';


/**
 * 
 * @param {String} elemntId 
 * @param {Todo} todos 
 */

export const renderTodos = ( elemntId, todos = [] ) => {

    const element = document.querySelector( elemntId );

    todos.forEach(todo => {
        element.append( createTodoHTML(todo))
    });


}




