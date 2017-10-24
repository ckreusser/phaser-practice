var game = new Phaser.Game(750, 400, Phaser.CANVAS, 'gameContainer');

var mainState = {
  preload: function() {
    this.game.load.tilemap("tilemap", "assets/tile-sheets/test-level.json", null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image("tiles", "assets/tile_sheets/castle_tile_set_part1.png");
  },
  create: function() {
    this.game.stage.backgroundColor = "#a9f0ff";
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.map = this.game.add.tilemap("tilemap");
    this.map.addTilesetImage("tiles32", "tiles");
    this.backgroundlayer = this.map.createLayer("backgroundLayer");
    this.groundLayer = this.map.createLayer("groundLayer");
    this.map.setCollisionBetween(1, 100, true, "groundLayer");
    this.groundLayer.resizeWorld();
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
