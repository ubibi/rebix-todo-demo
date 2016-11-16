import React, {PropTypes} from 'react';
import RebixComponent from '../config/RebixComponent';

class TodoHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newTodo: ''
        };
    }

    onChangeInput = (e)=> {
        this.setState({newTodo: e.target.value});
    };

    addTodo = (e)=> {
        if(e.keyCode===13){
            var {actions} = this.props;
            actions.addTodo(this.state.newTodo);
            this.setState({newTodo: ''});
        }
    };

    render() {

        var {saving} = this.props;
        var {newTodo} = this.state;

        return (
            <header id="header" className="header">
                <h1>todos</h1>
                <div id="todo-form">
                    <input id="new-todo" className="new-todo"
                           value={newTodo}
                           placeholder="What needs to be done?"
                           onChange={this.onChangeInput}
                           onKeyUp={this.addTodo}
                           disabled={saving}
                           autoFocus={true} />
                </div>
            </header>
        )

    }

}


export default RebixComponent(TodoHeader, {

    actions: {
        addTodo: 'todo.addTodo'
    },

    props: {
        saving:'todo.saving'
    }

});