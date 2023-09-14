const canvas = document.querySelector('#myCanvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const A = {x:200, y:150};
const B = {x:150,  y:250};
const C = {x:50, y:100};
const D = {x:250, y:200};

const lerp =(A, B, t) =>{
    return A+(B-A)*t;
}
const ctx = canvas.getContext('2d');
const drawDot= (point, label, isRed) =>{
    ctx.beginPath();
ctx.fillStyle = isRed?"red":'white';
ctx.arc(point.x, point.y, 10, 0, Math.PI*2);
ctx.fill(); 
ctx.stroke();
ctx.fillStyle = "black";
ctx.textAlign ="center";
ctx.fontBaseLine="middle";
ctx.font = "bold 14px Arial";
ctx.fillText(label, point.x, point.y);
}
function getIntersection(A,B,C,D) {
    /*
    Ix = Ax+(Bx-Ax)t = Cx +(Dx -Cx)u ---eq(1)      //point where they intersect on the x axis
    Iy = Ay+(By-Ay)t = Cy+ (Dy-Cy)u  --eq(2)
        make u subject of formula
        u(Dx-Cx) = (Ax-Cx)+[(Bx-Ax)t]  ---eq(3)
          u(Dy-Cy) = (Ay-Cy)+[(By-Ay)t]   //multiply by (Dx -Cx) ---eq(4)
          (Dx -Cx)(Ay-Cy)+(Dx-Cx)(By-Ay)t = (Dy-Cy)(Dx-Cx)u ---eq(5)  //subtitute eq(3) into eq(5)
          [(Dx -Cx)(Ay-Cy)]+[(Dx-Cx)(By-Ay)]t = (Dy-Cy)(Ax-Cx) + (Dy-Cy)(Bx-Ax)t  //make t subject of formula

            [(Dy-Cy)(Bx-Ax)t]-[(Dx-Cx)(By-Ay)]t = [(Dx -Cx)(Ay-Cy)] -[(Dy-Cy)(Ax-Cx)]
            t ={[(Dx -Cx)(Ay-Cy)] -[(Dy-Cy)(Ax-Cx)]}/{[(Dy-Cy)(Bx-Ax)]-[(Dx-Cx)(By-Ay)]}
            make u subject
            demominator the same as t but u
            uTop = (Cy - Ay) *(Ax -Bx) - (Cx - Ax)*(Ay -By);
            numerator t = [(Dx -Cx)(Ay-Cy)] -[(Dy-Cy)(Ax-Cx)]
            denominator t = [(Dy-Cy)(Bx-Ax)]-[(Dx-Cx)(By-Ay)]

     */
           const uTop = (C.y - A.y) *(A.x -B.x) - (C.x - A.x)*(A.y -B.y);
            const top =  (D.x -C.x) *(A.y-C.y) -(D.y - C.y) *(A.x-C.x);
            const bottom = (D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y);
            if(bottom !== 0){
            const t = top/bottom;
            const u = uTop/bottom;
            if(t>=0 && t<=1 && u>=0 && u<=1){
                return {
                    x:lerp(A.x, B.x, t),
                    y: lerp (A.y, B.y,t),
                    offset :t
                }
            }
            return null;
        }
}
const mouse ={x:0, y:0};
document.onmousemove= (e) =>{
    mouse.x = e.x;
    mouse.y = e.y;
}
let angle =0;
const animate = () =>{
    const radius = 50;

    A.x = mouse.x + Math.cos(angle)*radius;
    A.y = mouse.y  -Math.sin(angle)*radius;
    B.x= mouse.x -Math.cos(angle)*radius;
    B.y = mouse.y + Math.sin(angle)*radius;
    angle +=0.02
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(A.x, A.y);
    ctx.lineTo(B.x, B.y);
    ctx.moveTo(C.x, C.y);
    ctx.lineTo(D.x, D.y);
    ctx.stroke();

    drawDot(A, 'A');
    drawDot(B, 'B');
    drawDot(C, 'C');
    drawDot(D, 'D');
  
        const I = getIntersection(A,B, C, D);
        if(I){
        drawDot(I, "I");
        }
    requestAnimationFrame(animate)
}
animate();
