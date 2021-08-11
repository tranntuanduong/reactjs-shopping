import React, { useState } from 'react';
import TodoList from './components/TodoList';

TodoFeature.propTypes = {

};

function TodoFeature(props) {
	const initTodoList = [
		{
			id: 1,
			name: 'Thương thầm',
			thumbnailUrl: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/d/6/9/6/d696b1b5d06a45f5f37245f3e475e701.jpg',
			status: 'new'
		},
		{
			id: 2,
			name: 'Tỏ tình nhẹ nhàng thôi',
			thumbnailUrl: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/7/e/d/7/7ed7459e4428ccc939a460a2a5dada4c.jpg',
			status: 'new'
		},
		{
			id: 3,
			name: 'Chiều nay không có mưa bay',
			thumbnailUrl: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/b/d/e/9/bde97c9f540bcc59a2772654b0cbf4f1.jpg',
			status: 'viewed'
		},
	]

	const [todoList, setTodoList] = useState(initTodoList);
	const [filterStatus, setFilterStatus] = useState('all');


	function handleTodoClick(index) {
		// clone current array to the new one
		const newTodoList = [...todoList];
		// toggle state
		newTodoList[index] = {
			...newTodoList[index],
			status: newTodoList[index].status === 'new' ? 'viewed' : 'new'
		}
		// update todolist
		setTodoList(newTodoList);
	}

	function handleShowAllClick() {
		setFilterStatus('all');
	}

	function handleShowViewedClick() {
		setFilterStatus('viewed');
	}

	function handleShowNewClick() {
		setFilterStatus('new');
	}

	const renderedTodoList = todoList.filter(todo => filterStatus === 'all' || filterStatus === todo.status);


	return (
		<div>
			<h3>Todo List</h3>
			<button onClick={handleShowAllClick}>Show All</button>
			<button onClick={handleShowViewedClick}>Show viewed</button>
			<button onClick={handleShowNewClick}>Show New</button>
			<TodoList todoList={renderedTodoList} onTodoClick={handleTodoClick}></TodoList>
		</div>
	);
}

export default TodoFeature;