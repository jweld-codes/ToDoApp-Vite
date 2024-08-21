
import { Todo } from '../models/todo.models';
import { createTodoHTML } from './create-todo-html';


let element;

/**
 * 
 * @param {String} elemntId 
 * @param {Todo} todos 
 */

export const renderTodos = ( elemntId, todos = [] ) => {

    if(!element)
        element = document.querySelector( elemntId );

        if(!element) throw new error(`Element ${ elemntId} not found`);

        element.innerHTML = '';

        todos.forEach(todo => {
            element.append( createTodoHTML(todo))
        });


}




