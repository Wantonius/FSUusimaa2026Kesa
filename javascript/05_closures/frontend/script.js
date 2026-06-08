window.onload = function() {
	const fontSizer = makeFontSizer();
	console.log(fontSizer);
	document.getElementById("bigger").onclick = fontSizer.bigger;
	document.getElementById("smaller").onclick = fontSizer.smaller;
}

function makeFontSizer() {
	let fontSize = 16;
	document.body.style.fontSize = fontSize+"px";
	function changeSize(val) {
		fontSize += val;
		document.body.style.fontSize = fontSize+"px";
	}
	return {
		bigger:function() {
			changeSize(2);
		},
		smaller:function() {
			changeSize(-2);
		}
	}
}

const makeCounter = function(val) {
	let privateCounter = 0;
	if(val) {
		privateCounter = val;
	}
	function changeVal(val) {
		privateCounter += val;
	}
	return {
		increment:function(){
			changeVal(1);
		},
		decrement:function() {
			changeVal(-1);
		},
		value: function() {
			return privateCounter;
		}
	}
}

function start() {
	const counter1 = makeCounter(5);
	const counter2 = makeCounter(5);
	
	console.log("Counter 1 value",counter1.value());
	console.log("Counter 2 value",counter2.value());
	
	counter1.increment();
	counter1.increment();
	counter1.increment();
	
	counter2.decrement();
	counter2.decrement();
	counter2.decrement();

	console.log("Counter 1 value",counter1.value());
	console.log("Counter 2 value",counter2.value());
}