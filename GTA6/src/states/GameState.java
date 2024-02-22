package states;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;

import gameObjects.Chronometer;
import gameObjects.Constants;
import gameObjects.Message;
import gameObjects.Meteor;
import gameObjects.MovingObject;
import gameObjects.Player;
import gameObjects.Size;
import gameObjects.Ufo;
import graphics.Animation;
import graphics.Asserts;
import graphics.Sound;
import graphics.Text;
import input.Keyboard;
import io.JsonParser;
import io.ScoreData;
import math.Vector2D;

public class GameState extends State {
	
	public static final Vector2D PLAYER_START_POSITION = new Vector2D(Constants.WIDTH/2 - Asserts.player.getWidth()/2, Constants.HEIGHT/2 - Asserts.player.getHeight()/2);
	private Player player;
	private ArrayList<MovingObject> movingObjects = new ArrayList<MovingObject>();
	private ArrayList<Animation> explosions = new ArrayList<Animation>();
	private ArrayList<Message> message = new ArrayList<Message>();
	private Chronometer gameOverTimer;
	private Chronometer ufoSpawner;
	public static boolean gameOver;
	
	private int score = 0;
	private int lives = 3;
	
	private int meteors;
	private int waves = 1;
	
	Sound lose;
	
	public GameState() {
		player = new Player(PLAYER_START_POSITION, new Vector2D(), 7, Asserts.player, this);
		gameOverTimer = new Chronometer();
		gameOver = false;
		movingObjects.add(player);
		
		meteors = 1;
		startWave();
		
		ufoSpawner = new Chronometer();
		ufoSpawner.run(Constants.UFO_SPAWN);
		lose = new Sound(Asserts.playerLose);
	}
	
	public void update() {
		if(!Keyboard.PAUSE) {
			for(int i=0; i < movingObjects.size(); i++) {
				MovingObject mo = movingObjects.get(i);
				
				mo.update();
				if(mo.isDead()) {
					movingObjects.remove(i);
					i--;
				}
			}
			
			for(int i=0; i < explosions.size(); i++) {
				Animation animation = explosions.get(i);
				animation.update();
				if(!animation.isRunning()) {
					explosions.remove(i);
				}
			}
			
			for(int i=0; i < movingObjects.size(); i++) {
				if(movingObjects.get(i) instanceof Meteor) {
					return;
				}
			}
			
			if(!ufoSpawner.isRunning()) {
				ufoSpawner.run(Constants.UFO_SPAWN);
				spawnUfo();
			}
			
			startWave();
		}
	}
	
	public void draw(Graphics g) {
		Graphics2D g2d = (Graphics2D) g;
		g2d.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
		
		for(int i = 0; i < message.size(); i++) {
			message.get(i).draw(g2d);
			if(message.get(i).isDead()) {
				message.remove(i);
			}
		}
		
		for(int i=0; i < movingObjects.size(); i++) {
			movingObjects.get(i).draw(g);
		}
		
		for(int i=0; i < explosions.size(); i++) {
			Animation animation = explosions.get(i);
			g2d.drawImage(animation.getCurrentFrame(), (int)animation.getPosition().getX(), (int)animation.getPosition().getY(), null);
		}
		
		drawScore(g);
		drawLife(g);
	}
	
	public ArrayList<MovingObject> getMovingObjects(){
		return movingObjects;
	}
	
	private void startWave() {
		message.add(new Message(new Vector2D(Constants.WIDTH/2, Constants.HEIGHT/2), true, "WAVE " + waves, Color.WHITE, true, Asserts.fontBig, this));
		
		double x, y;
		for(int i=0; i < meteors; i++) {
			x = i % 2 == 0 ? Math.random()*Constants.WIDTH : 0;
			y = i % 2 == 0 ? 0 : Math.random()*Constants.HEIGHT;
			
			BufferedImage texture = Asserts.bigsMeteors[(int)(Math.random()*Asserts.bigsMeteors.length)];
			
			movingObjects.add(new Meteor(
					new Vector2D(x, y),
					new Vector2D(0,1).setDirection(Math.random()*Math.PI*2),
					Constants.METEOR_VEL*Math.random() + 1,
					texture,
					this,
					Size.BIG
					));
		}
		meteors ++;
		waves++;
		spawnUfo();
	}
	
