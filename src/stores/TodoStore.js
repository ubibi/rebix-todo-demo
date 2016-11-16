import Rebix from 'react-rebix';

var uniqueId = new Date().getTime();


function setTodoListItemAttr(state, callback) {
    state = Object.assign({}, state);
    state.todoList = [].concat(state.todoList).map(function(m,i){
        m = Object.assign({},m);
        return callback(m,i);
    });
    return state;
}

export default Rebix.createStore({

    initialState: {
        saving: false,
        todoList: []
    },

    'onAddTodo': function (state, action) {
        console.log(action.status);
        state = Object.assign({}, state);
        var title = action.payload;
        state.todoList.push({
            id: uniqueId,
            title: title,
            completed: false
        });
        uniqueId++;
        state.todoList = [].concat(state.todoList);
        return state;
    },


    'onToggleItem': function (state, {payload}) {
        state = setTodoListItemAttr(state, function (item) {
            if (item.id === payload.id) {
                item.completed = !item.completed;
            }
            return item;
        });
        return state;
    },


    'onDestroyItem': function (state, {payload}) {
        state = Object.assign({}, state);
        state.todoList = [].concat(state.todoList).filter(function (item) {
            if (item.id === payload.id) {
                return false;
            }
            return true;
        });
        return state;
    },

    'onSaveItem': function (state, {payload}) {
        var {todo, newTitle} = payload;
        state = setTodoListItemAttr(state, function (item) {
            if (item.id === todo.id) {
                item.title = newTitle;
            }
            return item;
        });
        return state;
    }

});

