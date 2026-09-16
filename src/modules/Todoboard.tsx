import { useState } from 'react';
import Todolist from './Todolist.tsx'
import type { TodoListData } from './types.ts';
import './Todo.css'

export default function Todoboard(){
	const [lists, setLists] = useState<TodoListData[]>([]);

	// Todo list functions

	const addList = () => {
		setLists(prev => [
			...prev,
			{
				id: crypto.randomUUID(),
				name: '',
				items: []
			}
		]);
	};

	const updateListName = (id: string, newName: string) => {
		setLists(prev =>
			prev.map(list =>
				list.id === id
					? { ...list, name: newName }
					: list
			)
		);
	};

	const deleteList = (id: string) => {
		setLists(prev => prev.filter(list => list.id !== id));
	};

	// Todo item functions

	const addItem = (listId: string) => {
		setLists(prev =>
			prev.map(list =>
				list.id === listId
					? {
						...list,
						items: [
							...list.items,
							{
								id: crypto.randomUUID(),
								value: '',
								completed: false
							}
						]
					}
					: list
			)
		);
	};

	const updateItem = (
		listId: string,
		itemId: string,
		newValue: string
	) => {
		setLists(prev =>
			prev.map(list =>
				list.id === listId
					? {
						...list,
						items: list.items.map(item =>
							item.id === itemId
								? { ...item, value: newValue }
								: item
						)
					}
					: list
			)
		);
	};

	const toggleItem = (listId: string, itemId: string) => {
		setLists(prev =>
			prev.map(list =>
				list.id === listId
					? {
						...list,
						items: list.items.map(item =>
							item.id === itemId
								? { ...item, completed: !item.completed }
								: item
						)
					}
					: list
			)
		);
	};

	const deleteItem = (listId: string, itemId: string) => {
		setLists(prev =>
			prev.map(list =>
				list.id === listId
					? {
						...list,
						items: list.items.filter(item => item.id !== itemId)
					}
					: list
			)
		);
	};

	return (
		<div className="todo-board">
			<div className="todo-lists-container">
				{lists.map(list => (
					<Todolist 
						key={list.id}
						id={list.id}
						name={list.name}
						items={list.items}
						onUpdateName={updateListName}
						onAddItem={addItem}
						onUpdateItem={updateItem}
						onToggleItem={toggleItem}
						onDeleteItem={deleteItem}
						onDeleteList={deleteList}
					/>
				))}
				
			</div>
			
			<button className="todo-list-add-button" onClick={addList}>
				+
			</button>
		</div>
	)
}