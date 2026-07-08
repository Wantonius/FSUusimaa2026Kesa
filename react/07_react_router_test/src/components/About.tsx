import {useNavigate} from 'react-router';

const About = () => {

	const navigate = useNavigate();
	
	return(
		<>
			<h2>This is the React Router Test App</h2>
			<button onClick={() => navigate("/secret")}>Go to secret page</button>
		</>
	)
	
}

export default About;