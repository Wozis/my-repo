package gameObjects;

import java.awt.image.BufferedImage;

import graphics.Asserts;

public enum Size {

	BIG(2, Asserts.medsMeteors), MED(2, Asserts.smallsMeteors), SMALL(2, Asserts.tiniesMeteors), TINY(0, null);
	
	public int quantity;
	
	public BufferedImage[] textures;
	
	private Size(int quantity, BufferedImage[] textures) {
		this.quantity = quantity;
		this.textures = textures;
	}
	
}
