// ReactionGame – instrukce v README.md

let stav: string = "passive"
let pressedA = input.buttonIsPressed(Button.A)
let pressedB = input.buttonIsPressed(Button.B)
let pressedBoth = input.buttonIsPressed(Button.AB)
let runningIner:boolean = false;


function showHodiny() {
    for (let i = 0; i < 5; i++) {
        led.unplot(3, i)
        led.unplot(1, i)
        led.unplot(0, i)
    }
    
    for (let i = 0; i < 5; i++) {
        led.plot(i, 0)
        led.plot(i, 4)
        led.plot(i, i)
    }
    led.plot(3, 1)
    led.plot(1, 3)
}
function wait(){
    const waitTime = randint(3, 6)
    basic.pause(waitTime*1000)
}


basic.forever(function () {
    if (stav === "passive") {
        
        if (input.buttonIsPressed(Button.AB) === true) {
            stav = "started"
        }

    } else if (stav === "started") {
        showHodiny()
        control.runInBackground(() => music.playTone(440, 200))
        wait()
        let pressedA = input.buttonIsPressed(Button.A)
        let pressedB = input.buttonIsPressed(Button.B)
        if(pressedA === true){
            basic.showString("B")
            control.runInBackground(() => music.playTone(100, 200))
            stav = "passive"
        }else if(pressedB === true){
            basic.showString("A")
            control.runInBackground(() => music.playTone(100, 200))
            stav = "passive"
        } else if (input.buttonIsPressed(Button.AB) === true){
            basic.showIcon(IconNames.Sad)
            control.runInBackground(() => music.playTone(200, 200))
            stav = "passive"
        }
        if(stav !== "passive"){
            stav = "running"
        }
        

    } else if (stav === "running") {
        basic.showIcon(IconNames.Pitchfork)
        control.runInBackground(() => music.playTone(600, 50))
        runningIner = true;
        if(runningIner === true){
            
            let pressedA = input.buttonIsPressed(Button.A)
            let pressedB = input.buttonIsPressed(Button.B)

            if(pressedA === true){
                basic.showString("A");
                control.runInBackground(() => music.playTone(800, 200))
                stav = "passive"

            }else if(pressedB === true){
                basic.showString("B");
                control.runInBackground(() => music.playTone(900, 200))
                stav = "passive"

            } else if (input.buttonIsPressed(Button.B) === true){
                basic.showIcon(IconNames.Square)
                control.runInBackground(() => music.playTone(500, 200)) 
                stav = "passive"

            }
            basic.pause(20)
        }
        
    }

})

