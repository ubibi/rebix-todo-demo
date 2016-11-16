import React, {PropTypes} from 'react';
import RebixComponent from '../config/RebixComponent';

class TodoFooter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newTodo: ''
        };
    }

    onChangeInput = (e)=> {
        this.setState({newTodo: e.target.value});
    };

    addTodo = ()=> {
        var {actions} = this.props;
        actions.addTodo(this.state.newTodo);
        this.setState({newTodo: ''});
    };

    render() {

        var {saving} = this.props;
        var {newTodo} = this.state;

        return (
            <footer className="footer" >
                <span className="todo-count"  >
                    <strong >1</strong>
                    <span> </span>
                    <span>item</span>
                    <span> left</span>
                </span>
                <ul className="filters">
                    <li>
                        <a href="#/" className="">All</a>
                    </li>
                    <span> </span>
                    <li>
                        <a href="#/active" className="selected">Active</a>
                    </li>
                    <span> </span>
                    <li>
                        <a href="#/completed" className="">Completed</a>
                    </li>
                </ul>
                <button className="clear-completed">Clear completed</button>
            </footer>
        )

    }

}


export default RebixComponent(TodoFooter, {

    actions: {
        addTodo: 'todo.addTodo'
    },

    props: {
        userList: 'user.userList',
        postList: 'user.postList'
    }

});