// MENU SCENE
module scenes {
    export class SlotMachine extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _backgroundImage: createjs.Bitmap;
        private _bet1Button: objects.Button;
        private _bet50Button: objects.Button;
        private _bet100Button: objects.Button;
        private _spinButton: objects.Button;
        private _resetButton: objects.Button;
        private _shutdownButton: objects.Button;
        
        private _grapes = 0;
        private _bananas = 0;
        private _oranges = 0;
        private _cherries = 0;
        private _bars = 0;
        private _bells = 0;
        private _sevens = 0;
        private _blanks = 0;
        
        
        private _resultMsgLabel:objects.Label;
        private _betLabel:objects.Label;
        private _playerCreditsLabel:objects.Label;
        private _spinResult:objects.Label;
        private _jackpotMoneyLabel:objects.Label;
        
        private _currentBet = 0;       

    // CONSTRUCTOR ++++++++++++++++++++++
    constructor() {
        super();
    }
        
        // PUBLIC METHODS +++++++++++++++++++++
        
        // Start Method
        public start(): void {    
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
    }

        // SLOT_MACHINE Scene updates here
        public update(): void {

    }
        
        //PRIVATE METHODS
        /* Utility function to check if a value falls within a range of bounds */
        private _checkRange(value:number, lowerBounds:number, upperBounds:number):number {
        return (value >= lowerBounds && value <= upperBounds) ? value : -1;
    }
        
        /* When this function is called it determines the betLine results.
        e.g. Bar - Orange - Banana */
        private _reels(): string[] {
        var betLine = [" ", " ", " "];
        var outCome = [0, 0, 0];

        for (var spin = 0; spin < 3; spin++) {
            outCome[spin] = Math.floor((Math.random() * 65) + 1);
            switch (outCome[spin]) {
                case this._checkRange(outCome[spin], 1, 27):  // 41.5% probability
                    betLine[spin] = "blank";
                    this._blanks++;
                    break;
                case this._checkRange(outCome[spin], 28, 37): // 15.4% probability
                    betLine[spin] = "Grapes";
                    this._grapes++;
                    break;
                case this._checkRange(outCome[spin], 38, 46): // 13.8% probability
                    betLine[spin] = "Banana";
                    this._bananas++;
                    break;
                case this._checkRange(outCome[spin], 47, 54): // 12.3% probability
                    betLine[spin] = "Orange";
                    this._oranges++;
                    break;
                case this._checkRange(outCome[spin], 55, 59): //  7.7% probability
                    betLine[spin] = "Cherry";
                    this._cherries++;
                    break;
                case this._checkRange(outCome[spin], 60, 62): //  4.6% probability
                    betLine[spin] = "Bar";
                    this._bars++;
                    break;
                case this._checkRange(outCome[spin], 63, 64): //  3.1% probability
                    betLine[spin] = "Bell";
                    this._bells++;
                    break;
                case this._checkRange(outCome[spin], 65, 65): //  1.5% probability
                    betLine[spin] = "Seven";
                    this._sevens++;
                    break;
            }
        }
        return betLine;
    }
    
 
        //EVENT HANDLERS ++++++++++++++++++++
        private _bet1ButtonClick(event: createjs.MouseEvent): void {
        createjs.Sound.play("CoinSound");       // Play the coin sound on Bet1 button clicked
        console.log("Bet 1 Credit");
        this._currentBet = 1;                   // Set the current bet of player
        stage.removeChild(this._betLabel);
        this._betLabel = new objects.Label("$1", "bold 18px Cambria","#000000",378, 386);
        stage.addChild(this._betLabel);
        
    }

        private _bet50ButtonClick(event: createjs.MouseEvent): void {
        createjs.Sound.play("CoinSound");           // Play the coin sound on Bet50 button clicked
        console.log("Bet 50 Credit");
        this._currentBet = 50;                     // Set the current bet of player
        stage.removeChild(this._betLabel);
        this._betLabel = new objects.Label("$50", "bold 18px Cambria","#000000",378, 386);
        stage.addChild(this._betLabel);
    }

        private _bet100ButtonClick(event: createjs.MouseEvent): void {
        createjs.Sound.play("CoinSound");           // Play the coin sound on Bet100 button clicked
        console.log("Bet 100 Credit");
        this._currentBet = 100;                     // Set the current bet of player
        stage.removeChild(this._betLabel);
        this._betLabel = new objects.Label("$100", "bold 18px Cambria","#000000",378, 386);
        stage.addChild(this._betLabel);
    }

        private _spinButtonClick(event: createjs.MouseEvent): void {
        createjs.Sound.play("SpinnerSound");        // Play the Spinner sound on SPIN button clicked
        console.log("Spin those reels!");
        console.log(this._reels());
        //this._determineWinnings();
        //this._displayPlayerAccount();
    }
    
        private _resetButtonClick(event: createjs.MouseEvent): void {
        createjs.Sound.play("ButtonPressSound");     // Play the Clicked sound on Reset button clicked
        console.log("Reset the Game!");
        //this._resetAll();
        //this._resetFruitWheel();
        //this._displayPlayerAccount();
       
    }
    
        private _shutdownButtonClick(event: createjs.MouseEvent): void {
        console.log("Shutdown the Game!");
        createjs.Sound.play("ShutdownSound");         // Play the Shut Down sound on ShutDown button clicked
      
        // Change the Scene to Game Over
        scene = config.Scene.GAME_OVER;
        changeScene();
    }
}
}