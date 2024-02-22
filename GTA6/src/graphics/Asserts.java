package graphics;

import java.awt.Font;
import java.awt.image.BufferedImage;

import javax.sound.sampled.Clip;

public class Asserts {
	
	public static boolean loaded = false;
	public static float count = 0;
	public static float MAX_COUNT = 460;
	
	//player
	
	public static BufferedImage player, icon, greyButton, blueButton;
	
	public static BufferedImage[] life = new BufferedImage[11];
	
	//effects
	
	public static BufferedImage speed;
	
	//laser
	
	public static BufferedImage laserRed, laserGreen, laserBlue;
	
	//meteors
	
	public static BufferedImage[] bigsMeteors = new BufferedImage[4];
	
	public static BufferedImage[] medsMeteors = new BufferedImage[2];
	
	public static BufferedImage[] smallsMeteors = new BufferedImage[2];
	
	public static BufferedImage[] tiniesMeteors = new BufferedImage[2];
	
	//explosions
	
	public static BufferedImage[] explosions = new BufferedImage[8];
	
	//enemy
	
	public static BufferedImage enemy;
	
	//fonts
	
	public static Font fontBig, fontMed;
	
	//sounds
	
	public static Clip backgroundMusic, explosion, playerLose, playerShoot, ufoShoot;
	
	public static void init() {
		player = loadImage("res/ships/playerShip1_blue.png");
		
		speed = loadImage("res/turbo_effects/fire08.png");
		
		laserRed = loadImage("res/laser/laserRed01.png");
		
		laserGreen = loadImage("res/laser/laserGreen11.png");
		
		laserBlue = loadImage("res/laser/laserBlue01.png");
		
		for(int i=0; i < bigsMeteors.length; i++) {
			bigsMeteors[i] = loadImage("res/meteors/meteorGrey_big" + (i + 1) + ".png");
		}
		
		for(int i=0; i < medsMeteors.length; i++) {
			medsMeteors[i] = loadImage("res/meteors/meteorGrey_med" + (i + 1) + ".png");
		}
		
		for(int i=0; i < smallsMeteors.length; i++) {
			smallsMeteors[i] = loadImage("res/meteors/meteorGrey_small" + (i + 1) + ".png");
		}
		
		for(int i=0; i < tiniesMeteors.length; i++) {
			tiniesMeteors[i] = loadImage("res/meteors/meteorGrey_tiny" + (i + 1) + ".png");
		}
		
		for(int i=0; i < explosions.length; i++) {
			explosions[i] = loadImage("res/explosions/" + i + ".png");
		}
		
		enemy = loadImage("res/enemis/ufoRed.png");
		
		for(int i=0; i < life.length; i++) {
			life[i] = loadImage("res/numbers/numeral" + i + ".png");
		}
		
		icon = loadImage("res/numbers/playerLife1_blue.png");
		
		//font
		
		fontBig = loadFont("/resources/font.ttf", 42);
		
		fontMed = loadFont("/resources/font.ttf" , 20);
		
		//sound
		
		backgroundMusic = loadSound("src/sounds/backgroundMusic.wav");
		
		explosion = loadSound("src/sounds/explosion.wav");
		
		playerLose = loadSound("src/sounds/playerLoose.wav");
		
		playerShoot = loadSound("src/sounds/playerShoot.wav");
		
		ufoShoot = loadSound("src/sounds/ufoShoot.wav");
		
		//menu
		
		greyButton = loadImage("res/ui/grey_button03.png");
		
		blueButton = loadImage("res/ui/blue_button00.png");
		
		loaded = true;

	}
	
	public static BufferedImage loadImage(String path) {
		count++;
		return Loader.ImageLoader(path);
	}
	
	public static Font loadFont(String path, int size) {
		count++;
		return Loader.loadFont(path, size);
	}
	
	public static Clip loadSound(String path) {
		count++;
		return Loader.loadSound(path);
	}
 	
}
