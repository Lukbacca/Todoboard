import { useState, useEffect } from 'react';
import Todolist from './Todolist.tsx'
import type { TodoListData } from './types.ts';
import './Todo.css'

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

import type { User } from 'firebase/auth';

export default function Todoboard({ user }: { user: User }){
	const [lists, setLists] = useState<TodoListData[]>([]);
	const [loaded, setLoaded] = useState(false);

	// Load user's TodoBoard from Firestore

	useEffect(() => {
		const loadLists = async () => {
			try {
				const userDoc = await getDoc(
					doc(db, 'Users', user.uid)
				);

				if (userDoc.exists()) {
					const data = userDoc.data();

					setLists(data.lists ?? []);
				}
			} catch (error) {
				console.error('Failed to load TodoBoard:', error);
			}

			setLoaded(true);
		};

		loadLists();
	}, []);

	// Automatically save lists to Firestore

	useEffect(() => {
		if (!loaded) {
			return;
		}

		const saveLists = async () => {
			try {
				await setDoc(
					doc(db, 'Users', user.uid),
					{
						lists: lists
					},
					{ merge: true }
				);
			} catch (error) {
				console.error('Failed to save TodoBoard:', error);
			}
		};

		const timeout = setTimeout(() => {
			saveLists();
		}, 500);

		return () => {
			clearTimeout(timeout);
		};
	}, [lists, loaded]);

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