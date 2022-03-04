let mousePressed = false;
let currentMode;
let color = '#000000';
let group = {};
let svgState = {};
let bg = "img/box.jpg";

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
        canvas.requestRenderAll();
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

    canvas.requestRenderAll();
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
        originY: 'center',

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
        originY: 'center',
    });
    canvas.add(circ);
}

const groupObjects = (canvas, group, shouldGroup) => {
    if (shouldGroup) {
        const objects = canvas.getObjects();
        group.val = new fabric.Group(objects);
        clearCanvas(canvas);
        canvas.add(group.val);
        canvas.requestRenderAll();
    }
    else {
        group.val.destroy();
        const oldGroup = group.val.getObjects();
        canvas.remove(group.val);
        canvas.add(...oldGroup);
        group.val = null;
        canvas.requestRenderAll();
    }
}

const imgAdded = (e) => {
    inputElement = document.getElementById('myImg');
    const file = inputElement.files[0];
    reader.readAsDataURL(file);
    
}


const canvas = initCanvas('canvas');
const inputFile = document.getElementById('myImg');
const reader = new FileReader()
setBackground(canvas, bg);
setPanEvents(canvas);
setColorListener();
inputFile.addEventListener('change', imgAdded);
reader.addEventListener("load", () => {
    fabric.Image.fromURL(reader.result, img => {
        canvas.add(img);
        canvas.requestRenderAll()
    })
})
