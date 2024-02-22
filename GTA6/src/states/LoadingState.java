package states;

import java.awt.Color;
import java.awt.Font;
import java.awt.GradientPaint;
import java.awt.Graphics;
import java.awt.Graphics2D;

import gameObjects.Constants;
import graphics.Asserts;
import graphics.Loader;
import graphics.Text;
import math.Vector2D;

public class LoadingState extends State {

	private Thread loadingThread;
	private Font font;
	
	public LoadingState(Thread loadingThread) {
		this.loadingThread = loadingThread;
		loadingThread.start();
		font = Loader.loadFont("/fonts/font.ttf", 38);
	}
	
	@Override
	public void update() {
		if(Asserts.loaded) {
			State.changeState(new MenuState());
			try {
				loadingThread.join();
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

	@Override
	public void draw(Graphics g) {
		GradientPaint gp = new GradientPaint(
				Constants.WIDTH / 2 - Constants.LOADING_BAR_WIDTH / 2,
				Constants.HEIGHT / 2 - Constants.LOADING_BAR_HEIGHT / 2,
				Color.WHITE,
				Constants.WIDTH / 2 + Constants.LOADING_BAR_WIDTH / 2,
				Constants.HEIGHT / 2 + Constants.LOADING_BAR_HEIGHT / 2,
				Color.BLUE
				);
		
		Graphics2D g2d = (Graphics2D) g;
		g2d.setPaint(gp);
		
		float precentage = Asserts.count / Asserts.MAX_COUNT;
		
		g2d.fillRect(Constants.WIDTH / 2 - Constants.LOADING_BAR_WIDTH / 2, 
				Constants.HEIGHT /2 - Constants.LOADING_BAR_HEIGHT /2, 
				(int) (Constants.LOADING_BAR_WIDTH * precentage), 
				Constants.LOADING_BAR_HEIGHT);
		
		g2d.drawRect(Constants.WIDTH / 2 - Constants.LOADING_BAR_WIDTH / 2, 
				Constants.HEIGHT /2 - Constants.LOADING_BAR_HEIGHT /2, 
				Constants.LOADING_BAR_WIDTH, 
				Constants.LOADING_BAR_HEIGHT);
		
		Text.drawText(g2d, "CARGANDO...", new Vector2D(Constants.WIDTH / 2, Constants.HEIGHT / 2 + 40), true, Color.WHITE, font);
	}

}
