package gameObjects;

import javax.swing.filechooser.FileSystemView;

public class Constants {

	// frame dimensions
	
	public static final int WIDTH = 1000;
	public static final int HEIGHT = 600;
	
	// player properties
	
	public static final int FIRERATE = 100;
	public static final double DELTAANGLE = 0.1;
	public static final double ACC = 0.2;
	public static final double PLAYER_MAX_VEL = 7.0;
	public static final long FLICKER_TIME = 200;
	public static final long SPAWNING_TIME = 3000;
	public static final long GAME_OVER = 3000;
	
	// laser properties
	
	public static final double LASER_VEL = 10.0;
	
	// meteor
	
	public static double METEOR_VEL = 2.0;
	public static int METEOR_SCORE = 20;
	
	// ufo properties
	
	public static final int NODE_RADIUS = 160;
	
	public static final double UFO_MASS = 60.0;
	
	public static final int UFO_MAX_VEL = 3;
	
	public static final long UFO_FIRE_RATE = 1000;
	
	public static double UFO_ANGLE_RANGE = Math.PI/2;
	
	public static int UFO_SCORE = 40;
	
	public static int UFO_SPAWN = 10;
	
	// text
	
	public static final String PLAY = "PLAY"; 
	
	public static final String EXIT = "EXIT"; 
	
	public static final int LOADING_BAR_WIDTH = 500;
	
	public static final int LOADING_BAR_HEIGHT = 50;
	
	public static final String RETURN = "RETURN";
	
	public static final String HIGH_SCORES = "HIGH SCORES";
	
	public static final String SCORE = "SCORE";
	
	public static final String DATE = "DATE";
	
	public static final String SCORE_PATH = FileSystemView.getFileSystemView().getDefaultDirectory().getPath() + "\\GTA6\\data.json";
}
