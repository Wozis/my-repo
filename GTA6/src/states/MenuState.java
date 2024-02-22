package states;

import java.awt.Button;
import java.awt.Graphics;
import java.util.ArrayList;

import uiPackage.Action;
import uiPackage.Buttons;
import gameObjects.Constants;
import graphics.Asserts;
import graphics.Sound;

public class MenuState extends State {

	public ArrayList<Buttons> buttons;
	
	public static Sound music;
	
	public MenuState() {
		music = new Sound(Asserts.backgroundMusic);
		music.play();
		music.downSound(0.7f);
		
		buttons = new ArrayList<Buttons>();
		
		buttons.add(new Buttons(
				Asserts.greyButton,
				Asserts.blueButton,
				Constants.WIDTH / 2 - Asserts.greyButton.getWidth()/2,
				Constants.HEIGHT / 2 - Asserts.greyButton.getHeight() * 2,
				Constants.PLAY,
				new Action() {
					@Override
					public void doAction() {
						State.changeState(new GameState());
						music.stop();
					}
				}
				));
		
		buttons.add(new Buttons(
				Asserts.greyButton,
				Asserts.blueButton,
				Constants.WIDTH / 2 - Asserts.greyButton.getWidth()/2,
				Constants.HEIGHT / 2 + Asserts.greyButton.getHeight() * 2,
				Constants.EXIT,
				new Action() {
					@Override
					public void doAction() {
						System.exit(0);
					}
				}
				));
		
		buttons.add(new Buttons(
				Asserts.greyButton,
				Asserts.blueButton,
				Constants.WIDTH / 2 - Asserts.greyButton.getWidth()/2,
				Constants.HEIGHT / 2,
				Constants.HIGH_SCORES,
				new Action() {
					@Override
					public void doAction() {
						State.changeState(new ScoreState());
					}
				}
				));
	}
	
	@Override
	public void update() {
		for(Buttons b: buttons) {
			b.update();
		}
	}

	@Override
	public void draw(Graphics g) {
		for(Buttons b: buttons) {
			b.draw(g);
		}
	}
	
	

}
