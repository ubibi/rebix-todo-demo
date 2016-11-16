import React, {PropTypes} from 'react';
import RebixComponent from '../config/RebixComponent';
import TodoItem from './TodoItem';

class TodoSection extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    isAllCompleted=()=>{
        var {viewTodoList} = this.props;
        var todoList = viewTodoList ||[];
        if(!todoList || todoList.length===0){
            return false;
        }

        for(var i = 0;i<todoList.length;i++){
            var todo = todoList[i];
            if(!todo.completed){
                return false;
            }
        }
        return true;
    };

    toggleAll=()=>{
        var isAllChecked = this.isAllCompleted();
        this.props.actions.toggleAll(!isAllChecked);
    };

    render() {

        var {viewTodoList} = this.props;
        viewTodoList = viewTodoList || [];
        var isAllChecked = this.isAllCompleted();
        return (
            <div className="main">
                <input className="toggle-all" type="checkbox" checked={isAllChecked} onChange={this.toggleAll}/>
                <ul className="todo-list">
                    {
                        viewTodoList.map(function(todo){
                            return <TodoItem key={todo.id} todo={todo}></TodoItem>
                        })
                    }
                </ul>
            </div>
        );

    }

}

export default RebixComponent(TodoSection, {
    props: {
        viewTodoList:'todo.viewTodoList'
    },
    actions:{
        toggleAll:'todo.toggleAll'
    }
});