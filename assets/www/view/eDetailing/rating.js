com.swaas.hidoctor.edetailing.ui.view.Rating = {
	init : function(id, rating, isBig) {
		id.ratings(5, rating, true, isBig).bind(
				'ratingchanged',
				function(event, data) {
					com.swaas.hidoctor.edetailing.ui.view.Rating
							.updateRating(data.rating);
				});
	},
	updateRating : function(rating) {
		insertRatingAnalytics(rating);

	},
	setRating : function(id, rating, isBig) {
		id.ratings(5, rating, false, isBig);
	}

};