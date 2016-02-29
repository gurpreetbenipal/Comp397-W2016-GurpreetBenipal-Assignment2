// SLOT_MACHINE SCENE

module scenes {
    export class SlotMachine extends objects.Scene {
        
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        
        /* Declaration of Buttons */
        private _slotmachineImage: createjs.Bitmap;
        private _bet1Button: objects.Button;
        private _bet50Button: objects.Button;
        private _bet100Button: objects.Button;
        private _spinButton: objects.Button;
        private _resetButton: objects.Button;
        private _shutdownButton: objects.Button;

        /* Declaration of Text Labels */
        private _resultMsgLabel: objects.Label;
        private _betLabel: objects.Label;
        private _playerCreditsLabel: objects.Label;
        private _spinResultLabel: objects.Label;
        private _jackpotMoneyLabel: objects.Label;

        /* Declaration of Fruit Tally Variables */
        private _grapes : number = 0;
        private _bananas : number = 0;
        private _oranges : number = 0;
        private _cherries : number = 0;
        private _bars : number = 0;
        private _bells : number = 0;
        private _sevens : number = 0;
        private _blanks : number = 0;

        /* Declaration of Monetary Variables */
        private _currentBet: number = 0;
        private _win: number = 0;
        private _playerCredits: number = 1000;
        private _jackpot: number = 5000;
        

        /* Declaration of Bitmap Variable */
        private _reels : createjs.Bitmap[];
        private _smiley : createjs.Bitmap;
        
        private _betline:string[] = ["", "", ""];
        


        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }
        
        // PUBLIC METHODS +++++++++++++++++++++
        
        // Start Method
        public start(): void {
           
           // Reset all Monetary values
            this._resetAll();
            
            // add background image to the scene
            this._slotmachineImage = new createjs.Bitmap(assets.getResult("SlotMachine"));
            this.addChild(this._slotmachineImage);

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
            this._shutdownButton = new objects.Button("ShutdownButton", 430, 271, false);
            this.addChild(this._shutdownButton);
            this._shutdownButton.on("click", this._shutdownButtonClick, this); 
        
            // add SpinResult Label to the scene
            this._spinResultLabel = new objects.Label("$" + this._currentBet.toString(), "bold 16px Cambria", "#000000", 298, 378, false);
            this._spinResultLabel.textAlign = "right";
            this.addChild(this._spinResultLabel);
        
            //add Jackpot Label to the scene
            this._jackpotMoneyLabel = new objects.Label("$" + this._jackpot.toString(), "bold 16px Cambria", "#000000", 476, 219, false);
            this._jackpotMoneyLabel.textAlign = "right";
            this.addChild(this._jackpotMoneyLabel); 
           
            // add Player Credits Label to the scene
            this._playerCreditsLabel = new objects.Label("$" + this._playerCredits.toString(), "bold 16px Cambria", "#000000", 188, 378, false);
            this._playerCreditsLabel.textAlign = "right";
            this.addChild(this._playerCreditsLabel);
        
            //add Bet Label to the scene
            this._betLabel = new objects.Label("$" + this._currentBet.toString(), "bold 16px Cambria", "#000000", 411, 378, false);
            this._betLabel.textAlign = "right";
            this.addChild(this._betLabel);
            
            //add Result Message Label to the scene
            this._resultMsgLabel = new objects.Label("Welcome to the Game", "bold 18px Cambria", "#FFFFFF", 330, 100, true);
            this._resultMsgLabel.textAlign = "center";
            this.addChild(this._resultMsgLabel);
            
            // Initialize Array of Reels 
            this._initializeReelsArray();
            
            //Initialize the Smiley Images
            this._smiley =  new createjs.Bitmap(assets.getResult("HappySmiley"));
            this._smiley.x = 428;
            this._smiley.y = 38;
            this.addChild(this._smiley);
            
            // add this scene to the global stage container
            stage.addChild(this);
        }

        // SLOT_MACHINE Scene updates here
        public update(): void {

        }
        /* Method to initialize the Bitmap Array */
        private _initializeReelsArray(): void {
            this._reels = new Array<createjs.Bitmap>();
            
            /* Iterate over all the 3 Reels */
            for (var i: number = 0; i < config.Game.REELS; i++) {
                this._reels[i] = new createjs.Bitmap(assets.getResult("blank"));    // Set all the 3 Reel images to blank
                this._reels[i].x = 108 + (i * 94);
                this._reels[i].y = 190;
                this.addChild(this._reels[i]);
                console.log("reel" + i + " " + this._reels[i]);
            }
        }
        
