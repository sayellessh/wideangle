/* ---------------------------------------------------------------------------
                             MockGeolocation.js
------------------------------------------------------------------------------

MockGeolocation.js
Copyright (c) 2008 Aza Raskin
Licensced under the MIT License:

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


------------------------------------------------------------------------------
                           The Geolocation API
------------------------------------------------------------------------------

This API was grew out of the work done at locationaware.org. In interests of
consistency, the current iteration of the API uses some of the proposed Google
Gears API verbiage, where it makes sense to do so. I've also adopted
the same style of interface declaration, so that it is easier to compare the
two proposals.

See GeolocationInterface.txt for the interface.

------------------------------------------------------------------------------
                               Examples
------------------------------------------------------------------------------

var g = new navigator.GeolocationRequest();
g.request( function(location){
  alert( location.longitude + ", " + location.latitude );
})

var g = new navigator.GeolocationRequest();
g.request({
  error: function(e){ alert( e.message ); },
  success: function(location){ 
    alert( location.altitude + "+/-" + location.altitudeAccuracy );
  },
  desiredAccuracy: g.defaultAccuracy
})

--------------------------------------------------------------------------- */


(function(){

// The allowed values for desired accuracy.
// 0: Exact location
// 1: Neighbourhood/Small City (1km)
// 2: Big City/Zip Code (10km)
var ACCURACY_VALUES = ["exact", "neighborhood", "city"];

// Exposes the following functions:
//  geoip_country_code, geoip_country_name, geoip_city, geoip_region
//  geoip_latitude, geoip_longitude.
//
// Unfortunately, they will be exposed to the global namespace, instead of
// being hidden inside the MockGeolocation anonymous function.
function _requireMaxMindAPI( callback ) {
  var id = "MaxMindJSAPI";
  // Only inject if we haven't done it before.
  if( !document.getElementById(id) ){
    script = document.createElement( "script" );
    script.src = "http://j.maxmind.com/app/geoip.js";
    script.id = id;
    document.body.appendChild( script );
  }
  
  // Do the callback  
  if( typeof(geoip_latitude) != "undefined" ){
    callback();
  }
  // If the functions from the <script> haven't loaded yet, wait a bit and
  // try again.
  else {
    setTimeout( function() {_requireMaxMindAPI(callback);}, 100 );  
  }
}

window.navigator.GeolocationRequest = function(){
  this.defaultAccuracy = ACCURACY_VALUES[0];
  
  this.request = function( arg ) {
    switch( typeof(arg) ){
      case "function":
        this._handleFunction( arg, false );
        break;
      case "object":
        this._handleObject( arg );
        break;
    }
  }
  
  this._createGeolocation = function( lat, long, accuracy ) {
    return { latitude: lat,
             longitude: long,
             altitude: null,
             accuracy: accuracy,
             altitudeAccuracy: null,
             timestamp: (new Date()).getTime(),
             address: null 
            }
  }  
  
  this._handleFunction = function( callback, optionalError ) {
    var self = this;
    optionalError = optionalError || .01;
    _requireMaxMindAPI( function(){
      var accuracy = ( Math.random() * 20 + optionalError + "").substring(0,8);
      var geo = self._createGeolocation( parseFloat(geoip_latitude()),
                                         parseFloat(geoip_longitude()),
                                         parseFloat(accuracy) );
      
      callback( geo );
    });
  }
  
  // The object takes the following keys:
  //  success -- a callback for a successful geolocation lookup
  //  error -- a callback for when something goes wrong
  //  desiredAccuracy -- See ACCURACY_VALUES above.
  this._handleObject = function( obj ) {
    var callback = obj.success || function(){};
    var errorCallback = obj.error || function(){};
    var desiredAccuracy = obj.desiredAccuracy || "exact";
    
  
    if( ACCURACY_VALUES.indexOf(desiredAccuracy) == -1 ){
      alert( "desiredAccuracy not understood" );
      return;
    }
    
    addedError = 0;
    switch( desiredAccuracy ) {
      case "neighborhood":
        var addedError = 1000; // 1km
        break;
      case "city":
      var addedError = 10000; // 10km
        break;
    }
        
    // Give either an error or a succesful geolocation.
    var errorProb = .1;
    if( Math.random() <= errorProb ){
      errorCallback( {message: "Something horrible happened!"} )
    } else {
      this._handleFunction( callback, addedError );
    }
  }
}

})();