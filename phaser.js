// configuration settings
var config = {
    type: Phaser.AUTO,  // type: Phaser.AUTO/CANVAS
    width: 800,  // width/heigh of window
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',  // physics: arcade, p2, ninja, Box2D
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// instantiate new Phaser game
var game = new Phaser.Game(config);


// PRELOAD FUNCTION
function preload ()
{
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude',  // based on animation png split into frames
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 });
}


// CREATE FUNCTION
function create ()
{
    // sky and ground bodies
    this.add.image(400, 300, 'sky');  // coordinates are based on the center of the image
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();  // refreshBody changes related attributes to be scaled by 2
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    // player sprite
    player = this.physics.add.sprite(100, 450, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.body.setGravityY(300);
    this.physics.add.collider(player, platforms);  // player can collide with any platforms

    // player animation
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    // add 12 stars by adding same image repeated w/ step size
    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });
    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));  // random bounce force for each star
    });

    this.physics.add.collider(stars, platforms);
    this.physics.add.overlap(player, stars, collectStar, null, this);

    // add title to top right
    this.add.text(400, 16, 'STAR SNATCHER', {
        fontSize: '45px',
        fill: '#000'
    });

    // initialize score in bottom left
    var score = 0;
    var scoreText;
    scoreText = this.add.text(16, 550, 'Score: 0', { fontSize: '32px', fill: '#000' });

    function collectStar (player, star)
    {
        star.disableBody(true, true);  // disable body makes that body disappear from view and unable to be interacted with
        score += 10;
        scoreText.setText('Score: ' + score);

        if (stars.countActive(true) === 0)  // once all stars are collected, reset all stars and add a bomb
        {
            stars.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);  // reset stars in original positions
            });

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);  // set variable velocity for bomb
        }
    }

    bombs = this.physics.add.group();
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(player, bombs, hitBomb, null, this);

    function hitBomb (player, bomb)
    {
        this.physics.pause();  // stop physics of all bodies
        player.setTint(0xff0000);  // change player color to red
        player.anims.play('turn');
        gameOver = true;
    }
}


// UPDATE FUNCTION
function update ()
{
    cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown)  // if left arrow key is pressed
    {
        player.setVelocityX(-200);
        player.anims.play('left', true);  // show player animation of running left
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(200);
        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);
        player.anims.play('turn');  // set player to face screen
    }
    if (cursors.up.isDown && player.body.touching.down)  // make jump logic so no mid-air jumping is possible
    {
        player.setVelocityY(-450);
    }
}