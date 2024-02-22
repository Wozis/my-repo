package states;

import java.awt.Color;
import java.awt.Graphics;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.PriorityQueue;

import gameObjects.Constants;
import graphics.Asserts;
import graphics.Sound;
import graphics.Text;
import io.JsonParser;
import io.ScoreData;
import math.Vector2D;
import uiPackage.Action;
import uiPackage.Buttons;

public class ScoreState extends State {

	private Buttons returnButton;
	
	private PriorityQueue<ScoreData> highScores;
	
	private Comparator<ScoreData> scoreComparator;
	
	private ScoreData[] auxArray;
	
	private Sound music;
	
	public ScoreState() {
		music = MenuState.music;
		returnButton = new Buttons(
				Asserts.greyButton,
				Asserts.blueButton,
				Asserts.greyButton.getHeight(),
				Constants.HEIGHT - Asserts.greyButton.getHeight() *2,
				Constants.RETURN,
				new Action() {
					@Override
					public void doAction() {
						State.changeState(new MenuState());
					}
				}
				);
		
		scoreComparator = new Comparator<ScoreData>() {
			@Override
			public int compare(ScoreData o1, ScoreData o2) {
				return o1.getScore() < o2.getScore() ? -1: o1.getScore() > o2.getScore() ? 1: 0;
			}
			
		};
		
		highScores = new PriorityQueue<ScoreData>(10, scoreComparator);
		
		try {
			ArrayList<ScoreData> dataList = JsonParser.readFile();
			
			for(ScoreData d: dataList) {
				highScores.add(d);
			}
			
			while(highScores.size() > 10) {
				highScores.poll();
			}
			
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
	}
	
	@Override
	public void update() {
		returnButton.update();
	}

	@Override
	public void draw(Graphics g) {
		returnButton.draw(g);
		
		auxArray = highScores.toArray(new ScoreData[highScores.size()]);
		Arrays.sort(auxArray, scoreComparator);
		
		Vector2D scorePos = new Vector2D(Constants.WIDTH / 2 - 200, 100);
		Vector2D datePos = new Vector2D(Constants.WIDTH / 2 + 200, 100);
		
		Text.drawText(g, Constants.SCORE, scorePos, true, Color.BLUE, Asserts.fontBig);
		Text.drawText(g, Constants.DATE, datePos, true, Color.BLUE, Asserts.fontBig);
		
		scorePos.setY(scorePos.getY() + 40);
		datePos.setY(datePos.getY() + 40);
		
		for(int i = auxArray.length - 1; i > -1; i--) {
			ScoreData d = auxArray[i];
			
			Text.drawText(g, Integer.toString(d.getScore()), scorePos, true, Color.WHITE, Asserts.fontMed);
			Text.drawText(g, d.getDate(), datePos, true, Color.WHITE, Asserts.fontMed);
			
			scorePos.setY(scorePos.getY() + 40);
			datePos.setY(datePos.getY() + 40);
		}
	}

}
