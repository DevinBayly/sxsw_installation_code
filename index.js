var state = {}
var iholder = document.querySelector("#interfaceHolder")
let scontrol = document.createElement("div")
let colornames = "red green blue yellow random".split(" ")
let sceneNames = "one two three four five six".split(" ")

scontrol.id = "sceneControlHolder"
function assembleInterface() {
    let sc = sceneHolder()
    let ch = colorHolder()
    makeLabel("Scene Changer:  ",iholder)
    iholder.append(sc)


    
    makeLabel("Scene Specific Controls:  ",iholder)
    iholder.append(scontrol)
    makeLabel("Color Theme Selection:",iholder)
    iholder.append(ch)
    makeControlsFromName("test")
}
function makeLabel(text,holder) {
    let p = document.createElement("p")
    p.className ="label"
    p.innerHTML = text
    holder.append(p)
}
let sceneControls = () => {
    let d = document.createElement("div");
    console.log(state.scene);
    let controls = makeControlsFromName("test");
    d.append(controls);
    return d;
}
let colorHolder = () => {
    let colorh = document.createElement("div");
    colorh.id = "colorHolder";
    for (let name of colornames) {
        let b = makeButton(name, "color");
        colorh.append(b);
    }
    return colorh;
}
function makeControlsFromName(name) {
    let child = scontrol.querySelector("div")
    if (child != null) {
        child.remove()
    }
    let controlHolder = document.createElement("div");
    let controls;
    if (name === "test") {
        controls = document.createElement("p");
        controls.innerHTML = "controls here";
    }
    controlHolder.append(controls);
    scontrol.append(controlHolder)
}
let sceneHolder = () => {
    let sceneHolder = document.createElement("div");
    sceneHolder.id = "sceneHolder";
    for (let name of sceneNames) {
        let b = makeButton(name, "scene");
        sceneHolder.append(b);
    }
    return sceneHolder;
}

function changeState(name, prop) {
    state[prop] = name;
    sendState()
}
function changeFunc(name, prop) {
    return () => {
        changeState(name,prop)
        console.log("button clicked", state);
    }
};

function makeButton(name, prop) {
    let b = document.createElement("button");
    let holder = document.createElement("div");
    b.onclick = changeFunc(name, prop)
    holder.append(b);
    b.innerHTML = name;
    return holder;
}
function sendState() {
    fetch("http://localhost:8003", {
        method: "POST",
        body: JSON.stringify(state)
    }).catch((e) => console.log(e));
}
