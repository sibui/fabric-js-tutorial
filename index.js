let mousePressed = false;
let currentMode;
let color = '#000000'

const modes = {
    pan: 'pan',
    draw: 'draw',
    rect: 'rect',
    circ: 'circ'
}

const initCanvas = (id) => {
    return new fabric.Canvas(id, {
        selection: false,

    });
}

const setBackground = (canvas, path) => {
    let backgroundImg = new Image("backgroundImg");
    backgroundImg.src = path;
    canvas.setWidth(backgroundImg.naturalWidth);
    canvas.setHeight(backgroundImg.naturalHeight);
    
    fabric.Image.fromObject(backgroundImg, (img) => {
        canvas.backgroundImage = img; 
        canvas.renderAll();
    }); 
}

const toggleMode = (mode) => {
    (currentMode != mode) ? currentMode = mode : currentMode = '';

    switch(mode) {
        case modes.draw:
            canvas.isDrawingMode = !canvas.isDrawingMode;
            break;

    }

    //always turn off drawing mode if you toggle any other mode
    if (mode != modes.draw) { 
        canvas.isDrawingMode = false;
    }

    canvas.renderAll();
}

const setPanEvents = (canvas) => {
    //mouse moves over canvas
    canvas.on('mouse:move', (event) => {
        const mEvent = event.e;
        const delta = new fabric.Point(mEvent.movementX,mEvent.movementY);
        if(mousePressed){
            switch(currentMode) {
                case modes.pan:
                    canvas.setCursor('grab');
                    canvas.relativePan(delta);
                    break;
                case modes.draw:
                    break;
                case modes.rect:
                    break;
                case modes.circ:
                    break;
            }
            
        }
    });

    //mouse click down
    canvas.on('mouse:down', (e) => {
        const mEvent = e.e;
        mousePressed = true;
        switch(currentMode) {
            case modes.pan:
                canvas.setCursor('grab');
                break;
            case modes.rect:
                drawRect(canvas,mEvent.offsetX,mEvent.offsetY);
                break;
                case modes.circ:
                    drawCirc(canvas,mEvent.offsetX,mEvent.offsetY);
                    break;
        }
        
    });

    //mouse click up
    canvas.on('mouse:up', (e) => {
        mousePressed = false;
    });
}

const setColorListener = () => {
    const picker = document.getElementById("colorPicker");
    picker.addEventListener('change', (event) => { 
        color = event.target.value;
        canvas.freeDrawingBrush.color = color;
    })
}

const clearCanvas = (canvas) => {
    canvasObjects = canvas.getObjects();
    canvasObjects.forEach(obj => canvas.remove(obj));
}

const drawRect = (canvas,x,y) => {
    rect = new fabric.Rect({
        width: 50, 
        height: 50, 
        fill: color,
        left: x,
        top: y,
        originX: 'center',
        originY: 'center'

    });
    canvas.add(rect);
}

const drawCirc = (canvas, x, y) => {
    circ = new fabric.Circle({
        radius: 50, 
        length: 50, 
        fill: color,
        left: x,
        top: y,
        originX: 'center',
        originY: 'center'

    });
    canvas.add(circ);

}

const canvas = initCanvas('canvas');
setBackground(canvas, "img/box.jpg");
setPanEvents(canvas);
setColorListener();
