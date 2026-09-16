import TodoItem from './Todoitem.tsx';
import type { TodoItemData } from './types.ts';
import './Todo.css';

interface TodoListProps {
	id: string;
	name: string;
	items: TodoItemData[];
	onUpdateName: (id: string, newName: string) => void;
	onAddItem: (listId: string) => void;
	onUpdateItem: (listId: string, itemId: string, newValue: string) => void;
	onToggleItem: (listId: string, itemId: string) => void;
	onDeleteItem: (listId: string, itemId: string) => void;
	onDeleteList: (id: string) => void;
}

export default function Todolist({ id, name, items, onUpdateName, onAddItem, onUpdateItem, onToggleItem, onDeleteItem, onDeleteList }: TodoListProps) {
	return (
		<div className = "list-card">
			<div className = "list-heading">
				<input type="text" className="list-heading-input" value={name} placeholder="List Name" onChange={(e) => onUpdateName(id, e.target.value)} />
				<button className="todo-delete-button" onClick={() => onDeleteList(id)}></button>
			</div>

			<ul className = "todo-list">
				{items.map(item => (
					<TodoItem
						key={item.id}
						id={item.id}
						value={item.value}
						completed={item.completed}
						onUpdate={(itemId, value) => onUpdateItem(id, itemId, value)}
						onToggle={(itemId) => onToggleItem(id, itemId)}
						onDelete={(itemId) => onDeleteItem(id, itemId)}
					/>
				))}

				<p className="todo-add-button" onClick={() => onAddItem(id)}>
					+ List Item
				</p>
			</ul>
		</div>
	);
}