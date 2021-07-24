const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const save = document.querySelector("#jsSave");
const INITIAL_COLOR = "#2c2c2c";

canvas.width = 550; // canvas는 두개의 height, width값을 가져와야함, 하나는 css에 지정한 값, 즉 화면에 띄우는 창의 값이고 
canvas.height = 500; // ↪다른 하나는 실제로 pixel이 적용되어 사용되어질 canvas값이다. 따라서 같은 크기로 정해주면 된다.


ctx.fillStyle = "white";
ctx.fillRect(0, 0, 550, 500); // default 설정, 아무것도 fill하지 않은 상태에서 이미지를 저장하면 픽셀 bgcolor가 투명함, 따라서 default 값 정해줌
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let filling = false;
let painting = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
     const x = event.offsetX;
     const y = event.offsetY;
     if(!painting){ // painting = false라면 
         ctx.beginPath(); // 눈에 보이진 않지만 경로를 그림
         ctx.moveTo(x, y); // 경로의 좌표를 찍어줌, 즉 여기선 X,Y가 마우스의 캔버스 내 위치이므로 마우스가 움직이는 게 경로.
     }else{// painting = true라면 
         ctx.lineTo(x, y); // 현재 path의 마지막점 즉 클릭했을 때의 값, 경로의 마지막 점과 특정좌표, x와 y의 지점을 연결한다. 
         ctx.stroke(); // 선을 그어주는 역할
     }
}

function onMouseDown(event){
    painting = true;
}
 
function handleCanvasClick() {
    if(filling){
        ctx.fillRect(0, 0, 550, 500);
    }
}

function handleRightClick(event) {
    event.preventDefault();
}

function changeColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    }else{
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleSaveClick() {
    const image = canvas.toDataURL("image/png"); // png가 default기 때문에 빈칸으로 놔도 동일함 역할은 png 링크 형태로 저장   
    const link = document.createElement("a"); // a는 그 링크로 가지않고 그 링크를 다운로드 하는 것
    link.href = image;
    link.download = "PaintJs[🎨]";
    link.click(); //링크를 클릭하게 되는 것, 즉 링크는 다운로드 링크이기 때문에 save를 누를시 이 함수가 실행되면서 다운로드가 진행됨.
}

Array.from(colors).forEach(color => color.addEventListener("click", changeColor)); // 배열의 각각의 값마다 이 함수를 실행한다

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove); // mouseover와 mouseenter의 차이점 : https://lsjsj92.tistory.com/31  
    canvas.addEventListener("mousedown", startPainting); //mousedown 클릭 눌렀을 때 
    canvas.addEventListener("mouseup", stopPainting); //눌렀다가 뗐을 때
    canvas.addEventListener("mouseleave", stopPainting);//해당 엘리먼트 바깥으로 마우스를 옮겼을 때 
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleRightClick);
}


// Array.from(colors) 객체 (colors)를 배열의 형태로 만들어주는 함수 


if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(save){
    save.addEventListener("click", handleSaveClick);
}

const erase = document.querySelector("#jsErase");

function handleEraseMode() {
    const presentColor = ctx.fillStyle;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 550, 500);
    ctx.fillStyle = presentColor;
}

if(erase){
    erase.addEventListener("click", handleEraseMode);

}