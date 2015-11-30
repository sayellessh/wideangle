package com.phonegap.plugins.video;
import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.Window;
import android.widget.MediaController;

import com.swaas.hidoctor.edetailing.R;

public class VideoPlayerActivity extends Activity {
	private long videoPlayTime;
	private long videoStopTime;
	private long playDuration;
	private CustomVideoView cVideoView;
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		this.requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.video);
        Intent intent = getIntent();
        String assetUrl = intent.getStringExtra("videoUrl");
        String assetBillinId = intent.getStringExtra("videoBillingId");
		final String id = assetBillinId; 
        cVideoView = (CustomVideoView) findViewById(R.id.videoview);
        
        cVideoView.setPlayPauseListener(new CustomVideoView.PlayPauseListener() {
        
            @Override
            public void onPlay() {
            	if (videoPlayTime == 0){
            		videoPlayTime = System.currentTimeMillis();
            		System.out.println("Play:" + videoPlayTime);
            	}
            }

            @Override
            public void onPause() {
            	if (videoPlayTime > 0){
	                videoStopTime = System.currentTimeMillis();
	                System.out.println("Pause:" + videoStopTime);
	                playDuration = (videoStopTime-videoPlayTime);
	                DatabaseHandler dbHandler=new DatabaseHandler();
	                dbHandler.incrementPlayTime(id, playDuration);
            	}
                videoPlayTime = 0;
                videoStopTime = 0;
            }
			
			@Override
			public void onComplete(){
				if (videoPlayTime > 0){
					videoStopTime = System.currentTimeMillis();
	                System.out.println("Complete:" + videoStopTime);
	                playDuration = (videoStopTime-videoPlayTime);
	                DatabaseHandler dbHandler=new DatabaseHandler();
	                dbHandler.incrementPlayTime(id, playDuration);
				}
                videoPlayTime = 0;
                videoStopTime = 0;
			}
        });
      
        System.out.println("pk MyVideoPlayer"+assetUrl);
        Uri videoPath = Uri.parse(assetUrl);
        
        cVideoView.setMediaController(new MediaController(this));
        cVideoView.setVideoURI(videoPath);
        cVideoView.start();
	}
	
	@Override
	protected void onDestroy() {
		super.onDestroy();
		if (cVideoView != null){
			cVideoView.stopPlayTracking();
		}
	}
}
