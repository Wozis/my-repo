package uiPackage;

import java.awt.Color;
import java.awt.Graphics;
import java.awt.Rectangle;
import java.awt.image.BufferedImage;

import graphics.Asserts;
import graphics.Text;
import input.Mouse;
import math.Vector2D;

public class Buttons {

	private BufferedImage mouseOutImage;
	private BufferedImage mouseInImage;
	private boolean mouseIn;
	private Rectangle boudingBox;
	private Action action;
	private String text;
	
	public Buttons(BufferedImage mouseOutImage, BufferedImage mouseInImage, int x, int y, String text, Action action) {
		this.mouseOutImage = mouseOutImage;
		this.mouseInImage = mouseInImage;
		this.text = text;
		this.action = action;
		boudingBox = new Rectangle(x, y, mouseInImage.getWidth(), mouseInImage.getHeight());
	}
	
	public void update() {
		if(boudingBox.contains(Mouse.X, Mouse.Y)) {
			mouseIn = true;
		} else { 
			mouseIn = false;
		}
		
		if(mouseIn && Mouse.MLB) {
			action.doAction();
		}
	}
	
	public void draw(Graphics g) {
		if(mouseIn) {
			g.drawImage(mouseInImage, boudingBox.x, boudingBox.y, null);
		} else {
			g.drawImage(mouseOutImage, boudingBox.x, boudingBox.y, null);
		}
		
		Text.drawText(
				g, 
				text, 
				new Vector2D(
						boudingBox.getX() + boudingBox.getWidth() / 2,
						boudingBox.getY() + boudingBox.getHeight()), 
				true, 
				Color.BLACK, 
				Asserts.fontMed);
	}
	
}
