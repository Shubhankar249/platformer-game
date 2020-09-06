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
    this.load.spritesheet('player', 'assets/dude.png', {frameWidth: 32, frameHeight:48});   // spritesheet helps to simulate movement by using mult frames for 1 img. There are 9 frames with total width of 288px=> 32each (Spritesheets can be downloaded from openGameArt.org)
    this.load.image('apple', 'assets/apple.png');
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

    // add a player obj on which gravity works
    let player = this.physics.add.sprite(100, 100, 'player', 4); // 4 is the default frame

    // adding fruits which will fall from sky
    let fruits = this.physics.add.group({
        key:'apple',
        setScale:{x:0.22,y:0.22},
        repeat: 8,
        setXY: {x:15,y:5, stepX:100}    // 8 apples 100px apart will fall from 5px Height
    })

    // add physics to ground also for collisions
    this.physics.add.existing(ground, true);    // 2nd param is to make object static in nature does same thing as next 2 lines
    // ground.body.allowGravity = false;
    // ground.body.immovable = true;

    // add a collision detection for ground and player
    this.physics.add.collider(ground, player);
    this.physics.add.collider(ground, fruits);
}

function update () {

}
