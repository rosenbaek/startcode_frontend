const Home = (props) => {
	return (
		<>
			<h2>Home</h2>
			{props.user && (
				<div>
					<h4>Welcome {props.user.username}</h4>
					<p>Roles:</p>
					<ul>
					{props.user.roles.map((role) =><li key={role}>{role}</li>)}
					</ul>
				</div>
				)}
		</>
		
	);
};

export default Home;
