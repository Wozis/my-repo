package graphics;

import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.Clip;
import javax.sound.sampled.FloatControl;

public class Sound {
	private Clip clip;
	
	public Sound(Clip clip) {
		this.clip = clip;
	}
	
	public void play() {
		clip.setFramePosition(0);
		clip.start();
	}
	
	public void stop() {
		clip.stop();
	}
	
	public void ajustSound(float volume) {
		FloatControl control = (FloatControl) clip.getControl(FloatControl.Type.MASTER_GAIN);
		float range = control.getMaximum() - control.getMinimum();
		float gain = (range*volume) + control.getMinimum();
		control.setValue(gain);
	}

}
