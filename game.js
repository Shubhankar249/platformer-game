let config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,     // there are different options for screen size in Phaser.Scale
        width: 800,
        height: 600
    },
    physics: {  // physics engine provided by Phaser for laws of motion
        default: 'arcade',
        arcade: {
            gravity: {y:1000}
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

let game = new Phaser.Game(config);

function preload() {
    this.load.image('ground', 'assets/topground.png');
    this.load.image('sky', 'assets/background.png');
    // this.load.image('ground', 'assets/topground.png');
    // this.load.image('ground', 'assets/topground.png');
    // this.load.image('ground', 'assets/topground.png');
    // this.load.image('ground', 'assets/topground.png');
    // this.load.image('ground', 'assets/topground.png');
}

function create() {
    let W = game.config.width, H = game.config.height;

    // let ground = this.add.sprite(0, H-128, 'ground');   // since co-ordinates r of centre of img
    let ground = this.add.tileSprite(0, H-128, W, 128, 'ground');   // fill whole W with given img
    ground.setOrigin(0, 0);    // makes image centre as topLeft

    let sky = this.add.sprite(0, 0, 'sky');
    sky.setOrigin(0, 0);
    sky.displayWidth = W; sky.displayHeight = H-128;


}

function update () {

}
