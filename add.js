const $canvas = document.querySelector('#jsCanvas')
const ctx = $canvas.getContext('2d');
const $colors = document.querySelectorAll('.jsColor');

ctx.strokeStyle = 'black'; //default값. handleColorClick함수가 실행되면 override되고 설정한 color가 할당된다.
ctx.lineWidth = 1;

$canvas.width = 550;
$canvas.height = 600;

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

//Functions
function stopPainting () {
	painting = false;
}
function handleColorClick (event) {
	const color = event.target.style.backgroundColor;
	ctx.strokeStyle = color;
}

if($canvas) {
	$canvas.addEventListener('mousemove', onMouseMove)
	$canvas.addEventListener('mousedown', startPainting)
	$canvas.addEventListener('mouseup', stopPainting)
	$canvas.addEventListener('mouseleave', stopPainting)
}


Array.from($colors).forEach((element) => { return element.addEventListener('click', handleColorClick)});

