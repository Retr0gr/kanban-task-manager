import React from "react";
import { useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import app from "../../utilities/app";

function Login() {
	const navigate = useNavigate();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const postLogin = async (e) => {
		e.preventDefault();
		await app
			.post("//localhost:5001/api/v1/auth/login", {
				email,
				password,
			})
			.then((res) => {
				localStorage.setItem("name", res.data.user.name);
				localStorage.setItem("role", res.data.user.role);
				localStorage.setItem("userId", res.data.user.userId);
				localStorage.setItem("email", res.data.user.email);
			})
			.catch((err) => console.log(err));
		navigate("../", { replace: true });
		navigate(0);
	};

	return (
		<div className="loginContainer">
			<div className="formContainer">
				<span className="logo">TaskSocket</span>
				<span className="title">Member Login</span>
				<form method="post" onSubmit={postLogin}>
					<input
						type="email"
						placeholder="email"
						name="email"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						placeholder="password"
						name="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button>Sign in</button>
				</form>
				<p>
					Don't have an account?{" "}
					<Link to={"/register"}>Register here</Link>
				</p>
			</div>
		</div>
	);
}

export default Login;
