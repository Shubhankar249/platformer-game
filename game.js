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
            gravity: {y: 1000},
            debug: true,    // this makes the boundary border for all objects visible
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

let game_config = {
    player_speed : 150,
    player_jump: -600
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
    this.player = this.physics.add.sprite(100, 100, 'player', 4); // 4 is the default frame
    this.player.setBounce(0.25);

    // adding movement to players
    this.cursors = this.input.keyboard.createCursorKeys();  // function in phaser for keyboard press event listening

    // adding movement animations
    this.anims.create({
       key: 'left',
       frames: this.anims.generateFrameNumbers('player', {start: 0, end: 3}),
       frameRate: 10,   // 10/s
       repeat: -1
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', {start: 5, end: 8}),
        frameRate: 10,   // 10/s
        repeat: -1
    });
    this.anims.create({
        key: 'center',
        frames: [{key:'player', frame:4}],
        //frameRate: 10,   // 10/s
    });

    // adding fruits which will fall from sky
    let fruits = this.physics.add.group({
        key:'apple',
        setScale:{x:0.22,y:0.22},
        repeat: 8,
        setXY: {x:15,y:5, stepX:100}    // 8 apples 100px apart will fall from 5px Height
    })
    // adding random elasticity to each fruit
    fruits.children.iterate(f=> f.setBounce(Phaser.Math.FloatBetween(0.2, 0.6)));

    // creating more platforms
    let platforms  = this.physics.add.staticGroup();
    platforms.create(600, 350,'ground').setScale(2, 0.5).refreshBody();
    platforms.create(110, 200,'ground').setScale(1.8, 0.4).refreshBody();
    platforms.add(ground);

    // add physics to ground also for collisions
    this.physics.add.existing(ground, true);    // 2nd param is to make object static in nature does same thing as next 2 lines
    // ground.body.allowGravity = false;
    // ground.body.immovable = true;

    // add a collision detection for ground and player
    //this.physics.add.collider(ground, this.player);
    //this.physics.add.collider(ground, fruits);    // since ground is now part of platforms this line can be removed
    this.physics.add.collider(platforms, fruits);
    this.physics.add.collider(platforms, this.player);
    //this.physics.add.collider(fruits, this.player);
}

function update () {
    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-game_config.player_speed);
        this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(game_config.player_speed);
        this.player.anims.play('right', true);
    } else if (this.cursors.up.isDown && this.player.body.touching.down) { // add jump only when player is on platform
        this.player.setVelocityY(game_config.player_jump);
    } else {
        this.player.setVelocityX(0);
        this.player.anims.play('center', true);
    }
}
