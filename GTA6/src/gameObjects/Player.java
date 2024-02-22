package gameObjects;

import java.awt.Graphics;

import java.awt.Graphics2D;
import java.awt.geom.AffineTransform;
import java.awt.image.BufferedImage;

import graphics.Asserts;
import graphics.Loader;
import graphics.Sound;
import input.Keyboard;
import input.Mouse;
import main.Window;
import math.Vector2D;
import states.GameState;
import states.MenuState;
import states.State;

public class Player extends MovingObject {

	private Vector2D heading;
	private Vector2D aceleration;
	private final double DELTAANGLE = 0.1;
	private boolean acelerating = false;
	private Chronometer fireRate;
	
	private boolean spawning, visible;
	private Chronometer spawnTime, flickerTime;
	
	private Sound shoot;
	
	public Player(Vector2D position, Vector2D velocity, double maxVel, BufferedImage texture, GameState gameState) {
		super(position, velocity, maxVel,  texture, gameState);
		heading = new Vector2D(0, 1);
		aceleration = new Vector2D();
		fireRate = new Chronometer();
		spawnTime = new Chronometer();
		flickerTime = new Chronometer();
		shoot = new Sound(Asserts.playerShoot);
	}

	@Override
	public void update() {	
		if(!spawnTime.isRunning()) {
			spawning = false;
			visible = true;
		}
		
		if(spawning) {
			if(!flickerTime.isRunning()) {
				flickerTime.run(Constants.FLICKER_TIME);
				visible = !visible;
			}
		}
		
		if(Keyboard.ESC) {

		}
		
		if(Mouse.SHOOT && !fireRate.isRunning() && !spawning) {
			gameState.getMovingObjects().add(0,new Laser(
					getCenter().add(heading.scale(width)),
					heading,
					Constants.LASER_VEL,
					angle,
					Asserts.laserBlue,
					gameState
					));
			fireRate.run(Constants.FIRERATE);
			shoot.play();
		}
		
		if(Keyboard.RIGHT) {
			angle += DELTAANGLE;
		}
		if(Keyboard.LEFT) {
			angle -= DELTAANGLE;
		}
		if(Keyboard.UP) {
			aceleration = heading.scale(Constants.ACC);
			acelerating = true;
		} else {
			if(velocity.getMagnitude()!=0) {
				aceleration = (velocity.scale(-1).normalize()).scale(Constants.ACC/2);
			}
			acelerating = false;
		}
		
		velocity = velocity.add(aceleration);
		
		velocity = velocity.limit(maxVel);
		
		heading = heading.setDirection(angle - Math.PI/2);
		
		position = position.add(velocity);
		
		if(position.getX()> Constants.WIDTH) {
			position.setX(0);
		}
		if(position.getY()> Constants.HEIGHT) {
			position.setY(0);
		}
		if(position.getX()<0) {
			position.setX(Constants.WIDTH);
		}
		if(position.getY()<0) {
			position.setY(Constants.HEIGHT);
		}
		
		fireRate.update();
		spawnTime.update();
		flickerTime.update();
		collidesWith();
	}

	@Override
	public void draw(Graphics g) {
		if(!visible) {
			return;
		}
		
		Graphics2D g2d = (Graphics2D) g;
		
		AffineTransform atEffect = AffineTransform.getTranslateInstance(position.getX() + width/2 + 5, position.getY() + height/2 + 10);
		
		AffineTransform atEffect2 = AffineTransform.getTranslateInstance(position.getX() + 5, position.getY() + height/2 + 10);
		
		atEffect.rotate(angle, -5, -10);
		
		atEffect2.rotate(angle, width/2 -5, -10);
		
		if(acelerating) {
			g2d.drawImage(Asserts.speed, atEffect, null);
			
			g2d.drawImage(Asserts.speed, atEffect2, null);
		}
		
		at = AffineTransform.getTranslateInstance(position.getX(), position.getY());
		
		at.rotate(angle, width/2, height/2);
		
		g2d.drawImage(texture, at , null);
	}
	
	@Override
	public void Destroy() {
		spawning = true;
		spawnTime.run(Constants.SPAWNING_TIME);
		if(!gameState.subtractLife()) {
			gameState.gameOver();
			super.Destroy();
		}
		resetValues();
	}

	public boolean isSpawning() {
		return spawning;
	}
	
	private void resetValues() {
		angle = 0;
		velocity = new Vector2D();
		position = new Vector2D(Constants.WIDTH/2 - Asserts.player.getWidth()/2, Constants.HEIGHT/2 - Asserts.player.getHeight()/2);
	}
}
