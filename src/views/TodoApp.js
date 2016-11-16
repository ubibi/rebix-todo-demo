import React, {PropTypes} from 'react';
import TodoHeader from './TodoHeader';
import TodoSection from './TodoSection';
import TodoFooter from './TodoFooter';

import RebixComponent from '../config/RebixComponent';

class TodoApp extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <TodoHeader />
                <TodoSection />
                <TodoFooter />
            </div>
        );
    }

}


export default RebixComponent(TodoApp, {

    actions: {
    },

    props: {
    }

});