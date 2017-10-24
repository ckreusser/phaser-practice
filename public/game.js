var game = new Phaser.Game(750, 400, Phaser.CANVAS, 'gameContainer');

var mainState = {
  preload: function() {
    game.load.image("tiles", "/assets/tile-sheets/castle_tileset_part1.png");
    game.load.tilemap("castle", "/assets/tile-sheets/hortest.json", Phaser.Tilemap.TILED_JSON);
  },

  create: function() {
    this.game.stage.backgroundColor = "#a9f0ff";
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.map = this.game.add.tilemap("castle");
    this.map.addTilesetImage("castle", "tiles");
    this.backgroundLayer = this.map.createLayer("backgroundLayer");
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

    this.game.physics.arcade.collide(this.player, this.walls);

  },

  restart: function() {
    game.state.start("main");
  },
};

game.state.add("main", mainState);
game.state.start("main");
