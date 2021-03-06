/// <reference path = "_reference.ts" />
// global variables
var assets;
var canvas;
var stage;
var stats;
var currentScene;
var scene;
// Game Scenes
var menu;
var slotMachine;
var gameOver;
var assetData = [
    { id: "StartButton", src: "../../Assets/images/StartButton.png" },
    { id: "StartOverButton", src: "../../Assets/images/StartOverButton.png" },
    { id: "SlotMachine", src: "../../Assets/images/SlotMachine.png" },
    { id: "Bet1Button", src: "../../Assets/images/Bet1Button.png" },
    { id: "Bet50Button", src: "../../Assets/images/Bet50Button.png" },
    { id: "Bet100Button", src: "../../Assets/images/Bet100Button.png" },
    { id: "SpinButton", src: "../../Assets/images/SpinButton.png" },
    { id: "ResetButton", src: "../../Assets/images/ResetButton.png" },
    { id: "ShutdownButton", src: "../../Assets/images/ShutdownButton.png" },
    { id: "HappySmiley", src: "../../Assets/images/Happysmiley.png" },
    { id: "SadSmiley", src: "../../Assets/images/Sadsmiley.png" },
    { id: "WinSmiley", src: "../../Assets/images/Winsmiley.png" },
    { id: "JackpotSmiley", src: "../../Assets/images/Jackpotsmiley.png" },
    { id: "banana", src: "../../Assets/images/banana.png" },
    { id: "bar", src: "../../Assets/images/bar.png" },
    { id: "bells", src: "../../Assets/images/bells.png" },
    { id: "blank", src: "../../Assets/images/blank.png" },
    { id: "cherry", src: "../../Assets/images/cherry.png" },
    { id: "grapes", src: "../../Assets/images/grapes.png" },
    { id: "orange", src: "../../Assets/images/orange.png" },
    { id: "seven", src: "../../Assets/images/banana.png" },
    { id: "1", src: "../../Assets/images/1.png" },
    { id: "2", src: "../../Assets/images/2.png" },
    { id: "3", src: "../../Assets/images/3.png" },
    { id: "4", src: "../../Assets/images/4.png" },
    { id: "5", src: "../../Assets/images/5.png" },
    { id: "6", src: "../../Assets/images/6.png" },
    { id: "7", src: "../../Assets/images/7.png" },
    { id: "8", src: "../../Assets/images/8.png" },
    { id: "ShutdownSound", src: "../../Assets/audio/shutdown.wav" },
    { id: "GameStartSound", src: "../../Assets/audio/gamestart.wav" },
    { id: "ButtonPressSound", src: "../../Assets/audio/buttonpress.wav" },
    { id: "CoinSound", src: "../../Assets/audio/coin.wav" },
    { id: "SpinnerSound", src: "../../Assets/audio/spinner.wav" },
    { id: "JackpotWinSound", src: "../../Assets/audio/jackpotwin.wav" },
];
function preload() {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    assets.on("complete", init, this);
    assets.loadManifest(assetData);
}
function init() {
    // create a reference the HTML canvas Element
    canvas = document.getElementById("canvas");
    // create our main display list container
    stage = new createjs.Stage(canvas);
    // Enable mouse events
    stage.enableMouseOver(20);
    // set the framerate to 60 frames per second
    createjs.Ticker.setFPS(config.Game.FPS);
    // create an event listener to count off frames
    createjs.Ticker.on("tick", gameLoop, this);
    // sets up our stats counting workflow
    setupStats();
    // set initial scene
    scene = config.Scene.MENU;
    changeScene();
}
// Main Game Loop function that handles what happens each "tick" or frame
function gameLoop(event) {
    // start collecting stats for this frame
    stats.begin();
    // calling State's update method
    currentScene.update();
    // redraw/refresh stage every frame
    stage.update();
    // stop collecting stats for this frame
    stats.end();
}
// Setup Game Stats
function setupStats() {
    stats = new Stats();
    stats.setMode(0); // shows fps
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";
    document.body.appendChild(stats.domElement);
}
// Finite State Machine used to change Scenes
function changeScene() {
    // Launch various scenes
    switch (scene) {
        case config.Scene.MENU:
            // show the MENU scene
            stage.removeAllChildren();
            menu = new scenes.Menu();
            currentScene = menu;
            console.log("Starting MENU Scene");
            break;
        case config.Scene.SLOT_MACHINE:
            // show the PLAY scene
            stage.removeAllChildren();
            slotMachine = new scenes.SlotMachine();
            currentScene = slotMachine;
            console.log("Starting SLOT_MACHINE Scene");
            break;
        case config.Scene.GAME_OVER:
            // show the game OVER scene
            stage.removeAllChildren();
            gameOver = new scenes.GameOver();
            currentScene = gameOver;
            console.log("Starting GAME_OVER Scene");
            break;
    }
    //preload();
    console.log(currentScene.numChildren);
}
window.onload = preload;
//# sourceMappingURL=game.js.map