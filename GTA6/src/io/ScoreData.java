package io;

import java.text.SimpleDateFormat;
import java.util.Date;

public class ScoreData {
	private String date;
	private int score;
	
	public ScoreData(int score) {
		this.score = score;
		
		Date actualDate = new Date(System.currentTimeMillis());
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		date = format.format(actualDate);
	}
	
	public ScoreData() {
		
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}
	
}
