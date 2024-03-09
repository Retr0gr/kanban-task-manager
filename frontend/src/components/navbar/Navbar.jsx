import React from "react";
import "./navbar.scss";
import app from "../../utilities/app";
import { useEffect, useState } from "react";

const Navbar = () => {
	const [user, setUser] = useState({});
	const getData = async () => {
		await app
			.get("//localhost:5001/api/v1/users/showMe")
			.then((res) => {
				setUser(res.data.user);
				console.log(user);
			})
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		getData();
	}, []);

	const logout = async () => {
		await app.get("//localhost:5001/api/v1/auth/logout");
		window.location.reload(false);
	};
	return (
		<div className="navbar">
			<h1 className="navTitle">TaskSocket</h1>
			<p className="userName">Welcome, {user.name}!</p>
			<button onClick={logout}>Logout</button>
		</div>
	);
};

export default Navbar;
