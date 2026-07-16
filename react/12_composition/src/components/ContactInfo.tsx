interface Props {
	name:string;
	profession:string;
}

const ContactInfo = (props:Props) => {

	return(
		<>
			<h3>{props.name}</h3>
			<h3>{props.profession}</h3>
		</>
	)
}

export default ContactInfo;