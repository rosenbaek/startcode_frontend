import React from "react";
import "./App.css";
import Login from "./components/Login";
import { Switch, Route, useHistory } from "react-router-dom";
import Nav from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./screens/HomeScreen";
import ProtectedScreen from "./screens/ProtectedScreen";
import Facade from "./facades/Facade";
//import PrivateRoute from "./components/PrivateRoute";

function App() {
	const [loggedIn, setLoggedIn] = React.useState(Facade.loggedIn());
	let history = useHistory();

	const changeLoginStatus = (pageToGo) => {
		setLoggedIn(!loggedIn);
		history.push(pageToGo);
	};

	return (
		<div className="App">
			<Nav loggedIn={loggedIn} changeLoginStatus={changeLoginStatus} />

			<Switch>
				<Route exact path="/">
					<Home />
				</Route>

				<PrivateRoute
					path="/protected"
					loggedIn={loggedIn}
					component={ProtectedScreen}
				/>

				<Route path="/login">
					<Login changeLoginStatus={changeLoginStatus} />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
