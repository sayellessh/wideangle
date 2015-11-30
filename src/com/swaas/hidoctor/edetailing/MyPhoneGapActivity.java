package com.swaas.hidoctor.edetailing;

import org.apache.cordova.DroidGap;

import android.os.Bundle;
import android.util.Log;
import android.webkit.WebSettings.PluginState;

public class MyPhoneGapActivity extends DroidGap {
	@Override
	public void onCreate(Bundle savedInstanceState) {
		
		super.setIntegerProperty("loadUrlTimeoutValue", 1200000); 
		super.onCreate(savedInstanceState);
		try {
			super.init();
			//super.appView.getSettings().setPluginsEnabled(true);
			super.appView.getSettings().setPluginState(PluginState.ON);
		} catch(Exception e) {
			Log.e(MyPhoneGapActivity.class.toString(), e.toString(), e);
		}
		super.loadUrl("file:///android_asset/www/index.html");
	}

	@Override
	public void onDestroy() {
		super.onDestroy();
		System.exit(0);
	}
	
}
