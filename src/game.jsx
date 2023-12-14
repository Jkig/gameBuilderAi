import React, { useEffect } from 'react';
import Phaser from 'phaser';
import reactLogo from './assets/react.svg'
import grassBlock from './assets/grass_block.jpg';

const GameComponent = () => {
  useEffect(() => {
    let player;
    let cursors;

    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 800 },
          debug: false,
        },
      },
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
    };

    const game = new Phaser.Game(config);

    function preload() {
      // this.load.image('ground', "nothinglol");
      // this.load.image('ground', grassBlock);
      this.load.image('player', reactLogo);
    }

    function create() {
      // Create ground
      const ground = this.physics.add.staticImage(400, 568, 'ground').setScale(2).refreshBody();

      // Create player
      player = this.physics.add.sprite(100, 450, 'player');
      player.setCollideWorldBounds(true);
      player.body.setSize(24, 32); // Adjusting collision box size

      // Collide the player with the ground
      this.physics.add.collider(player, ground);

      // Setup cursor keys for input
      cursors = this.input.keyboard.createCursorKeys();
    }

    function update() {
        // Reset player velocity
        player.setVelocityX(0);
        
        // Player movement
        if (cursors.left.isDown) {
            player.setVelocityX(-160);
        } else if (cursors.right.isDown) {
            player.setVelocityX(160);
        }
        
        // Player jump
        if (cursors.up.isDown && player.body.onFloor()) {
            player.setVelocityY(-660);
        }
    }

    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div id="game-container">
      {/* This div is where the Phaser game canvas will be rendered */}
    </div>
  );
};

export default GameComponent;
