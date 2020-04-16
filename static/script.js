const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.rect(0, 0, 900, 900);
ctx.fillStyle = "white";
ctx.fill();
const penColor = document.querySelector('input[name="penColor"]');
const penWidth = document.querySelector('input[name="penWidth"]');
const saver = document.getElementById('saver');

var bErasing = false;


/*function myTime(){
    var time= new Date();
document.getElementById("time").innerHTML=time.toLocaleTimeString();
}

setInterval(myTime,1000);


var date = new Date();
document.getElementById("date").innerHTML = date.toLocaleDateString();*/



//defining properties of line
ctx.strokeStyle = '#000000';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 5;

//declaring object naming pen
let pen = {
    x: 0, 
    y: 0,
    down: false
}

//adding event listeners to button and canvas
saver.addEventListener('click', saveFile);
canvas.addEventListener('mousedown', penDown);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', noDown);
canvas.addEventListener('mouseout', noDown);
eraser.addEventListener('click',erase);
pencil.addEventListener('click',pencildrw)
reset.addEventListener('click',remove)

//Erase function
function erase(){
    bErasing = true;
}


function pencildrw() {
        strokeStyle = "#000000";
       bErasing = false;
    }


//Reset canvas
function remove(){
    // ctx.clearRect(0,0,canvas.width,canvas.height);
    // ctx.beginPath();
    ctx.clearRect(0, 0, 900, 900);
    ctx.fillStyle = "white";
    ctx.fill();
}

//when mouse button is released
function noDown() {
    console.log('out');
    pen.down = false;
}

//drawing on canvas
function draw(e) {
    if (!pen.down) return;
    ctx.lineWidth = penWidth.value;
    ctx.strokeStyle = penColor.value;
    ctx.beginPath();
    ctx.moveTo(pen.x, pen.y);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [pen.x, pen.y] = [e.offsetX, e.offsetY];

     if(bErasing == true){
              ctx.globalCompositeOperation="destination-out";
            }else{
              ctx.globalCompositeOperation="source-over";
            }

}

//when mouse button is clicked
function penDown(e) {
    pen.down = true;
    [pen.x, pen.y] = [e.offsetX, e.offsetY];
    console.log(pen);
}

//Saving file as .png
function saveFile() {
    let image = canvas.toDataURL();
    let a = document.createElement('a');
    a.setAttribute('download', 'image.jpg');
    a.setAttribute('href', canvas.toDataURL('image/jpg').replace('image/jpg', 'image/octet-stream'));
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    document.getElementById('myImage').src = image;
}