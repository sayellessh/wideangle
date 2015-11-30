package org.apache.cordova;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Enumeration;
import java.util.zip.ZipEntry;
import java.util.zip.ZipException;
import java.util.zip.ZipFile;

import org.apache.cordova.api.CallbackContext;
import org.apache.cordova.api.CordovaPlugin;
import org.apache.cordova.api.PluginResult;
import org.json.JSONException;

import android.util.Log;

public class Zip extends CordovaPlugin {

	private static final String LOG_TAG = "Zip";

	@Override
	public boolean execute(String action, CordovaArgs args,
			final CallbackContext callbackContext) throws JSONException {
		Log.d(LOG_TAG, "Inside execuete " + action);
		if ("unzip".equals(action)) {
			unzip(args, callbackContext);
			return true;
		}
		return false;
	}

	private void unzip(CordovaArgs args, CallbackContext callbackContext) {
		BufferedOutputStream dest = null;
		BufferedInputStream is = null;
		ZipEntry entry;
		ZipFile zipfile;
		String outputDirectory = null;
		try {
			String filename = args.getString(0);
	        outputDirectory = args.getString(1);
	        if(filename.startsWith("file:///"))
	        	filename = filename.replace("file:///", "/");
	        
	        if(outputDirectory.startsWith("file:///"))
	        	outputDirectory = outputDirectory.replace("file:///", "/");
	        Log.d(LOG_TAG, "Input file " + filename);
	        Log.d(LOG_TAG, "Output File Dir " + outputDirectory);
	        
			File file = new File(filename);
			
			zipfile = new ZipFile(file);
			Enumeration<? extends ZipEntry> e = zipfile.entries();

			while (e.hasMoreElements()) {
				entry = (ZipEntry) e.nextElement();
				is = new BufferedInputStream(zipfile.getInputStream(entry),
						8192);
				int count;
				byte data[] = new byte[102222];
				//String fileName = dirToInsert + entry.getName();
				File outFile = new File(outputDirectory, entry.getName());
				outFile.getParentFile().mkdirs();
				if (entry.isDirectory()) {
					outFile.mkdirs();
				} else {
					FileOutputStream fos = new FileOutputStream(outFile);
					dest = new BufferedOutputStream(fos, 102222);

					while ((count = is.read(data, 0, 102222)) != -1) {
						dest.write(data, 0, count);
					}

					dest.flush();
					dest.close();
					is.close();
				}
			}
			callbackContext.success(outputDirectory + "/index.html");
		} catch (ZipException e1) {
			callbackContext.error(PluginResult.Status.MALFORMED_URL_EXCEPTION
					.toString());
			return;
		} catch (IOException e1) {
			callbackContext.error(PluginResult.Status.IO_EXCEPTION.toString());
			return;
		} catch (JSONException e1) {
			callbackContext.error(PluginResult.Status.IO_EXCEPTION.toString());
			return;
		}

		callbackContext.success(outputDirectory);
	}

}
