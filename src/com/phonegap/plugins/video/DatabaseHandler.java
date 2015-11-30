package com.phonegap.plugins.video;

import java.io.IOException;

import android.content.ContentValues;
import android.database.Cursor;
import android.database.DatabaseUtils;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteException;

public class DatabaseHandler{
	 private static final int DATABASE_VERSION = 1;
	 private static final String DATABASE_NAME ="/data/data/com.swaas.hidoctor.edetailing/app_database/EDETAILING_DB.db";
	 private static final String TABLE_NAME ="tbl_DA_Itemized_Billing";
	 private static final String COLUMN_NAME ="Play_Time";
	 private SQLiteDatabase myDataBase; 
	 
		
	public void createDataBase() throws IOException{
		boolean dbExist = checkDataBase();
		if(dbExist){
			//do nothing
		}
	}
	
	private boolean checkDataBase(){
		SQLiteDatabase checkDB = null;
		try{
			String myPath =DATABASE_NAME;
			checkDB = SQLiteDatabase.openDatabase(myPath, null, SQLiteDatabase.OPEN_READONLY);
		} catch(SQLiteException e){
			
		}
		if(checkDB != null){
			checkDB.close();
		}
		return checkDB != null ? true : false;
	}
	
	public SQLiteDatabase openDataBase() throws SQLException{
		if (myDataBase == null){
			String myPath = DATABASE_NAME;
			myDataBase = SQLiteDatabase.openDatabase(myPath, null, SQLiteDatabase.OPEN_READWRITE);
		}
		return myDataBase;
	}
	
	public synchronized void close() {
		if(myDataBase != null){
			myDataBase.close();
			myDataBase = null;
		}
	}


	public int incrementPlayTime(String billingId, long playTime){
	  String KEY_ID = "DA_Billing_Id";
	  SQLiteDatabase db = this.openDataBase();
	  int p = 0;	  
	  if (db != null){
		 String selectQuery= "SELECT  " + COLUMN_NAME + " FROM " + TABLE_NAME + " WHERE  " + KEY_ID + " = " + DatabaseUtils.sqlEscapeString(billingId);
		 Cursor cursor = db.rawQuery(selectQuery, null);
		 long assetPlaytime = 0;
		 if (cursor.moveToFirst()) {
			 assetPlaytime = cursor.getInt(cursor.getColumnIndex(COLUMN_NAME));
		 }
		 assetPlaytime = assetPlaytime + playTime;
		 ContentValues contentValue = new ContentValues();
		 contentValue.put(COLUMN_NAME, assetPlaytime);
		 p = db.update(TABLE_NAME, contentValue, KEY_ID + "= '" + billingId + "'", null);
		 System.out.println("Updated: " + assetPlaytime);
		 this.close();
	  }
	  return p;
	}
}
