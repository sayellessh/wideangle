/*
 * PhoneGap is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *
 * Copyright (c) 2005-2010, Nitobi Software Inc.
 * Copyright (c) 2011, IBM Corporation
 */

package com.phonegap.plugins.video;

import java.io.Serializable;

import org.apache.cordova.api.CallbackContext;
import org.apache.cordova.api.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import android.content.Context;
import android.content.Intent;

public class VideoPlayer extends CordovaPlugin implements Serializable {

	private static final long serialVersionUID = 1L;
    
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) {
        Context context = cordova.getActivity().getApplicationContext();
        Intent playerActivity = new Intent(context, VideoPlayerActivity.class);
        String url = null;
        try {
        	 url = args.getString(0).toString();
		} catch (JSONException e) {
			return false;
		}
        String videoBillingId=null;
		try {
			videoBillingId = args.getString(1).toString();
		} catch (JSONException e) {
			e.printStackTrace();
		}
        playerActivity.putExtra("videoUrl",url);
        playerActivity.putExtra("videoBillingId", videoBillingId);
        this.cordova.getActivity().startActivity(playerActivity);	
		return true;
        
    }
}
