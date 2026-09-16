export interface TodoItemData {
	id: string;
	value: string;
	completed: boolean;
}

export interface TodoListData {
	id: string;
	name: string;
	items: TodoItemData[];
}