function findMe() {

	const status = document.getElementById("status");
	const mapLink = document.getElementById("mapLink");
	
	function success(position) {
		const latitude = position.coords.latitude;
		const longitude = position.coords.longitude;
		
		status.textContent = "";
		
		mapLink.href="https://www.openstreetmap.org/#map=18/"+latitude+"/"+longitude
		mapLink.textContent = "Your location"
	}
	
	function error() {
		status.textContent = "Cannot retrieve your location"
	}
	
	if(!navigator.getlocation) {
		status.textContent = "No geolocation"
	} else {
		status.textContent = "Locating";
	}
	
	navigator.geolocation.getCurrentPosition(success,error);
}