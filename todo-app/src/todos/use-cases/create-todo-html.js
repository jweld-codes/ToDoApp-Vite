import { Todo } from "../models/todo.models";



/**
 * 
 * @param {Todo} todo 
 */
export const createTodoHTML = ( todo ) => {
    if( !todo ) throw new error('Todo es obligatorio');

    const html = `<h1> ${ todo.description}</h1>`;

    const liElement = document.createElement('li');
    liElement.innerHTML = html;

    return liElement; 
}