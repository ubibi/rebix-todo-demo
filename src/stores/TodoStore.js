import Rebix from 'react-rebix';

var uniqueId = new Date().getTime();


function setTodoListItemAttr(state, callback) {
    state.todoList = [].concat(state.todoList).map(function (m, i) {
        m = Object.assign({}, m);
        return callback(m, i);
    });
    return state;
}

function calculateViewTodoList(state) {
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


function wrapperOn(func){
    return function (state,action){
        console.log('status',action.status);
        state = Object.assign({}, state);
        state = func(state,action);
        state = calculateViewTodoList(state);
        var json = JSON.stringify(state);
        localStorage.setItem("state",json);
        return state;
    }
}



export default Rebix.createStore({

    initialState: (function(){
        var initialState = {
            saving: false,
            todoList: [],
            viewTodoList: [],
            unCompletedCount: 0,
            viewType: 'all'//active completed
        };
        var json = localStorage.getItem("state");
        if(json){
            initialState = JSON.parse(json);
        }
        return initialState;
    })(),


    'onAddTodo': wrapperOn(function (state, {payload,status}) {
        state.todoList.unshift({
            id: uniqueId,
            title: payload,
            completed: false
        });
        uniqueId++;
        state.todoList = [].concat(state.todoList);
        return state;
    }),


    'onToggleItem': wrapperOn(function (state, {payload}) {
        state = setTodoListItemAttr(state, function (m) {
            if (m.id === payload.id) {
                m.completed = !m.completed;
            }
            return m;
        });
        return state;
    }),

    'onToggleAll': wrapperOn(function (state, {payload}) {
        var selectAll = payload;
        state.todoList = [].concat(state.todoList).map(function (m) {
            m = Object.assign({}, m);
            m.completed = selectAll;
            return m;
        });
        return state;
    }),


    'onDestroyItem': wrapperOn(function (state, {payload}) {
        state.todoList = [].concat(state.todoList).filter(function (m) {
            if (m.id === payload.id) {
                return false;
            }
            return true;
        });
        return state;
    }),

    'onSaveItem': wrapperOn(function (state, {payload}) {
        var {todo, newTitle} = payload;
        state = setTodoListItemAttr(state, function (m) {
            if (m.id === todo.id) {
                m.title = newTitle;
            }
            return m;
        });
        return state;
    }),

    'onChangeViewType': wrapperOn(function (state, {payload}) {
        state = Object.assign({}, state);
        state.viewType = payload;
        return state;
    }),

    'onClearCompleted': wrapperOn(function (state) {
        state = Object.assign({}, state);
        state.todoList = [].concat(state.todoList).filter(function (m) {
            if (m.completed) {
                return false;
            }
            return true;
        });
        return state;
    })
});

