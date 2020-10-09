rad_timer=document.createElement("div")
rad_timer.id="rad_timer"
rad_timer.style="position:absolute;left:100px;top:100px;z-index:1000000;background:white;padding:5px;border-radius:3px;border:1px solid black;"

timer_text=document.createElement("div")
timer_text.id="rad_timerheader"
timer_text.style="width:auto;"
timer_text.textContent="Time's Up!"
timer_text.style.cursor="move"

timer_input=document.createElement("input")
timer_input.id="timer_input"
timer_input.style="width:100px;"
timer_input.value="0:30"

timer_button=document.createElement("button")
timer_button.id="timer_button"
timer_button.style=""
timer_button.textContent="Go!"
timer_button.onclick=start_timer

timer_close=document.createElement("div")
timer_close.id="timer_close"
timer_close.style="position:absolute;right:5px;top:0;cursor:pointer;"
timer_close.textContent="☒"
timer_close.onclick=function(){document.body.removeChild(rad_timer);if (counter!=null){clearInterval(counter);}}

timer_progress_bar=document.createElement("span")
timer_progress_bar.id="timer_progress_bar"
timer_progress_bar.style="width:100%;height:100%;background-color:black;display:block;"

timer_progress=document.createElement("div")
timer_progress.id="timer_progress"
timer_progress.style="width:100%;height:5px;background-color:beige;margin-top:3px;"
timer_progress.appendChild(timer_progress_bar)


rad_timer.appendChild(timer_text)
rad_timer.appendChild(timer_input)
rad_timer.appendChild(timer_button)
rad_timer.appendChild(timer_close)
rad_timer.appendChild(timer_progress)

document.body.appendChild(rad_timer)




//==================================================================================================

//shared counter + count
var counter;
var count;
var max_count;

function start_timer()
{
	if (counter!=null)
	{
		clearInterval(counter);
	}
	
	var parts = timer_input.value.split(':');
	var minutes = parseInt(parts[0]);
	var seconds = parseInt(parts[1]);
	count = minutes * 60 + seconds;
	max_count = count;
	timer_text.style.color="black";
	rad_timer.style.backgroundColor="white";
	timer_progress_bar.style.width="0%";
	counter = setInterval(timer, 1000);
}
timer_button.onclick=start_timer

function timer()
{
	count = count-1;
	
	timer_progress_bar.style.width = (100 - (count / max_count) * 100) + "%";
	
	var min = Math.floor(count / 60);
	var sec = ""+(count % 60)
	
	var yellow_limit = max_count * 0.25
	var red_limit = max_count * 0.10
	
	if (count < red_limit)
	{
		rad_timer.style.backgroundColor="red";
	}
	else if (count < yellow_limit)
	{
		rad_timer.style.backgroundColor="yellow";
	}
	
	if (count <= 0)
	{
		timer_text.textContent = "Time's Up!";
		timer_text.style.color="red";
		rad_timer.style.backgroundColor="white";
		clearInterval(counter);
	}
	else
	{
		timer_text.textContent = min + ":" + sec.padStart(2, "0");
	}
}







// Make the DIV element draggable:
dragElement(document.getElementById("rad_timer"));

function dragElement(elmnt) {
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	if (document.getElementById(elmnt.id + "header")) {
		// if present, the header is where you move the DIV from:
		document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
	} else {
		// otherwise, move the DIV from anywhere inside the DIV:
		elmnt.onmousedown = dragMouseDown;
	}

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		// set the element's new position:
		elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
		elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
	}

	function closeDragElement() {
		// stop moving when mouse button is released:
		document.onmouseup = null;
		document.onmousemove = null;
	}
}
