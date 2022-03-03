var state = {}
var iholder = document.querySelector("#interfaceHolder")
let scontrol = document.createElement("div")
let trackerScenes = `
Icy Sunburst
Flaming Sunburst
Dark Waves
Space Fabric
Star Dust
Quantum Tunneling
`.trim().split("\n")
let cameraScenes = `
Star Child
Star Shower
`.trim().split("\n")

scontrol.id = "sceneControlHolder"
function assembleInterface() {
    let trackerSc = sceneMaker(trackerScenes,"trackerHolder")
    makeLabel("Tracker:  ",iholder)
    iholder.append(trackerSc)
    let cameraSc = sceneMaker(cameraScenes,"cameraHolder")
    makeLabel("Camera:  ",iholder)
    iholder.append(cameraSc)
    let home = document.createElement("button")
    home.innerHTML = "Home"
    home.onclick = () => {

        changeState("background","scene")
    }
    let homeHolder = document.createElement("div")
    homeHolder.id = "homeHolder"
    homeHolder.append(home)
    iholder.append(homeHolder)
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
let sceneMaker = (names,id) => {
    let sceneHolder = document.createElement("div");
    sceneHolder.id = id;
    for (let name of names) {
        let b = makeButton(name, "scene");
        sceneHolder.append(b);
    }
    return sceneHolder;
}

function changeState(name, prop) {
    state[prop] = name.replace(/\s/g,"_").toLowerCase(); 
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
    fetch("http://192.168.2.103:8003", {
        method: "POST",
        body: JSON.stringify(state)
    }).catch((e) => console.log(e));
}