	public void divideMeteor(Meteor meteor) {
		Size size = meteor.getSize();
		
		BufferedImage[] textures = size.textures;
		
		Size newSize = null;
		
		switch(size) {
		case BIG:
			newSize = Size.MED;
			break;
		case MED:
			newSize = Size.SMALL;
			break;
		case SMALL:
			newSize = Size.TINY;
			break;
		default:
			return;
		}
		
		for(int i=0; i < size.quantity; i++) {
			movingObjects.add(new Meteor(
					meteor.getPosition(),
					new Vector2D(0,1).setDirection(Math.random()*Math.PI*2),
					Constants.METEOR_VEL*Math.random() + 1,
					textures[(int)(Math.random()*textures.length)],
					this,
					newSize
					));
		}
	}
	
	public void playExplosion(Vector2D position) {
		explosions.add(new Animation(
				Asserts.explosions,
				50,
				position.subtract(new Vector2D(Asserts.explosions[0].getWidth()/2, Asserts.explosions[0].getHeight()/2))
				));
	}
	
	private void spawnUfo() {
		int rand = (int) (Math.random()*2);
		
		double x = rand == 0 ? (Math.random()*Constants.WIDTH) : 0;
		double y = rand == 0 ? 0 : (Math.random()*Constants.HEIGHT);
		
		ArrayList<Vector2D> path = new ArrayList<Vector2D>();
		
		double posX, posY;
		
		posX = Math.random()*Constants.WIDTH/2;
		posY = Math.random()*Constants.HEIGHT/2;
		path.add(new Vector2D(posX, posY));
		
		posX = Math.random()*Constants.WIDTH/2 + Constants.WIDTH/2;
		posY = Math.random()*Constants.HEIGHT/2;
		path.add(new Vector2D(posX, posY));
		
		posX = Math.random()*Constants.WIDTH/2;
		posY = Math.random()*Constants.HEIGHT/2 + Constants.HEIGHT/2;
		path.add(new Vector2D(posX, posY));
		
		posX = Math.random()*Constants.WIDTH/2 + Constants.WIDTH/2;
		posY = Math.random()*Constants.HEIGHT/2 + Constants.HEIGHT/2;
		path.add(new Vector2D(posX, posY));
		
		movingObjects.add(new Ufo(
				new Vector2D(x, y),
				new Vector2D(),
				Constants.UFO_MAX_VEL,
				Asserts.enemy,
				path,
				this
				));
	}
	
	public Player getPlayer() {
		return player;
	}
	
	public void addScore(int value, Vector2D position) {
		score += value;
		message.add(new Message(position, true, "+ " + value, Color.WHITE, false, Asserts.fontMed, this));
	}
	
	private void drawScore(Graphics g) {
		Vector2D pos = new Vector2D(850, 25);
		
		String scoreToString = Integer.toString(score);
		
		for (int i = 0; i < scoreToString.length(); i++) {
			g.drawImage(Asserts.life[Integer.parseInt(scoreToString.substring(i, i+1))], (int)pos.getX(), (int)pos.getY(), null);
			pos.setX(pos.getX() + 20);
		}
		
	}
	
	private void drawLife(Graphics g) {
		if(lives < 1) {
			return;
		}
		
		Vector2D pos = new Vector2D(75, 30);
		Vector2D posImg = new Vector2D(25, 25);
		
		String lifesToString = Integer.toString(lives);
		
		g.drawImage(Asserts.icon, (int)posImg.getX(), (int) posImg.getY(), null);
		
		for (int i = 0; i < lifesToString.length(); i++) {
			g.drawImage(Asserts.life[Integer.parseInt(lifesToString.substring(i, i+1))], (int)pos.getX(), (int)pos.getY(),null);
		}
	}
	
	public boolean subtractLife() {
		lives--;
		return lives > 0;
	}
	
	public ArrayList<Message> getMessage() {
		return message;
	}
	
	public void gameOver() {
		lose.play();
		Message gameOverMsg = new Message(
				PLAYER_START_POSITION,
				true,
				"GAME OVER",
				Color.WHITE,
				true,
				Asserts.fontBig,
				this
				);
		
		this.message.add(gameOverMsg);
		gameOverTimer.run(Constants.GAME_OVER);
		gameOver = true;
		try {
			ArrayList<ScoreData> dataList = JsonParser.readFile();
			
			dataList.add(new ScoreData(score));
			JsonParser.rideFile(dataList);
			
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		State.changeState(new MenuState());
	}
	
 }
