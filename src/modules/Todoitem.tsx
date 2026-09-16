interface TodoItemProps {
	id: string;
	value: string;
	completed: boolean;
	onUpdate: (id: string, value: string) => void;
	onToggle: (id: string) => void;
	onDelete: (id: string) => void;
}

export default function TodoItem({id, value, completed, onUpdate, onToggle, onDelete}: TodoItemProps) {
	const resizeTextarea = (textarea: HTMLTextAreaElement) => {
		textarea.style.height = 'auto';
		textarea.style.height = `${textarea.scrollHeight}px`;
	};

	return (
		<li className={`todo-item${completed ? " completed" : ""}`}>
			<input
				className="todo-checkbox"
				type="checkbox"
				checked={completed}
				onChange={() => onToggle(id)}
			/>

			<textarea
				className="todo-name"
				placeholder="Item Name"
				value={value}
				onChange={(e) => {
					onUpdate(id, e.target.value);
					resizeTextarea(e.currentTarget);
				}}
				rows={1}
			/>

			<button className="todo-delete-button" onClick={() => onDelete(id)}></button>
		</li>
	);
}