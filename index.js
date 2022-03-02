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



let mousePressed = false;
let currentMode;

const modes = {
    pan: 'pan',
    draw: 'draw'
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
                    canvas.relativePan(delta);
                    break;
                case modes.draw:
                    break;
            }
            
        }
    });

    //mouse click down
    canvas.on('mouse:down', (e) => {
        mousePressed = true;
        switch(currentMode) {
            case modes.pan:
                canvas.setCursor('grab');
        }
        
    });

    //mouse click up
    canvas.on('mouse:up', (e) => {
        mousePressed = false;
    });
}

const canvas = initCanvas('canvas');
setBackground(canvas, "img/box.jpg");
setPanEvents(canvas);
