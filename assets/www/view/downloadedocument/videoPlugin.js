
cordova.define("cordova/plugin/videoplayer",  function(require, exports, module) {
    var exec = require("cordova/exec");
    var VideoPlayer = function () {};

    /**
     * Starts the video player intent
     *
     * @param url           The url to play
     */
    VideoPlayer.prototype.play = function(url) {
    	// TODO remove hard-coding
        exec(null, null, "VideoPlayer", "playVideo", ['https://swaasblob.blob.core.windows.net/dammp4/oceans-clip.mp4']);
    };

    var videoPlayer = new VideoPlayer();
    module.exports = videoPlayer;
});

if (!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.videoPlayer) {
    window.plugins.videoPlayer = cordova.require("cordova/plugin/videoplayer");
}