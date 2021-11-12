import { URL } from "../constants.js";

function handleHttpErrors(res) {
	if (!res.ok) {
		return Promise.reject(res.json());
	}
	return res.json();
}

const Facade = () => {
	const login = (user, password) => {
		const options = makeOptions("POST", true, {
			username: user,
			password: password,
		});
		return fetch(URL + "/api/login", options)
			.then(handleHttpErrors)
			.then((res) => {
				//TODO Set user object in localstorage (username, roles)
				console.log(JSON.stringify(res));
				setToken(res.token);
			});
	};

	const setToken = (token) => {
		localStorage.setItem("jwtToken", token);
	};
	const getToken = () => {
		return localStorage.getItem("jwtToken");
	};
	const loggedIn = () => {
		return getToken() != null;
	};
	const logout = () => {
		localStorage.removeItem("jwtToken");
	};

	const fetchData = () => {
		const options = makeOptions("GET", true); //True add's the token
		return fetch(URL + "/api/jokes", options).then(handleHttpErrors);
	};

	const makeOptions = (method, addToken, body) => {
		var opts = {
			method: method,
			headers: {
				"Content-type": "application/json",
				Accept: "application/json",
			},
		};
		if (addToken && loggedIn()) {
			opts.headers["x-access-token"] = getToken();
		}
		if (body) {
			opts.body = JSON.stringify(body);
		}
		return opts;
	};
	return {
		makeOptions,
		setToken,
		getToken,
		loggedIn,
		login,
		logout,
		fetchData,
	};
};

export default Facade();
