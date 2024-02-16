var c = document.getElementById("play-area");
var ctx = c.getContext("2d");

ctx.fillStyle = "white";
ctx.fillRect(0, 0, 500, 500);
var board = []; 
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
  // hello
  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }
  
  function shuffle(arr) {
    var i = arr.length, j, temp;
    while(--i > 0){
      j = Math.floor(Math.random()*(i+1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
  }
  function hslToHex(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;
    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = x => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}


  for (var i = 0; i < 100; i++) {
    var x = [];
    var hue = i * (360 / 100); // Vary the hue from 0 to 360 degrees
    x.push(Math.floor(i));
    x.push(hslToHex(hue, 100, 50)); // Use HSL to generate colors
    board.push(x);
}

shuffle(board);
function drawBoard(b) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 500, 500);
    for (var i = 0; i < 100; i++) {
            ctx.fillStyle = b[i][1];
            ctx.fillRect(i * 5,500-b[i][0]*3, 5, b[i][0]*3);
    }
}
drawBoard(board);
index = 0;
function selectionSort(){
    var min = [101];
    var mindex = -1;
    for(var i = index; i < board.length; i++){
        if(board[i][0] < min[0]){
            min = board[i]
            mindex = i;
        }
    }

    var t = board[index];
    board[index] = min;
    board[mindex] = t;
    index++;
    drawBoard(board);

    if(index >= board.length){
        clearInterval(interval); // Stop the interval when the board is fully sorted
    }
}

function start(){
var interval = setInterval(selectionSort, 50);
}