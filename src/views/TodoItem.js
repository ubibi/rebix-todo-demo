import React, {PropTypes} from 'react';
import classNames from 'classname';
import RebixComponent from '../config/RebixComponent';

var ESCAPE_KEY = 27;
var ENTER_KEY = 13;


class TodoItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editText: '',
            editing: false
        };
    }

    onToggle = ()=> {
        this.props.actions.toggleItem(this.props.todo);
    };

    onDestroy = ()=> {
        this.props.actions.destroyItem(this.props.todo);
    };

    handleEdit = ()=> {
        this.setState({editText: this.props.todo.title, editing: true});
        var editField = this.refs['editField'];
        setTimeout(function () {
            editField.focus();
        }, 10)
    };


    handleSubmit = (event)=> {
        var val = this.state.editText.trim();
        if (val) {
            this.props.actions.saveItem(this.props.todo, val);
            this.setState({editText: val, editing: false});
        } else {
            this.onDestroy();
        }
    };

    handleChange = (event)=> {
        if (this.state.editing) {
            this.setState({editText: event.target.value});
        }
    };


    handleKeyDown = ()=> {
        if (event.which === ESCAPE_KEY) {
            this.setState({editText: this.props.todo.title, editing: false});
        } else if (event.which === ENTER_KEY) {
            this.handleSubmit(event);
        }
    };

    render() {
        var {todo} = this.props;
        var {editing} = this.state;

        return (
            <li className={classNames({
					completed:todo.completed,
					editing: editing
				})}>
                <div className="view">
                    <input className="toggle" type="checkbox" checked={todo.completed} onChange={this.onToggle}/>
                    <label onDoubleClick={this.handleEdit}>{todo.title}</label>
                    <button className="destroy" onClick={this.onDestroy}></button>
                </div>
                <input
                    ref="editField"
                    className="edit"
                    value={this.state.editText}
                    onBlur={this.handleSubmit}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                />
            </li>
        );
    }
}


export default RebixComponent(TodoItem, {
    actions: {
        toggleItem: 'todo.toggleItem',
        destroyItem: 'todo.destroyItem',
        saveItem: 'todo.saveItem'
    }
});