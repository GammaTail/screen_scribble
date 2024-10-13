// const canvas = new fabric.Canvas('canvas', {
//     width: 10000,
//     height: 10000, 
// });
// canvas.requestRenderAll();

// fabric.Image.fromURL("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiswndxit7AvpE7XApMyO5pWSP7oLls3Mua8IWTcsWPTPp_2vVtkR6Tb0wQqkbBHSGimY&usqp=CAU", (img) => {
//     canvas.backgroundImage = img
//     canvas.requestRenderAll();
// })

const initCanvas = (id) => {
    return new fabric.Canvas(id, {
        width: 500,
        height: 500,
        selection: false,
    })
}

const setBackground = (url, canvas) => {
    fabric.Image.fromURL(url, (img) => {
        canvas.backgroundImage = img
        canvas.requestRenderAll();
    })
}

const toggleMode = (mode) => {
    if (mode === modes.pan) {
        if (currentMode === modes.pan){
            currentMode = ''
        } else {
            currentMode = modes.pan
            canvas.isDrawingMode = false
            canvas.requestRenderAll()
        }
    } else if (mode = modes.drawing){
        if (currentMode === modes.drawing){
            currentMode = ''
            canvas.isDrawingMode = false
            canvas.requestRenderAll()
        } else {
            //canvas.freeDrawingBrush = new fabric.SprayBrush(canvas)
            //canvas.freeDrawingBrush.width = 15
            currentMode = modes.drawing
            canvas.freeDrawingBrush.color = color
            canvas.isDrawingMode = true
            canvas.requestRenderAll()
        }
    }
}

const setPanEvents = (canvas) => {
    canvas.on('mouse:move', (event) => {
        if (mousePressed && currentMode === modes.pan){
            canvas.setCursor('grab')
            canvas.requestRenderAll()
            const mEvent = event.e
            const delta = new fabric.Point(mEvent.movementX, mEvent.movementY)
            canvas.relativePan(delta) 
        }
    })
    
    canvas.on('mouse:down', (event) => {
        mousePressed = true;
        if (currentMode === modes.pan) {
            canvas.setCursor('grab')
            canvas.requestRenderAll()
        }
    })
    
    canvas.on('mouse:up', (event) => {
        mousePressed = false,
        canvas.setCursor('default')
        canvas.requestRenderAll()
    })
}

const setColorListener = () => {

    const picker = document.getElementById('colorPicker')

    picker.addEventListener('change', (event) => {
        console.log(event.target.value)
        color = event.target.value
        canvas.freeDrawingBrush.color = color
        canvas.requestRenderAll()
    })
}

const canvas = initCanvas('canvas');

let color = '#000000'

let mousePressed = false

let currentMode;

const modes = {
    pan: 'pan',
    drawing: 'drawing'
}

setBackground("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiswndxit7AvpE7XApMyO5pWSP7oLls3Mua8IWTcsWPTPp_2vVtkR6Tb0wQqkbBHSGimY&usqp=CAU", canvas)

setPanEvents(canvas)

setColorListener()