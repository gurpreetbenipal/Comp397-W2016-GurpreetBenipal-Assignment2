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
        
        private _tiles: createjs.Bitmap[] = [];
        private _imageContainers: createjs.Container[] = [];
        
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
        private _win = 0;
        private _loss = 0;
        private _playerCredits = 1000;
        private _jackpot = 5000;
        private _winNumber = 0;
        private _lossNumber = 0;
        private _winningRatio = 0;
        private _turn = 0;
      

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
        
        
        for (var index = 0; index < config.Game.REELS; index++) {
            this._imageContainers[index] = new createjs.Container();
            stage.addChild(this._imageContainers[index]);
        }
        this._imageContainers[0].x = 101;
        this._imageContainers[0].y = 167;
        this._imageContainers[1].x = 194;
        this._imageContainers[1].y = 167;
        this._imageContainers[2].x = 289;
        this._imageContainers[2].y = 167;
        
        // add this scene to the global stage container
        stage.addChild(this);
        
        this._resetAll();
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
                    betLine[spin] = "grapes";
                    this._grapes++;
                    break;
                case this._checkRange(outCome[spin], 38, 46): // 13.8% probability
                    betLine[spin] = "banana";
                    this._bananas++;
                    break;
                case this._checkRange(outCome[spin], 47, 54): // 12.3% probability
                    betLine[spin] = "orange";
                    this._oranges++;
                    break;
                case this._checkRange(outCome[spin], 55, 59): //  7.7% probability
                    betLine[spin] = "cherry";
                    this._cherries++;
                    break;
                case this._checkRange(outCome[spin], 60, 62): //  4.6% probability
                    betLine[spin] = "bar";
                    this._bars++;
                    break;
                case this._checkRange(outCome[spin], 63, 64): //  3.1% probability
                    betLine[spin] = "bells";
                    this._bells++;
                    break;
                case this._checkRange(outCome[spin], 65, 65): //  1.5% probability
                    betLine[spin] = "seven";
                    this._sevens++;
                    break;
            }
        }
        return betLine;
    }
    
    /* Method to reset the Fruit Wheel*/
    private _resetFruitWheel() {
        this._blanks = 0;
        this._grapes = 0;
        this._bananas = 0;
        this._oranges = 0;
        this._cherries = 0;
        this._bars = 0;
        this._bells = 0;
        this._sevens = 0;
    }
    
    /*Method to reset everything */
    private _resetAll() {
        this._win = 0;
        this._loss = 0;
        this._currentBet = 0;
        this._playerCredits = 1000;
        this._jackpot = 5000;
        this._winNumber = 0;
        this._lossNumber = 0;
        this._turn = 0;
        this._winningRatio = 0;
    
        this._spinButton.mouseEnabled=true;
        
        stage.removeChild(this._betLabel);
        stage.removeChild(this._spinResult);
        stage.removeChild(this._resultMsgLabel);
        this._displayPlayerAccount();
        
    }

    /* This method calculates the player's winning amount */
    
    private _determineWinnings() {
        if (this._blanks == 0) {
            if (this._grapes == 3) {
                this._win = this._currentBet * 10;
            }
            else if (this._bananas == 3) {
                this._win = this._currentBet * 20;
            }
            else if (this._oranges == 3) {
                this._win = this._currentBet * 30;
            }
            else if (this._cherries == 3) {
                this._win = this._currentBet * 40;
            }
            else if (this._bars == 3) {
                this._win = this._currentBet * 50;
            }
            else if (this._bells == 3) {
                this._win = this._currentBet * 75;
            }
            else if (this._sevens == 3) {
                this._win = this._currentBet * 100;
            }
            else if (this._grapes == 2) {
                this._win = this._currentBet * 2;
            }
            else if (this._bananas == 2) {
                this._win = this._currentBet * 2;
            }
            else if (this._oranges == 2) {
                this._win = this._currentBet * 3;
            }
            else if (this._cherries == 2) {
                this._win = this._currentBet * 4;
            }
            else if (this._bars == 2) {
                this._win = this._currentBet * 5;
            }
            else if (this._bells == 2) {
                this._win = this._currentBet * 10;
            }
            else if (this._sevens == 2) {
                this._win = this._currentBet * 20;
            }
            else if (this._sevens == 1) {
                this._win = this._currentBet * 5;
            }
            else {
                this._win = this._currentBet * 1;
            }
            this._winNumber++;
            this._displayWinMessage();
            stage.removeChild(this._spinResult);
            this._spinResult = new objects.Label("+$" + this._win.toString(),"bold 18px Cambria","#000000", 260, 386);
            stage.addChild(this._spinResult);
        }
        else {
            this._lossNumber++;
            this._displayLossMessage();
            stage.removeChild(this._spinResult);
            this._spinResult = new objects.Label("-$" + this._currentBet.toString(),"bold 18px Cambria","#000000", 260, 386);
            stage.addChild(this._spinResult);
        }

    }      

    private _displayWinMessage(){
        stage.removeChild(this._resultMsgLabel);
        this._playerCredits += this._win;
        this._resultMsgLabel = new objects.Label("You Won","bold 18px Cambria","#FFFFFF", 240, 100);
        stage.addChild(this._resultMsgLabel);
        this._checkForJackPot();
        this._resetFruitWheel();
    }
    
    private _displayLossMessage(){
        stage.removeChild(this._resultMsgLabel);
        this._playerCredits -= this._currentBet;
        this._resultMsgLabel = new objects.Label("You Loss","bold 18px Cambria","#FFFFFF", 240, 100);
        stage.addChild(this._resultMsgLabel);
        stage.addChild(this._resultMsgLabel);
        //this._checkForJackPot();
        this._resetFruitWheel();
    }

    /* Check whether the player won the Jackpot or not */
    private _checkForJackPot() {
        /* Compare 2 Random numbers */
        var random1 = Math.floor(Math.random() * 51 + 1);
        var random2 = Math.floor(Math.random() * 51 + 1);
        if ( random1 ==  random2) {                         // If both random numbers are same, the player won the Jackpot
            createjs.Sound.play("JackpotWinSound");
            stage.removeChild(this._resultMsgLabel);
            this._resultMsgLabel = new objects.Label("Congrats! You Won a Jackpot","bold 18px Cambria","#FFCC00", 240, 100);       //Display Jackpot Won label on Machine's screen
            stage.addChild(this._resultMsgLabel);
            this._playerCredits += this._jackpot;
            this._jackpot = 5000;
        }
    }
    
    /* Method to display the Player's Account */
    private _displayPlayerAccount() {
        this._winningRatio = this._winNumber / this._turn;
        stage.removeChild(this._playerCreditsLabel);
        stage.removeChild(this._jackpotMoneyLabel);
        this._jackpotMoneyLabel = new objects.Label("$" + this._jackpot.toString(),"bold 18px Cambria","#000000", 445, 228);
        this._playerCreditsLabel = new objects.Label("$" + this._playerCredits.toString(),"bold 18px Cambria","#000000", 153, 386);
        stage.addChild(this._jackpotMoneyLabel);
        stage.addChild(this._playerCreditsLabel);
    }
 
 
 
 
        //EVENT HANDLERS ++++++++++++++++++++
        
        private _bet1ButtonClick(event: createjs.MouseEvent): void {
            createjs.Sound.play("CoinSound");       // Play the coin sound on Bet1 button clicked
            console.log("Bet 1 Credit");
            this._currentBet = 1;                   // Set the current bet of player
            stage.removeChild(this._betLabel);
            this._betLabel = new objects.Label("$1", "bold 18px Cambria","#000000",378, 386);
            stage.addChild(this._betLabel);  
            this._spinButton.mouseEnabled=true;      
        }

        private _bet50ButtonClick(event: createjs.MouseEvent): void {
            createjs.Sound.play("CoinSound");           // Play the coin sound on Bet50 button clicked
            console.log("Bet 50 Credit");
            this._currentBet = 50;                     // Set the current bet of player
            stage.removeChild(this._betLabel);
            this._betLabel = new objects.Label("$50", "bold 18px Cambria","#000000",378, 386);
            stage.addChild(this._betLabel);
            this._spinButton.mouseEnabled=true;
        }

        private _bet100ButtonClick(event: createjs.MouseEvent): void {
            createjs.Sound.play("CoinSound");           // Play the coin sound on Bet100 button clicked
            console.log("Bet 100 Credit");
            this._currentBet = 100;                     // Set the current bet of player
            stage.removeChild(this._betLabel);
            this._betLabel = new objects.Label("$100", "bold 18px Cambria","#000000",378, 386);
            stage.addChild(this._betLabel); 
            this._spinButton.mouseEnabled=true;     
        }

        
    
        private _resetButtonClick(event: createjs.MouseEvent): void {
            createjs.Sound.play("ButtonPressSound");     // Play the Clicked sound on Reset button clicked
            console.log("Reset the Game!");
            this._resetAll();
            this._resetFruitWheel();
            this._displayPlayerAccount();   
        }
    
        private _shutdownButtonClick(event: createjs.MouseEvent): void {
            console.log("Shutdown the Game!");
            createjs.Sound.play("ShutdownSound");         // Play the Shut Down sound on ShutDown button clicked
        
            // Change the Scene to Game Over
            scene = config.Scene.GAME_OVER;
            changeScene();
        }
        
        private _spinButtonClick(event: createjs.MouseEvent): void {  
            if(this._currentBet==0)
                alert("Invalid Bet Amount");
            else if (this._currentBet > this._playerCredits)
            {
                this._spinButton.mouseEnabled=false;
                stage.removeChild(this._resultMsgLabel);
                this._resultMsgLabel = new objects.Label("Insufficient Money","bold 18px Cambria","#FFFFFF", 240, 100);
                stage.addChild(this._resultMsgLabel);
                alert("Insufficient Money");
            }
            else
            {
                createjs.Sound.play("SpinnerSound");        // Play the Spinner sound on SPIN button clicked
                console.log("Spin those reels!");
                console.log(this._reels());
                this._determineWinnings();
                this._displayPlayerAccount();
            }
        }
    }
}