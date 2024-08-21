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

export default {
    initStore,
}