        //PRIVATE METHODS
        /* Utility function to check if a value falls within a range of bounds */
        private _checkRange(value: number, lowerBounds: number, upperBounds: number): number {
            return (value >= lowerBounds && value <= upperBounds) ? value : -1;
        }
        
        /* When this function is called it determines the betLine results.
        e.g. Cherry - Bells - Orange */
        private _spinReels(): string[] {
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
            this._currentBet = 0;
            this._playerCredits = 1000;
            this._jackpot = 5000;
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
                this._displayWinMessage();

            }
            else {
                this._displayLossMessage();
            }

        }

        /* Method to display the Win message and amount. And also check for the Jackpot */
        private _displayWinMessage(): void {
            console.log("Win");
            this._playerCredits += this._win;
            this._resultMsgLabel.color = "#FFFFFF";
            this._resultMsgLabel.text = "You Won";
            this._smiley.image = assets.getResult("WinSmiley");
            this._checkForJackPot();
            this._spinResultLabel.text = "+$" + this._win.toString();
            this._resetFruitWheel();
        }

        /* Method to display the Loss message and amount */
        private _displayLossMessage(): void {
            console.log("Loss");
            this._resultMsgLabel.color = "#FFFFFF";
            this._resultMsgLabel.text = "You Loss";
            this._smiley.image = assets.getResult("SadSmiley");
            this._spinResultLabel.text = "-$" + this._currentBet.toString();
            this._resetFruitWheel();
        }

        /* Check whether the player won the Jackpot or not */
        private _checkForJackPot() {
            /* Compare 2 Random numbers */
            var random1 = Math.floor(Math.random() * 51 + 1);
            var random2 = Math.floor(Math.random() * 51 + 1);

            if (random1 == random2) {                                           // If both random numbers are same, the player won the Jackpot
                console.log("Jackpot Won")
                createjs.Sound.play("JackpotWinSound");                         // Play the Jackpot Win Sound
                this._smiley.image = assets.getResult("JackpotSmiley");
                this._resultMsgLabel.color = "#FFCC00";                         // Change the color of Result Message Label to Yellow
                this._resultMsgLabel.text = "Congrats! You Won a Jackpot";      //Change the Text of Result Message Label
                this._playerCredits += this._jackpot;                           // Add the Jackpot Money to the Player Credits
                this._win += this._jackpot;                                     // Add the Jackpot Money to the Winnings of player
                this._jackpot = 5000;                                           // Again reset the Jackpot Money to 5000
            }
        }
    
        /* Method to display the Player's Account */
        private _displayPlayerAccount() {
            // reset player's bet to zero
            this._currentBet = 0;
            this._win = 0;
            this._betLabel.text = "$" + this._currentBet.toString();             //Display the current bet amount in the Bet Label
            this._jackpotMoneyLabel.text = "$" + this._jackpot.toString();       //Display the jackpot amount in the Jacpot Label
            this._playerCreditsLabel.text = "$" + this._playerCredits.toString();//Display the Player's Credit amount in the Player's Credits Label

        }

        private _makeBet(betAmount: number): void {
            this._spinResultLabel.text = "$" + this._win.toString();
            this._resultMsgLabel.text = "SPIN THE REEL";
            this._smiley.image = assets.getResult("HappySmiley");                          // Change the smiley image
            
            if (betAmount <= this._playerCredits) {
                createjs.Sound.play("CoinSound");                                           // Play the coin sound on button clicked
                console.log("Bet " + betAmount + " Credit");
                this._currentBet += betAmount;                                              // Set the current bet of player
                this._playerCredits -= betAmount;                                           // Deduct the Bet Amount from the Player's Credits
                this._betLabel.text = "$" + this._currentBet.toString();                    // Display the Bet Amount in the Current Bet Label
                this._playerCreditsLabel.text = "$" + this._playerCredits.toString();       // Display the updated Player Credits      
                this._spinButton.mouseEnabled = (this._spinButton.mouseEnabled == false) ? true : this._spinButton.mouseEnabled;
            }
            /* If the Player is betting more than his/her Credit limit that display an alert message */
            else {  
                this._resultMsgLabel.color = "#FFFFFF";
                this._resultMsgLabel.text = "Insufficient Money";
                alert("Insufficient Money");
            }
        }
        
        //EVENT HANDLERS ++++++++++++++++++++
        
        private _bet1ButtonClick(event: createjs.MouseEvent): void {
            this._makeBet(1);
        }

        private _bet50ButtonClick(event: createjs.MouseEvent): void {
            this._makeBet(50);
        }

        private _bet100ButtonClick(event: createjs.MouseEvent): void {
            this._makeBet(100);
        }

        private _resetButtonClick(event: createjs.MouseEvent): void {
            createjs.Sound.play("ButtonPressSound");     // Play the Clicked sound on Reset button clicked
            console.log("Reset the Game!");
            this._spinButton.mouseEnabled = (this._spinButton.mouseEnabled == false) ? true : this._spinButton.mouseEnabled;
            this._resetAll();
            this._resetFruitWheel();
            this._displayPlayerAccount();
            this._spinResultLabel.text = "$" + this._win.toString();        // Show the winning amount in the Spin Result Text Label
            this._resultMsgLabel.text = "Welcome Again";
            this._smiley.image = assets.getResult("HappySmiley");           // Change the smiley image
            
            /* Interate over the reels and display blank images in all the reels */
            for (var i = 0; i < config.Game.REELS; i++) {
                        this._reels[i].image = assets.getResult("blank");
                    }
        }

        private _shutdownButtonClick(event: createjs.MouseEvent): void {
            console.log("Shutdown the Game!");
            createjs.Sound.play("ShutdownSound");         // Play the Shut Down sound on ShutDown button clicked
        
            // Change the Scene to Game Over
            scene = config.Scene.GAME_OVER;
            changeScene();
        }

        private _spinButtonClick(event: createjs.MouseEvent): void {
            var spinner: number = 0;
            var reel: number[] = [0, 0, 0];
            
            /* Ensure that the Bet Amount is not equal to 0 */
            if (this._currentBet == 0)
                alert("Invalid Bet Amount");
            else {                                  // If Bet Amount is not zero then do this
                this._disableAllButtons();
                createjs.Sound.play("SpinnerSound");      // Play the Spinner sound on SPIN button clicked
                var spinInterval: number = setInterval(() => {
                    for (var i = 0; i < config.Game.REELS; i++) {
                        reel[i] = Math.floor(Math.random() * 8 + 1);        // Generate a random number between 1 to 8
                        this._reels[i].image = assets.getResult(reel[i].toString());  // Show that image whose number is generated
                    }
                    spinner += 1;
                    if (spinner >= 60)
                        clearInterval(spinInterval);        // Clear the interval time
                }, 100);                    // 60 * 100 = 6000 = 6 sec (It means the spinner will spin upto 6 sec)

                var bitmap: string[] = this._spinReels();

                setTimeout(() => {
                    console.log("Spin those reels!");
                    console.log(bitmap);
                    // Iterate over the number of reels
                    for (var i = 0; i < config.Game.REELS; i++) {
                        this._reels[i].image = assets.getResult(bitmap[i]);     // Show the actual resultant images in the reel
                    }
                    this._determineWinnings();          
                    this._displayPlayerAccount();
                     this._enableAllButtons();
                }, 6000);
               
            }   
        }
        
        /* Method to disable all the buttons while spinning the reel */
        private _disableAllButtons():void{
                this._bet1Button.mouseEnabled = false;
                this._bet50Button.mouseEnabled = false;
                this._bet100Button.mouseEnabled = false;
                this._resetButton.mouseEnabled = false;
                this._spinButton.mouseEnabled = false;
           }
           
        /* Method to enable all the buttons after spinning the reel */
        private _enableAllButtons():void{
                this._bet1Button.mouseEnabled = true;
                this._bet50Button.mouseEnabled = true;
                this._bet100Button.mouseEnabled = true;
                this._resetButton.mouseEnabled = true;
                this._spinButton.mouseEnabled = true;
           }

    }
}