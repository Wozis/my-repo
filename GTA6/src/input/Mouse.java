package input;

import java.awt.event.KeyEvent;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

public class Mouse extends MouseAdapter {

	public static int X, Y;
	public static boolean MLB;
	private boolean mouseClick = false;
	
	public static boolean SHOOT;
	
	public Mouse() {
		SHOOT = false;
	}
	
	public void update() {
		SHOOT = mouseClick;
		
		mouseClick = false;
	}
	
	@Override
	public void mousePressed(MouseEvent e) {
		if(e.getButton() == MouseEvent.BUTTON1) {
			MLB = true;
		}
		if (e.getButton()==MouseEvent.BUTTON1) {
			mouseClick = true;
		}
	}

	@Override
	public void mouseReleased(MouseEvent e) {
		if(e.getButton() == MouseEvent.BUTTON1) {
			MLB = false;
		}
	}

	@Override
	public void mouseDragged(MouseEvent e) {
		X = e.getX();
		Y = e.getY();
	}

	@Override
	public void mouseMoved(MouseEvent e) {
		X = e.getX();
		Y = e.getY();
	}

}
