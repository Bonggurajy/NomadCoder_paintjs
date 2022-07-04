const $canvas = document.querySelector('#jsCanvas')
const ctx = $canvas.getContext('2d');
const $colors = document.querySelectorAll('.jsColor');
const $range = document.querySelector('#jsRange');
const $mode = document.querySelector('#jsMode');
const $save = document.querySelector('#jsSave');

const DEFAULT_COLOR = 'black'; //사용하는 값이 반복되는 순간 변수에 할당하여 debugging에 유리하도록 설계한다.
$canvas.width = 550;
$canvas.height = 600; //css에선 canvas의 크기를 설정했다면, 여기서 설정한 것은 canavas내의 다룰 픽셀의 크기를 설정해준 것.

ctx.fillStyle = 'white';
ctx.fillRect(0,0, $canvas.width, $canvas.height); 
//canvas의 HTML배경색만 흰색으로 지정했었고, 픽셀배경색에 대한 설정이 없었기 때문에 그냥 save해서 보면 배경색이 default값인 투명색이 적용된다. 위 두 줄을 추가해 픽셀배경색을 흰 색으로 지정한다.
ctx.strokeStyle = DEFAULT_COLOR; //default값. handleColorClick함수가 실행되면 override되고 설정한 color가 할당된다.
ctx.fillStyle = DEFAULT_COLOR;
ctx.lineWidth = 2.5; //default값. handleWidthRange함수가 실행되면 override되고 설정한 width가 할당된다.


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

function handleCM (event) {
	event.preventDefault();
}

function handleSave() {
	const image = $canvas.toDataURL(); //이미지의 표현을 포함하는 데이터 URL을 반환
	const link = document.createElement('a');
	link.href = image;
	link.download = "myPicture";
	link.click(); //user가 직접 click 한 것처럼 click event를 simulating 한다.
}

if($canvas) {
	$canvas.addEventListener('mousemove', onMouseMove);
	$canvas.addEventListener('mousedown', startPainting);
	$canvas.addEventListener('mouseup', stopPainting);
	$canvas.addEventListener('mouseleave', stopPainting);
	$canvas.addEventListener('click', handleCanvasClick);
	$canvas.addEventListener('contextmenu', handleCM); //마우스 우클릭 금지
}


Array.from($colors).forEach((element) => { return element.addEventListener('click', handleColorClick)});

if($range) {
	$range.addEventListener('input', handleWidthRange);
}

if($mode) {
	$mode.addEventListener('click', handleMode);
}

if($save) {
	$save.addEventListener('click', handleSave);
}
