import Rebix from 'react-rebix';


export default Rebix.createActions({
    addTodo: function (newTitle) {
        return newTitle;
    },
    toggleItem: function (todo) {
        return todo;
    },
    destroyItem: function (todo) {
        return todo;
    },
    saveItem: function (todo, newTitle) {
        return {todo, newTitle};
    }
});

