var beep;
function start_timer() {
	if (counter !== null) {
		clearInterval(counter);
	}
	
	var parts = timer_input.value.split(':');
	var minutes = parseInt(parts[0]);
	var seconds = parseInt(parts[1]);
	count = minutes * 60 + seconds;
	max_count = count;
	timer_text.style.color = "black";
	rad_timer.style.backgroundColor = "white";
	timer_progress_bar.style.width = "0%";
	counter = setInterval(timer, 1000);
}

function timer() {
	count = count - 1;
	timer_progress_bar.style.width = (100 - (count / max_count) * 100) + "%";
	
	var minutes = Math.floor(count / 60);
	var seconds = "" + (count % 60);

	var yellow_limit = max_count * 0.25;
	var red_limit = max_count * 0.10;

	if (count < red_limit) {
		rad_timer.style.backgroundColor = "red";
	} else if (count < yellow_limit) {
		rad_timer.style.backgroundColor = "yellow";
	}

	if (count <= 0) {
		timer_text.textContent = "Time's Up!";
		timer_text.style.color = "red";
		rad_timer.style.backgroundColor = "white";
		clearInterval(counter);
	} else {
		timer_text.textContent = minutes + ":" + seconds.padStart(2, "0");
		
		if (count === 60) {
			playBeep();
		} else if (count === 30) {
			playBeep();
			playBeep();
			playBeep();
		} else if (count <= 10) {
			playBeep();
		}
	}
}

function playBeep() {
	if (!beep) {
		beep = new Audio();
		beep.src = 'https://www.soundjay.com/buttons/beep-07a.wav';
	}
	beep.play();
}
