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
    loadStore();
    console.log('InitStore');
}

const loadStore = () => {
    if(!localStorage.getItem('state')) return; 

    const{ todos = [], filter = Filters.All } = JSON.parse(localStorage.getItem('state') );
    state.todos = todos;
    state.filter = filter; 
}

const saveStateToLocalStorage = () => {
    localStorage.setItem('state',  JSON.stringify(state));
}

const getTodo = (filter = Filters.All) => {
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

    saveStateToLocalStorage();
}

const toggleTodo = (todoId) => {
    state.todos = state.todos.map( todo => {
        if( todo.id === todoId ) {
            todo.done = !todo.done;
        }
        return todo;
    });
    saveStateToLocalStorage();
}

const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
    saveStateToLocalStorage();
}

const deleteAllTodo = () => {
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateToLocalStorage();
}

/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = (newFilter = Filters.All) => {
    state.filter = newfilter;
    saveStateToLocalStorage();
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
