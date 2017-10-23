var game = new Phaser.Game(750, 400, Phaser.CANVAS, 'gameContainer');

var mainState = {
  preload: function() {
    game.load.image("player", "assets/player.png");
    game.load.image("wall", "assets/wall.png");
    game.load.image("coin", "assets/coin.png");
    game.load.image("enemy", "assets/enemy.png");
  },
  create: function() {
    game.stage.backgroundColor = "#3598db";
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.enableBody = true;
    this.cursors = game.input.keyboard.createCursorKeys();
    this.player = game.add.sprite(70, 100, "player");
    this.player.body.gravity.y = 600;

    this.walls = game.add.group();
    this.coins = game.add.group();
    this.enemies = game.add.group();

    var level = [
    'xxxxxxxxxxxxxxxxxxxxxx',
    '!         !          x',
    '!                 o  x',
    '!         o          x',
    '!                    x',
    '!                    x',
    '!                    x',
    '!                    x',
    '!                    x',
    '!                    x',
    '!                    x',
    '!     o   !    x     x',
    'xxxxxxxxxxxxxxxx!!!!!x',
    ];

    for (var i = 0; i < level.length; i++) {
      for (var j = 0; j < level[i].length; j++) {
        if (level[i][j] == 'x') {
          var wall = game.add.sprite(30+20*j, 30+20*i, 'wall');
          this.walls.add(wall);
          wall.body.immovable = true;
        }
        else if (level[i][j] == 'o') {
          var coin = game.add.sprite(30+20*j, 30+20*i, 'coin');
          this.coins.add(coin);
        }
        else if (level[i][j] == '!') {
          var enemy = game.add.sprite(30+20*j, 30+20*i, 'enemy');
          this.enemies.add(enemy);
        }
      }
    }
  },
  update: function() {
    if (this.cursors.left.isDown)
    this.player.body.velocity.x = -200;
    else if (this.cursors.right.isDown)
      this.player.body.velocity.x = 200;
    else
      this.player.body.velocity.x = 0;

    if (this.cursors.up.isDown && this.player.body.touching.down)
      this.player.body.velocity.y = -250;

    game.physics.arcade.collide(this.player, this.walls);
    game.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);
    game.physics.arcade.overlap(this.player, this.enemies, this.restart, null, this);
  },
  takeCoin: function(player, coin) {
    coin.kill();
  },
  restart: function() {
    game.state.start("main");
  },
};

game.state.add("main", mainState);
game.state.start("main");
