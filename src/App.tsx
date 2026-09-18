import Header from './modules/Header.tsx';
import Footer from './modules/Footer.tsx';
import Todoboard from './modules/Todoboard.tsx';
import Login from './Login.tsx';

import { useState, useEffect } from 'react';

import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from './firebase/firebase.ts';

export default function App() {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
		});

		return unsubscribe;
	}, []);

	return (
		<>
			<Header user={user} />
				{user ? <Todoboard user={user} /> : <Login />}
			<Footer />
		</>
	);
}