import Rebix from 'react-rebix';

var uniqueId = new Date().getTime();


function setTodoListItemAttr(state, callback) {
    state = Object.assign({}, state);
    state.todoList = [].concat(state.todoList).map(function (m, i) {
        m = Object.assign({}, m);
        return callback(m, i);
    });
    return state;
}

function calculateViewTodoList(state) {
    state = Object.assign({}, state);
    var viewType = state.viewType;
    var unCompletedCount = 0;
    state.viewTodoList = [].concat(state.todoList).filter(function (m) {
        if(!m.completed){
            unCompletedCount++;
        }

        if (viewType === 'all') {
            return true;
        }

        if (viewType === 'active') {
            return !m.completed;
        }

        if (viewType === 'completed') {
            return m.completed;
        }
    });
    state.unCompletedCount = unCompletedCount;
    return state;
}

export default Rebix.createStore({

    initialState: {
        saving: false,
        todoList: [],
        viewTodoList: [],
        unCompletedCount: 0,
        viewType: 'all'//active completed
    },

    'after': [/^on/, function (state, action) {
        return calculateViewTodoList(state);
    }],

    'before': ['*', function (state, action, onHandler) {
        onHandler(state, action);
    }],


    'onAddTodo': function (state, {payload,status}) {
        console.log(status);
        state = Object.assign({}, state);
        state.todoList.push({
            id: uniqueId,
            title: payload,
            completed: false
        });
        uniqueId++;
        state.todoList = [].concat(state.todoList);
        state = calculateViewTodoList(state);
        return state;
    },


    'onToggleItem': function (state, {payload}) {
        state = setTodoListItemAttr(state, function (item) {
            if (item.id === payload.id) {
                item.completed = !item.completed;
            }
            return item;
        });

        state = calculateViewTodoList(state);
        return state;
    },

    'onToggleAll': function (state, {payload}) {
        var selectAll = payload;
        state = Object.assign({}, state);
        state.todoList = [].concat(state.todoList).map(function (m) {
            m = Object.assign({}, m);
            m.completed = selectAll;
            return m;
        });
        state = calculateViewTodoList(state);
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
        state = calculateViewTodoList(state);
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
        state = calculateViewTodoList(state);
        return state;
    },

    'onChangeViewType': function (state, {payload}) {
        state = Object.assign({}, state);
        state.viewType = payload;
        state = calculateViewTodoList(state);
        return state;
    },

    'onClearCompleted': function (state) {
        state = Object.assign({}, state);
        state.todoList = [].concat(state.todoList).filter(function (item) {
            if (item.completed) {
                return false;
            }
            return true;
        });
        state = calculateViewTodoList(state);
        return state;
    }
});

