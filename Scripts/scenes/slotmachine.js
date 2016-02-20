var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// MENU SCENE
var scenes;
(function (scenes) {
    var SlotMachine = (function (_super) {
        __extends(SlotMachine, _super);
        // CONSTRUCTOR ++++++++++++++++++++++
        function SlotMachine() {
            _super.call(this);
            this._grapes = 0;
            this._bananas = 0;
            this._oranges = 0;
            this._cherries = 0;
            this._bars = 0;
            this._bells = 0;
            this._sevens = 0;
            this._blanks = 0;
            this._currentBet = 0;
        }
        // PUBLIC METHODS +++++++++++++++++++++
        // Start Method
        SlotMachine.prototype.start = function () {
            // add background image to the scene
            this._backgroundImage = new createjs.Bitmap(assets.getResult("SlotMachine"));
            this.addChild(this._backgroundImage);
            // add Bet1Button to the scene
            this._bet1Button = new objects.Button("Bet1Button", 108, 468, false);
            this.addChild(this._bet1Button);
            this._bet1Button.on("click", this._bet1ButtonClick, this);
            // add Bet50Button to the scene
            this._bet50Button = new objects.Button("Bet50Button", 180, 468, false);
            this.addChild(this._bet50Button);
            this._bet50Button.on("click", this._bet50ButtonClick, this);
            // add Bet100Button to the scene
            this._bet100Button = new objects.Button("Bet100Button", 252, 468, false);
            this.addChild(this._bet100Button);
            this._bet100Button.on("click", this._bet100ButtonClick, this);
            // add SpinButton to the scene
            this._spinButton = new objects.Button("SpinButton", 400, 115, false);
            this.addChild(this._spinButton);
            this._spinButton.on("click", this._spinButtonClick, this);
            // add ResetButton to the scene
            this._resetButton = new objects.Button("ResetButton", 352, 468, false);
            this.addChild(this._resetButton);
            this._resetButton.on("click", this._resetButtonClick, this);
            // add ShutdownButton to the scene
            this._shutdownButton = new objects.Button("ShutdownButton", 424, 262, false);
            this.addChild(this._shutdownButton);
            this._shutdownButton.on("click", this._shutdownButtonClick, this);
            // add this scene to the global stage container
            stage.addChild(this);
            //this._resetAll();
        };
        // SLOT_MACHINE Scene updates here
        SlotMachine.prototype.update = function () {
        };
        //PRIVATE METHODS
        /* Utility function to check if a value falls within a range of bounds */
        SlotMachine.prototype._checkRange = function (value, lowerBounds, upperBounds) {
            return (value >= lowerBounds && value <= upperBounds) ? value : -1;
        };
        /* When this function is called it determines the betLine results.
        e.g. Bar - Orange - Banana */
        SlotMachine.prototype._reels = function () {
            var betLine = [" ", " ", " "];
            var outCome = [0, 0, 0];
            for (var spin = 0; spin < 3; spin++) {
                outCome[spin] = Math.floor((Math.random() * 65) + 1);
                switch (outCome[spin]) {
                    case this._checkRange(outCome[spin], 1, 27):
                        betLine[spin] = "blank";
                        this._blanks++;
                        break;
                    case this._checkRange(outCome[spin], 28, 37):
                        betLine[spin] = "Grapes";
                        this._grapes++;
                        break;
                    case this._checkRange(outCome[spin], 38, 46):
                        betLine[spin] = "Banana";
                        this._bananas++;
                        break;
                    case this._checkRange(outCome[spin], 47, 54):
                        betLine[spin] = "Orange";
                        this._oranges++;
                        break;
                    case this._checkRange(outCome[spin], 55, 59):
                        betLine[spin] = "Cherry";
                        this._cherries++;
                        break;
                    case this._checkRange(outCome[spin], 60, 62):
                        betLine[spin] = "Bar";
                        this._bars++;
                        break;
                    case this._checkRange(outCome[spin], 63, 64):
                        betLine[spin] = "Bell";
                        this._bells++;
                        break;
                    case this._checkRange(outCome[spin], 65, 65):
                        betLine[spin] = "Seven";
                        this._sevens++;
                        break;
                }
            }
            return betLine;
        };
        //EVENT HANDLERS ++++++++++++++++++++
        SlotMachine.prototype._bet1ButtonClick = function (event) {
            createjs.Sound.play("CoinSound"); // Play the coin sound on Bet1 button clicked
            console.log("Bet 1 Credit");
            this._currentBet = 1; // Set the current bet of player
            stage.removeChild(this._betLabel);
            this._betLabel = new objects.Label("$1", "bold 18px Cambria", "#000000", 378, 386);
            stage.addChild(this._betLabel);
        };
        SlotMachine.prototype._bet50ButtonClick = function (event) {
            createjs.Sound.play("CoinSound"); // Play the coin sound on Bet50 button clicked
            console.log("Bet 50 Credit");
            this._currentBet = 50; // Set the current bet of player
            stage.removeChild(this._betLabel);
            this._betLabel = new objects.Label("$50", "bold 18px Cambria", "#000000", 378, 386);
            stage.addChild(this._betLabel);
        };
        SlotMachine.prototype._bet100ButtonClick = function (event) {
            createjs.Sound.play("CoinSound"); // Play the coin sound on Bet100 button clicked
            console.log("Bet 100 Credit");
            this._currentBet = 100; // Set the current bet of player
            stage.removeChild(this._betLabel);
            this._betLabel = new objects.Label("$100", "bold 18px Cambria", "#000000", 378, 386);
            stage.addChild(this._betLabel);
        };
        SlotMachine.prototype._spinButtonClick = function (event) {
            createjs.Sound.play("SpinnerSound"); // Play the Spinner sound on SPIN button clicked
            console.log("Spin those reels!");
            console.log(this._reels());
            //this._determineWinnings();
            //this._displayPlayerAccount();
        };
        SlotMachine.prototype._resetButtonClick = function (event) {
            createjs.Sound.play("ButtonPressSound"); // Play the Clicked sound on Reset button clicked
            console.log("Reset the Game!");
            //this._resetAll();
            //this._resetFruitWheel();
            //this._displayPlayerAccount();
        };
        SlotMachine.prototype._shutdownButtonClick = function (event) {
            console.log("Shutdown the Game!");
            createjs.Sound.play("ShutdownSound"); // Play the Shut Down sound on ShutDown button clicked
            // Change the Scene to Game Over
            scene = config.Scene.GAME_OVER;
            changeScene();
        };
        return SlotMachine;
    })(objects.Scene);
    scenes.SlotMachine = SlotMachine;
})(scenes || (scenes = {}));
//# sourceMappingURL=slotmachine.js.map