import React, {PropTypes} from 'react';
import RebixComponent from '../config/RebixComponent';
import TodoItem from './TodoItem';

class TodoSection extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {

    }

    render() {

        var {todoList} = this.props;
        todoList = todoList ||[];

        return (
            <div>
                <ul className="todo-list">
                    {
                        todoList.map(function(todo){
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
        todoList:'todo.todoList'
    }
});