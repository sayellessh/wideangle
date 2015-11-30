package com.phonegap.plugins.downloader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import org.apache.cordova.api.Plugin;
import org.apache.cordova.api.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.os.Environment;
import android.os.StatFs;
import android.util.Log;
@SuppressWarnings("deprecation")
public class Downloader extends Plugin {

	@Override
	public PluginResult execute(String action, JSONArray args, String callbackId) {

		if (!action.equals("downloadFile")) 
			return new PluginResult(PluginResult.Status.INVALID_ACTION);

		try {

			String fileUrl = args.getString(0);
			JSONObject params = args.getJSONObject(1);

			String fileName = params.has("fileName") ? 
					params.getString("fileName"):
					fileUrl.substring(fileUrl.lastIndexOf("/")+1);

			String dirName = params.has("dirName") ? params.getString("dirName"):"";

			Boolean overwrite = params.has("overwrite") ? params.getBoolean("overwrite") : true;

			return this.downloadUrl(fileUrl, dirName, fileName, overwrite, callbackId);

		} catch (JSONException e) {

			e.printStackTrace();
			return new PluginResult(PluginResult.Status.JSON_EXCEPTION, e.getMessage());

		} catch (InterruptedException e) {
			e.printStackTrace();
			return new PluginResult(PluginResult.Status.ERROR, e.getMessage());
		}

	}

	private PluginResult downloadUrl(String fileUrl, String dirName, String fileName, Boolean overwrite, String callbackId) throws InterruptedException, JSONException {

		try {
			URL url = new URL(fileUrl);
			HttpURLConnection ucon = (HttpURLConnection) url.openConnection();
			ucon.setRequestMethod("GET");
			ucon.addRequestProperty("Accept-Encoding", "deflate");
			ucon.connect();

			Log.d("PhoneGapLog", "Download start");

			InputStream is = ucon.getInputStream();
			byte[] buffer = new byte[1024];
			long readed = 0, 
			    progress = 0,
			    totalReaded = 0,
			    fileSize = ucon.getContentLength();
			Log.d("FileSize", String.valueOf(fileSize));
			
			boolean isMemoryAvailable = isMemorySizeAvailableAndroid(fileSize, true);
			if(isMemoryAvailable){
				dirName = (dirName != null && dirName.length() >0) ?
						Environment.getExternalStorageDirectory().getPath()+"/"+dirName:
						Environment.getExternalStorageDirectory().getPath() + "/download";	
				}else{
				//if false check in internal memory
				isMemoryAvailable = isMemorySizeAvailableAndroid(fileSize, false);
				dirName = (dirName != null && dirName.length() >0)  ?
						Environment.getDataDirectory().getPath()+"/data/com.swaas.hidoctor.edetailing/"+dirName:
						Environment.getDataDirectory().getPath() + "/data/com.swaas.hidoctor.edetailing/download";
			}
			
			Log.d("Directory", dirName);
		
			if(!isMemoryAvailable){
				JSONObject obj = new JSONObject();
				obj.put("status", -1);
				obj.put("error", "NOMEMORY");
				obj.put("progress", 0);
				Log.d("DownloaderError", "No disk space");

				return new PluginResult(PluginResult.Status.ERROR, obj);
			}
			
			Log.d("PhoneGapLog", "Downloading "+fileUrl + " into " + dirName + "/" + fileName);

			File dir = new File(dirName);
			if (!dir.exists()) {
				Log.d("PhoneGapLog", "directory " + dirName + " created");
				dir.mkdirs();
			}
			

			File file = new File(dirName, fileName);
			
			
			if (!overwrite && file.exists()) {
				if(file.length() == fileSize){
					Log.d("DownloaderPlugin", "File already exist");

					JSONObject obj = new JSONObject();
					obj.put("status", 1);
					obj.put("total", 0);
					obj.put("file", fileName);
					obj.put("dirName", dirName);
					obj.put("progress", 100);

					return new PluginResult(PluginResult.Status.OK, obj);
				}
			}
			
			if (!file.exists()) {
				file.createNewFile();
			}
			
			FileOutputStream fos = new FileOutputStream(file);
						
			while ((readed = is.read(buffer)) > 0) {

				fos.write(buffer, 0, (int) readed);
				totalReaded += readed;

				long newProgress = (long) (totalReaded*100/fileSize);				
				if (newProgress != progress)
				 progress = informProgress(fileSize, newProgress, dirName, fileName, callbackId);

			}
			

			fos.close();

			Log.d("PhoneGapLog", "Download finished");

			JSONObject obj = new JSONObject();
			obj.put("status", 1);
			obj.put("total", fileSize);
			obj.put("file", fileName);
			obj.put("dirName", dirName);
			obj.put("progress", progress);

			return new PluginResult(PluginResult.Status.OK, obj);

		}
		catch (FileNotFoundException e) {
			Log.d("PhoneGapLog", "File Not Found: " + e);
			return new PluginResult(PluginResult.Status.ERROR, 404);
		}
		catch (IOException e) {
			Log.d("PhoneGapLog", "Error: " + e);
			e.printStackTrace();
			return new PluginResult(PluginResult.Status.ERROR, e.getMessage());
		}

	}

	private long informProgress(long fileSize, long progress, String dirName, String fileName, String callbackId) throws InterruptedException, JSONException {

		if(progress != 100){
			JSONObject obj = new JSONObject();
			obj.put("status", 0);
			obj.put("total", fileSize);
			obj.put("file", fileName);
			obj.put("dirName", dirName);
			obj.put("progress", progress);
			
			PluginResult res = new PluginResult(PluginResult.Status.OK, obj);
			res.setKeepCallback(true);
			success(res, callbackId);
		}
		
		Log.d("Download Progress ", String.valueOf(progress));

		//Give a chance for the progress to be sent to javascript
		Thread.sleep(100);

		return progress; 
	}
	private static boolean isMemorySizeAvailableAndroid(long download_bytes, boolean isExternalMemory) {
	    boolean isMemoryAvailable = false;
	    long freeSpace = 0;

	    // if isExternalMemory get true to calculate external SD card available size
	    if(isExternalMemory){
	        try {
	            StatFs stat = new StatFs(Environment.getExternalStorageDirectory().getPath());
	            freeSpace = (long) stat.getAvailableBlocks() * (long) stat.getBlockSize();
				Log.d("SD Card Memory", "Free Space____" + freeSpace);
	            if(freeSpace > download_bytes){
	                isMemoryAvailable = true;
	            }else{
	                isMemoryAvailable = false;
	            }
	        } catch (Exception e) {e.printStackTrace(); isMemoryAvailable = false;}
	    }else{
	        // find phone available size
	        try {
	            StatFs stat = new StatFs(Environment.getDataDirectory().getPath());
	            freeSpace = (long) stat.getAvailableBlocks() * (long) stat.getBlockSize();
				Log.d("Phone Internal Memory", "Free Space____" + freeSpace);
	            if(freeSpace > download_bytes){
	                isMemoryAvailable = true;
	            }else{
	                isMemoryAvailable = false;
	            }
	        } catch (Exception e) {e.printStackTrace(); isMemoryAvailable = false;}
	    }

	    return isMemoryAvailable;
	}
}