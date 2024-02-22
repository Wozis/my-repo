package input;

import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;

import states.GameState;

public class Keyboard implements KeyListener {

	private boolean[] keys = new boolean[256];

	
	public static boolean UP, LEFT, RIGHT, ESC, PAUSE;
	
	public Keyboard() {
		UP = false;
		LEFT = false;
		RIGHT = false;
		ESC = false;
		PAUSE = false;
	}
	
	public void update() {
		UP = keys[KeyEvent.VK_UP];
		LEFT = keys[KeyEvent.VK_LEFT];
		RIGHT = keys[KeyEvent.VK_RIGHT]; 
		ESC = keys[KeyEvent.VK_ESCAPE];
	}

	@Override
	public void keyTyped(KeyEvent e) {
		
	}

	@Override
	public void keyPressed(KeyEvent e) {
		keys[e.getKeyCode()] = true;
		if(e.getKeyCode()==KeyEvent.VK_ESCAPE) {
			PAUSE = !PAUSE;
		}
	}

	@Override
	public void keyReleased(KeyEvent e) {
		keys[e.getKeyCode()] = false;
	}
	          
}
