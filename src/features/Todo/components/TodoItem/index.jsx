import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './styles.scss';

TodoItem.propTypes = {
    todoItem: PropTypes.object,
    onTodoClick: PropTypes.func,
};

TodoItem.defaultProps = {
    todoItem: null,
    onTodoClick: null,
};

function TodoItem({ todoItem, onTodoClick }) {
    const { thumbnailUrl, name, status } = todoItem;

    const handleTodoClick = (id) => {
        if (!onTodoClick) return;
        onTodoClick(id);
    };

    return (
        <div
            className={classNames({
                'card-item': true,
                viewed: status === 'viewed',
            })}
            onClick={() => handleTodoClick(todoItem.id)}
        >
            {status}
            <div className="card-item__image">
                <img src={thumbnailUrl} alt="" />
            </div>
            <div className="card-item__title">
                <h3>{name}</h3>
            </div>
        </div>
    );
}

export default TodoItem;
