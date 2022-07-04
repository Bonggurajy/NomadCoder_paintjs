const $canvas = document.querySelector('#jsCanvas')
const ctx = $canvas.getContext('2d');
const $colors = document.querySelectorAll('.jsColor');
const $range = document.querySelector('#jsRange');
const $mode = document.querySelector('#jsMode');

const DEFAULT_COLOR = 'black';

ctx.strokeStyle = DEFAULT_COLOR; //default값. handleColorClick함수가 실행되면 override되고 설정한 color가 할당된다.
ctx.fillStyle = DEFAULT_COLOR;
ctx.lineWidth = 2.5; //default값. handleWidthRange함수가 실행되면 override되고 설정한 width가 할당된다.

$canvas.width = 550;
$canvas.height = 600; //css에선 canvas의 크기를 설정했다면, 여기서 설정한 것은 canavas내의 다룰 픽셀의 크기를 설정해준 것.

let painting = false;
let filling = false;

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
	ctx.fillStyle = color;
}
function handleWidthRange (event) {
	const lineWidth = event.target.value;
	ctx.lineWidth = lineWidth;
}

function handleMode () {
	if(filling === true) {
		filling = false;
		$mode.innerText = 'fill';
	} else {
		filling = true;
		$mode.innerText = 'paint';
	}
}

function handleCanvasClick () {
	if(filling) {
		ctx.fillRect(0,0, $canvas.width, $canvas.height);
	}
}
 

if($canvas) {
	$canvas.addEventListener('mousemove', onMouseMove);
	$canvas.addEventListener('mousedown', startPainting);
	$canvas.addEventListener('mouseup', stopPainting);
	$canvas.addEventListener('mouseleave', stopPainting);
	$canvas.addEventListener('click', handleCanvasClick)
}


Array.from($colors).forEach((element) => { return element.addEventListener('click', handleColorClick)});

if($range) {
	$range.addEventListener('input', handleWidthRange);
}

if($mode) {
	$mode.addEventListener('click', handleMode);
}

