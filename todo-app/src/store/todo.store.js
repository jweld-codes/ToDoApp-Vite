import { Todo } from "../todos/models/todo.models";

const Filters = {
    All: 'All',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todos: [
        new Todo('Piedra del Alma'),
        new Todo('Pieda del Infinito'),
        new Todo('Pieda del Tiempo'),
    ],

    filter: Filters.All,
}

const initStore = () => {
    console.log(state);
    console.log('InitStore');
}

const loadStore = () => {
    throw new Error('No implementado');
}

const getTodo = (filer = Filters.All) => {
    switch(filter){
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter( todo => todo.done );
        case Filters.Pending:
            return state.todos.filter( todo => !todo.done );
        default:
            throw new Error(`Option ${ fliter } is not valid.`);

    }
}

/**
 * 
 * @param {String} description 
 */
const addTodo =(description) => {
    if (!description) throw new Error('La descripcion es obligatoria');

    state.todos.push(new Todo(description));
}

const toggleTodo = (todoId) => {
    state.todos = state.todos.map( todo => {
        if( todo.id === todoId ) {
            todo.done = !todo.done;
        }
        return todo;
    });
}

const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
}

const deleteAllTodo = () => {
    state.todos = state.todos.filter(todo => todo.done);
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = (newFilter = Filters.All) => {
    state.filter = newfilter;
}

const getCurrentFilter = () => {
    return state.filter;
}

export default {
    initStore,
    getTodo,
    addTodo,
    toggleTodo,
    deleteTodo,
    deleteAllTodo,
    setFilter,
    getCurrentFilter,
}

