import React from "react";
import { useState } from "react";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import app from "../../utilities/app";

function Register() {
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const navigate = useNavigate();
	const handleRegister = async (e) => {
		e.preventDefault();
		await app
			.post("//localhost:5001/api/v1/auth/register", {
				name,
				email,
				password,
			})
			.then((res) => {
				localStorage.setItem("name", res.data.user.name);
				localStorage.setItem("role", res.data.user.role);
				localStorage.setItem("userId", res.data.user.userId);
			});
		navigate("../", { replace: true });
		navigate(0);
	};

	return (
		<div className="registerContainer">
			<div className="formContainer">
				<span className="logo">TaskSocket</span>
				<span className="title">Member Register</span>
				<form onSubmit={handleRegister}>
					<input
						type="text"
						placeholder="username"
						name="name"
						onChange={(e) => setName(e.target.value)}
					/>
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
					<button>Register</button>
				</form>
				<p>
					Already have an account? <Link to={"/"}>Sign in here</Link>
				</p>
			</div>
		</div>
	);
}

export default Register;
