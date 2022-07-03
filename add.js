const canvas = document.querySelector('#jsCanvas')
const ctx = canvas.getContext('2d');

ctx.strokeStyle = 'black';
ctx.lineWidth = 1;

canvas.width = 550;
canvas.height = 600;

let painting = false;
//MouseEvent Functions
function startPainting () {
	painting = true;
}

function onMouseMove (event) {
	const x = event.offsetX;
	const y = event.offsetY;
	if(!painting) {
		ctx.beginPath();
		ctx.moveTo(x,y);
	}
	else {
		ctx.lineTo(x,y);
		ctx.stroke();
	}
}

function onMouseDown (event) {
	painting = true;
}

//Functions
function stopPainting () {
	painting = false;
}

if(canvas) {
	canvas.addEventListener('mousemove', onMouseMove)
	canvas.addEventListener('mousedown', startPainting)
	canvas.addEventListener('mouseup', stopPainting)
	canvas.addEventListener('mouseleave', stopPainting)
}

