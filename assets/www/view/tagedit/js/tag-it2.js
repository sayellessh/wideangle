(function($) {

	$.fn.tagit = function(options) {

		var _tagItObject = this;

		var el = this;

		const		BACKSPACE = 8;
		const		ENTER = 13;
		const		SPACE = 32;
		const		COMMA = 44;

		// add the tagit CSS class.
		el.addClass("tagit");
		el.css("height", "40px");
		el.css("padding-top", "0px");
		el.css("padding-left", "5px");
		
		addedValues = [];

		var tagUL = $('<ul id="listViewTag" style="10px 5px 0px 0;font-size:small" data-role="listview" data-corners="false" data-filter="true" data-filter-reveal="true" data-filter-placeholder="" data-inset="true"/>');

		$.each(options.availableTags, function(index, tag) {

			var link = $("<li title='"+tag+"'><a href='#' class='tagClass'>" + tag
					+ "</a></li>");

			tagUL.append(link);

			link.click(function() {
				var item2 = $('.ui-icon-delete');
				item2.trigger('click');
				// link.remove();
				// tagUL.listview("refresh");
				create_choice(tag);
				$(_tagItObject).find(".ui-input-text").val(null);
				//Removed default focus to tag input
				$(_tagItObject).find(".ui-input-text").focus();

			});
		});

		// create the input field.
		var html_input_field = $('<li class=\"tagit-new\" />');
		html_input_field.append(tagUL);
		el.append(html_input_field);

		$(this).click(function(e) {
			if (e.target.tagName == 'A') {
				// Removes a tag when the little 'x' is clicked.
				// Event is binded to the UL, otherwise a new tag (LI > A)
				// wouldn't have this event attached to it.
				
			} else {
				// Sets the focus() to the input field, if the user clicks
				// anywhere inside the UL.
				// This is needed because the input field needs to be of a small
				// size.
				$(_tagItObject).find(".ui-input-text").focus();
			}
		});

		tagUL.listview({

		});

		$(_tagItObject).find('.ui-input-search').attr('class',
				'ui-input-search');
		$(_tagItObject).find('.ui-input-search').css('padding', '0px 0px');
		$(_tagItObject).find('.ui-input-search').css('margin', '10px 5px 0px 0');
		$(_tagItObject).find('.ui-input-search').css('font-size', 'small');
		$(_tagItObject).find('.ui-input-text').css('margin-left', '10px');
		$(_tagItObject).find('.ui-input-text').css('font-size', 'small');
		$(_tagItObject).find('.ui-input-text').css('width', '100px');
		$(_tagItObject).find('.ui-input-search').css('box-shadow', "0 0 0px");
		
		var tag_input = $(_tagItObject).find(".ui-input-text");

		tag_input.keypress(function(event) {
			$(_tagItObject).find(".ui-input-clear").hide();
			if (event.which == BACKSPACE) {
				if (tag_input.val().length == 0) {
					$(el).children(".tagit-choice:last").remove();
				}
			} else if (event.which == COMMA || event.which == ENTER) {
				event.preventDefault();

				var typed = tag_input.val();
				typed = typed.replace(/,+$/, "");
				typed = typed.trim();
				if (typed != "") {
					if (is_new(typed)) {
						create_choice(typed);
					}
					tag_input.val("");
				}
				tag_input.focus();
			}
		});
		/*
		tag_input.blur(function(event){
			event.preventDefault();

			var typed = tag_input.val();
			typed = typed.replace(/,+$/, "");
			typed = typed.trim();

			if (typed != "") {
				if (is_new(typed)) {
					create_choice(typed);
				}
				tag_input.val("");
			}
			tag_input.focus();			
		});
	*/
		function is_new(value) {
			/* TODO discuss with Ganesh and Abhijeet
			$.each(options.availableTags, function(i, option) {
				if (option == value) {
					is_new = false;
				}
			});
			*/
			
		
			var is_new = true;			
			for (var i = 0; i<addedValues.length; i++){
				if (addedValues[i] == value){
					is_new = false;
					break;
				}
			}
	
			return is_new;
		}
		
		function create_choice(value) {
			var el = $("<li class=\"tagit-choice\" style='padding=\"5px\"' />");
			var a1 = $("<a data-role='button' data-theme='b' data-corners='false' data-inline='true' data-mini='true' class=\"close\">" + value + " " + "</a>");
			var a2 = $("<a data-role='button' data-theme='b' data-corners='false' data-inline='true' data-mini='true' class=\"close\">X</a>");
			el.append(a1);
			el.append(a2);
			el.append("<input type=\"hidden\" style=\"display:none;\" value=\""
					+ value + "\" name=\"item[tags][]\">")
			var li_search_tags = tagUL.parent();
			$(el).insertBefore(li_search_tags);
			a1.button();
			a2.button();
			a1.css("padding", "0px");
			a1.css("margin", "0px");
			a1.css("border", "0px");
			a1.css("color", "white");
			//a1.css("box-shadow", "0px")
			//a1.css("-webkit-box-shadow", "0px");
			a2.css("padding", "0px");
			a2.css("margin", "0px");
			a2.css("border", "0px");
			a2.css("margin-right", "5px");
			
			a1.removeClass("ui-shadow");
			a2.removeClass("ui-shadow");
			//a2.css("box-shadow", "0px")
			//a2.css("-webkit-box-shadow", "0px");
			
			a2.click(function(e){
				var li = $(el);
				$('#listViewTag').trigger('liRemoved', li);
				li.remove();
				
			});
			
			addedValues.push(value);
			
			// this.tag_input.val("");
			$('#listViewTag').trigger('liAdded', $(el));					
			
			/*
			var el = "";
			el = "<li class=\"tagit-choice\">\n";
			el += value + "\n";
			el += "<a class=\"close\">x</a>\n";
			el += "<input type=\"hidden\" style=\"display:none;\" value=\""
					+ value + "\" name=\"item[tags][]\">\n";
			el += "</li>\n";
			var li_search_tags = tagUL.parent();
			$(el).insertBefore(li_search_tags);
			// this.tag_input.val("");
			$('#listViewTag').trigger('liAdded', $(el));
			*/
		};
		//$(_tagItObject).find(".ui-input-text").focus();
	};

	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, "");
	};

})(jQuery);