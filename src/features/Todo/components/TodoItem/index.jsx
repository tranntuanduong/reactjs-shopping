// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import './styles.scss'
// import classNames from 'classnames';

// TodoItem.propTypes = {
//     todoItem: PropTypes.object,
//     onTodoClick: PropTypes.func,
// };

// TodoItem.defaultProps = {
//     todoItem: null,
//     onTodoClick: null
// }

// function TodoItem({ todoItem, onTodoClick, index }) {
//     const { thumbnailUrl, name, status } = todoItem;

//     const handleTodoClick = () => {
//         if (!onTodoClick) return;
//         onTodoClick(index);
//     }

//     return (

//         <div
//             className={classNames({
//                 'card-item': true,
//                 viewed: status === 'viewed'
//             })}
//             onClick={() => handleTodoClick(index)}
//         >
//             {status}
//             <div div className="card-item__image" >
//                 <img src={thumbnailUrl} alt="" />
//             </div >
//             <div className="card-item__title">
//                 <h3>{name}</h3>
//             </div>
//         </div >
//     );
// }

// export default TodoItem;
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss'
import classNames from 'classnames';

TodoItem.propTypes = {
    todoItem: PropTypes.object,
    onTodoClick: PropTypes.func,
};

TodoItem.defaultProps = {
    todoItem: null,
    onTodoClick: null
}

function TodoItem({ todoItem, onTodoClick, index }) {
    const { thumbnailUrl, name, status } = todoItem;

    const handleTodoClick = () => {
        if (!onTodoClick) return;
        onTodoClick(index);
    }

    return (

        <div
            className={classNames({
                'card-item': true,
                viewed: status === 'viewed'
            })}
            onClick={() => handleTodoClick(index)}
        >
            {status}
            <div div className="card-item__image" >
                <img src={thumbnailUrl} alt="" />
            </div >
            <div className="card-item__title">
                <h3>{name}</h3>
            </div>
        </div >
    );
}

export default TodoItem;