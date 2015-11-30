com.swaas.hidoctor.edetailing.net.CoreNET = {
		/*
		Connection.UNKNOWN
		Connection.ETHERNET
		Connection.WIFI
		Connection.CELL_2G
		Connection.CELL_3G
		Connection.CELL_4G
		Connection.NONE
		*/
		isConnected:  function() {
			var connectionType = navigator.network.connection.type;
			if (connectionType == Connection.NONE || connectionType == Connection.UNKNOWN){
				return false;
			} else {
				return true;
			}
		},

		getNetworkType: function() {
			return navigator.network.connection.type.toUpperCase();
		}
};