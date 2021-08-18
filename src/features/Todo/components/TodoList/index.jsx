import PropTypes from 'prop-types';
import React from 'react';
import TodoItem from '../TodoItem';
import './styles.scss';

TodoList.propTypes = {
    todoList: PropTypes.array,
    onTodoClick: PropTypes.func,
};

TodoList.defaultProps = {
    todoList: [],
    onTodoClick: null,
};

function TodoList(props) {
    const { todoList, onTodoClick } = props;
    return (
        <ul className="todos">
            {todoList.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todoItem={todo}
                    onTodoClick={onTodoClick}
                ></TodoItem>
            ))}
        </ul>
    );
}

export default TodoList;
