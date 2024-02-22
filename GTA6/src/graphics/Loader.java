package graphics;

import java.awt.Font;

import java.awt.FontFormatException;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;

import javax.imageio.ImageIO;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.Clip;
import javax.sound.sampled.LineUnavailableException;
import javax.sound.sampled.UnsupportedAudioFileException;

public class Loader {

	private static Clip clip;
	
	public static BufferedImage ImageLoader(String path) {
		try {
			File archivo = new File(path);
			return ImageIO.read(archivo);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public static Font loadFont(String path, int size) {
		Font font, ttfBase;
		InputStream myStream = null;
		try {
			myStream = Loader.class.getResourceAsStream(path);
            ttfBase = Font.createFont(Font.TRUETYPE_FONT, myStream);
            font = ttfBase.deriveFont(Font.PLAIN, size);
			return font;
		} catch (FontFormatException | IOException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	public static Clip loadSound(String path) {
		try {
			File file = new File(path);
			AudioInputStream ais = AudioSystem.getAudioInputStream(file);
			clip = AudioSystem.getClip();
			clip.open(ais);
			return clip;
		} catch (LineUnavailableException | IOException | UnsupportedAudioFileException e) {
			e.printStackTrace();
		}
		return null;
	}
	
}
