import { type User, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.ts';

interface HeaderProps {
	user: User | null;
}

export default function Header({ user }: HeaderProps) {

	const logout = async () => {
		try {
			await signOut(auth);
		} catch (error) {
			console.error('Logout failed:', error);
		}
	};
	
	return (
		<header>
			<h1>Todo Board</h1>

			{user && (
				<button className="logout-button" onClick={logout}>Sign Out</button>
			)}
		</header>
	);
}