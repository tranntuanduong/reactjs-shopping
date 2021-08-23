import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import TodoList from '../../components/TodoList';
import queryString from 'query-string';
import TodoForm from '../../components/TodoForm';

ListPage.propTypes = {};

function ListPage() {
    const initTodoList = [
        {
            id: 1,
            name: 'Thương thầm',
            thumbnailUrl:
                'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/d/6/9/6/d696b1b5d06a45f5f37245f3e475e701.jpg',
            status: 'new',
        },
        {
            id: 2,
            name: 'Tỏ tình nhẹ nhàng thôi',
            thumbnailUrl:
                'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/7/e/d/7/7ed7459e4428ccc939a460a2a5dada4c.jpg',
            status: 'new',
        },
        {
            id: 3,
            name: 'Chiều nay không có mưa bay',
            thumbnailUrl:
                'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/b/d/e/9/bde97c9f540bcc59a2772654b0cbf4f1.jpg',
            status: 'viewed',
        },
    ];

    const [todoList, setTodoList] = useState(initTodoList);
    const location = useLocation();
    const history = useHistory();
    const match = useRouteMatch();
    const [filterStatus, setFilterStatus] = useState(() => {
        const params = queryString.parse(location.search);

        return params.status || 'all';
    });

    useEffect(() => {
        const params = queryString.parse(location.search);
        setFilterStatus(params.status || 'all');
    }, [location.search]);

    function handleTodoClick(id) {
        // clone current array to the new one
        const newTodoList = [...todoList];
        const index = newTodoList.findIndex((todo) => todo.id === id);
        // toggle state
        newTodoList[index] = {
            ...newTodoList[index],
            status: newTodoList[index].status === 'new' ? 'viewed' : 'new',
        };
        // update todolist
        setTodoList(newTodoList);
    }

    function handleShowAllClick() {
        const queryParams = { status: 'all' };
        history.push({
            pathname: match.path,
            search: queryString.stringify(queryParams),
        });
    }

    function handleShowViewedClick() {
        const queryParams = { status: 'viewed' };
        history.push({
            pathname: match.path,
            search: queryString.stringify(queryParams),
        });
    }

    function handleShowNewClick() {
        const queryParams = { status: 'new' };
        history.push({
            pathname: match.path,
            search: queryString.stringify(queryParams),
        });
    }

    const renderedTodoList = todoList.filter(
        (todo) => filterStatus === 'all' || filterStatus === todo.status
    );

    function handleTodoFormSubmit(values) {
        // console.log('Form submit:', values);
        const newTodo = {
            id: todoList.length + 1,
            name: values.name,
            thumbnailUrl: values.thumbnailUrl,
            status: 'new',
        };
        // console.log(newTodo);
        setTodoList([...todoList, newTodo]);
    }

    return (
        <div>
            <h3>Todo List</h3>
            <TodoForm onSubmit={handleTodoFormSubmit}></TodoForm>
            <button onClick={handleShowAllClick}>Show All</button>
            <button onClick={handleShowViewedClick}>Show viewed</button>
            <button onClick={handleShowNewClick}>Show New</button>
            <TodoList
                todoList={renderedTodoList}
                onTodoClick={handleTodoClick}
            ></TodoList>
        </div>
    );
}

export default ListPage;
