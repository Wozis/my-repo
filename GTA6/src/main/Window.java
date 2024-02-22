package main;
import java.awt.Canvas;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.image.BufferStrategy;

import javax.swing.JFrame;

import gameObjects.Constants;
import graphics.Asserts;
import graphics.Sound;
import input.Keyboard;
import input.Mouse;
import states.GameState;
import states.LoadingState;
import states.MenuState;
import states.State;

public class Window extends JFrame implements Runnable {

	private Canvas canvas;
	public static Thread thread;
	private boolean running = false;
	private BufferStrategy bs;
	private Graphics g;
	private final int FPS = 60;
	private double TARGETTIME = 1000000000/FPS;
	private double delta = 0;
	private int AVERAGEFPS = FPS;
	
	private Keyboard keyboard;
	private Mouse mouse;
	
	public Window() {
		setTitle("GTA6");
		setSize(Constants.WIDTH, Constants.HEIGHT);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setResizable(false);
		setLocationRelativeTo(null);
		
		canvas = new Canvas();
		keyboard = new Keyboard();
		mouse = new Mouse();
		
		canvas.setPreferredSize(new Dimension(Constants.WIDTH, Constants.HEIGHT));
		canvas.setMaximumSize(new Dimension(Constants.WIDTH, Constants.HEIGHT));
		canvas.setMinimumSize(new Dimension(Constants.WIDTH, Constants.HEIGHT));
		canvas.setFocusable(true);
		
		add(canvas);
		canvas.addKeyListener(keyboard);
		canvas.addMouseListener(mouse);
		canvas.addMouseMotionListener(mouse);
		setVisible(true);
	}
	
	public static void main(String[] args) {
		new Window().start();
	}

	@Override
	public void run() {
		long now = 0;
		long lastTime = System.nanoTime();
		int frames = 0;
		long time = 0;
		
		init();
		
		while(running) {
			if(!Keyboard.PAUSE) {
				now = System.nanoTime();
				delta += (now - lastTime) / TARGETTIME;
				time += (now - lastTime);
				lastTime = now;
				
				if(delta >= 1) {
					update();
					draw();
					delta --;
					frames++;
				}
				if(time >= 1000000000) {
					AVERAGEFPS = frames;
					frames = 0;
					time = 0;
				}
			}
		}
		
		stop();
	}
	
	private void start() {
		thread = new Thread(this);
		thread.start();
		running = true;
	}
	
	private void stop() {
		try {
			thread.join();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}
	
	private void update() {
		keyboard.update();
		mouse.update();
		State.getState().update();
	}
	
	private void draw() {
		bs = canvas.getBufferStrategy();
		if (bs==null) {
			canvas.createBufferStrategy(3);
			return;
		}
		g = bs.getDrawGraphics();
		
		g.setColor(Color.BLACK);
		g.fillRect(0, 0, Constants.WIDTH, Constants.HEIGHT);
		
		State.getState().draw(g);
		
		g.drawString(""+AVERAGEFPS, 10, 10);
		
		g.dispose();
		bs.show();
	}
	
	private void init() {
		Thread loadingThread = new Thread(new Runnable() {

			@Override
			public void run() {
				Asserts.init();
			}});
		
		State.changeState(new LoadingState(loadingThread));
	}

}
