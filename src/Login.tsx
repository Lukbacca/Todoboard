import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase/firebase";

const provider = new GoogleAuthProvider();

export default function Login() {
	const loginWithGoogle = async () => {
		try {
			await signInWithPopup(auth, provider);
		} catch (error) {
			console.error("Google login failed:", error);
		}
	};

	return (
		<div className = "login-container">
			<button className="login-button" onClick={loginWithGoogle}>Login to continue</button>
		</div>
	);
}