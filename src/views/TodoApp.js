import React from 'react';
import TodoHeader from './TodoHeader';
import TodoSection from './TodoSection';
import TodoFooter from './TodoFooter';

export default class TodoApp extends React.Component{
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