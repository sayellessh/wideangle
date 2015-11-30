com.swaas.hidoctor.edetailing.ui.view.NetworkUnavailable = {
		init: function(){
			ED.handleBackButton();
			ED.setValue($('#errorCaption'), com.swaas.hidoctor.edetailing.ui.view.Resource.error.networkUnavailable.caption);
			ED.setValue($('#errorMessage'), com.swaas.hidoctor.edetailing.ui.view.Resource.error.networkUnavailable.message);
		}
};