const initCanvas = (id) => {
    return new fabric.Canvas(id);
}

const setBackground = (canvas, path) => {
    const backgroundImg = new Image("backgroundImg");
    backgroundImg.src = path;
    canvas.setWidth(backgroundImg.naturalWidth);
    canvas.setHeight(backgroundImg.naturalHeight);
    fabric.Image.fromObject(backgroundImg, (img) => {
        canvas.backgroundImage = img; 
        canvas.renderAll();
    });
}
const canvas = initCanvas('canvas');
setBackground(canvas, "img/box.jpg");
canvas.on('mouse:move', (e) => {
    console.log(e)
});