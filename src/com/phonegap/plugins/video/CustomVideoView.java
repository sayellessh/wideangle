package com.phonegap.plugins.video;

import java.util.Timer;
import java.util.TimerTask;

import android.content.Context;
import android.os.Handler;
import android.util.AttributeSet;
import android.widget.VideoView;

public class CustomVideoView extends VideoView {
	   private Timer timer;
	   private Handler mTimerHandler = new Handler();
	  
	   private TimerTask timerTask;
       
	   private PlayPauseListener mListener;
	   
	   private int previousPosition = 0;
	   
	   private int numberOfBufferingAttempts= 0;
	   private final int maxAttempts = 0;
	   

	    public CustomVideoView(Context context) {
	        super(context);
        }
	    
	    public void schedulePlayTracking(){
	    	if (timer == null){
		        final CustomVideoView customVideoView = this;
		        timer = new Timer();
		        numberOfBufferingAttempts = 0;
		        timerTask = new TimerTask() {
	                public void run() {
	             	   mTimerHandler.post(new Runnable() {
	                        public void run(){
	                        	  if (customVideoView.isPlaying() == false){
		                        	   stopPlayTracking();
		                        	   customVideoView.complete();
		                          }
	                        	  int currentPosition = customVideoView.getCurrentPosition();
	                        	  if (currentPosition > 0 && currentPosition == previousPosition){
	                        		  if (numberOfBufferingAttempts == maxAttempts){
			                        	   stopPlayTracking();
			                        	   customVideoView.complete();
	                        		  } else {
	                        			  numberOfBufferingAttempts++;
	                        		  }
	                        	  } else {
	                        		  previousPosition = currentPosition;
	                        		  numberOfBufferingAttempts = 0;
	                        	  }
	                        }
	                    });
	                }
	            };
	            timer.schedule(timerTask, 100, 500);
	    	}
	    }
	    
	    public void stopPlayTracking(){
	    	if (timer != null){
		    	 timer.cancel();
		         timer.purge();	
		         timerTask = null;
			     numberOfBufferingAttempts = 0;
			     previousPosition = 0;
		         timer = null;
	    	}
	    }

	    public CustomVideoView(Context context, AttributeSet attrs) {
	        super(context, attrs);
	    }

	    public CustomVideoView(Context context, AttributeSet attrs, int defStyle) {
	        super(context, attrs, defStyle);
	    }

	    public void setPlayPauseListener(PlayPauseListener listener) {
	        mListener = listener;
	    }

	    @Override
	    public void pause() {
	        super.pause();
	        if (mListener != null) {
		        this.stopPlayTracking();
	            mListener.onPause();
        }
	        
	    }

	    @Override
	    public void start() {
	        super.start();
	        if (mListener != null) {
	            mListener.onPlay();
		        this.schedulePlayTracking();
	        }
	        
	    }

	    @Override
		public int getCurrentPosition() {
			return super.getCurrentPosition();
		}

		@Override
		public int getDuration() {
			return super.getDuration();
		}

		@Override
		public boolean isPlaying() {
			return super.isPlaying();
			
		}
		
		@Override
		public void resume(){
			this.start();
		}

		@Override
		public void stopPlayback() {
			super.stopPlayback();
		}
		
		public void complete(){
			 if (mListener != null) {
				 mListener.onComplete();
			 }
		}

		interface PlayPauseListener {
	        void onPlay();
	        void onPause();
	        void onComplete();
	      
	    }
}
