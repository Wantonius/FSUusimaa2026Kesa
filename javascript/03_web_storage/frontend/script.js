window.onload = function() {
	if(localStorage.getItem("message")) {
		const message = localStorage.getItem("message");
		const localMessage = document.getElementById("local");
		localMessage.textContent = "In local storage:"+message
	}
	if(sessionStorage.getItem("message")) {
		const message = sessionStorage.getItem("message");
		const sessionMessage = document.getElementById("session");
		sessionMessage.textContent = "In session storage:"+message
	}
}

function saveToLocalStorage() {
	localStorage.setItem("message",document.getElementById("message").value);
}

function saveToSessionStorage() {
	sessionStorage.setItem("message",document.getElementById("message").value);
}