$(".modal-wide").on("show.bs.modal ", function() {
	var height = $(window).height() - 200;
	$(this).find(".modal-body").css("max-height", height);
});

$(document).ready(function () {

	// Carousel loading
	$("[data-carousel-3d]").fadeIn();
	$("span.loader").hide();

	// Word Counter
	$("#mce-NOTE").on('keyup', function () {
		var words = this.value.match(/\S+/g).length;
		if (words > 25) {
			// Split the string on first 200 words and rejoin on spaces
			var trimmed = $(this).val().split(/\s+/, 25).join(" ");
			// Add a space at the end to keep new typing making new words
			$(this).val(trimmed + " ");
		} else {
			$('#textareaFeedback').text(25 - words);
		}
	}).on("blur", function () {
		if (this.value == "") {
			$('#textareaFeedback').text("25");
		}
	});

	// Scroll animation
	$("a[href='#']").click(function () {
		_this = $(this);
		$("html,body").animate({
			scrollTop: 0,
		}, 500)
	});

	// Manually instantiate Dropdown
	$(function () {
		var $selects = $('select');

		$selects.easyDropDown({
			cutOff: 10,
			wrapperClass: 'dropdown',
			onChange: function (selected) {
				//console.log($(this).find("option").attr("label"))
				//console.log(this.required)
				if ($(this).find("option:selected").attr("label") == "label") {
					//console.log("required")
				}
			}
		});
	});

	/*
	 * Check form elements including SELECT dropdowns if they have values.
	 */
	$("form").on("submit", function (event) {
		event.preventDefault();
		var _this = $(this);
		var url = _this.attr("data-url");
		var txt = $($(this)[0].elements).not("[name='hdn'], [name='g-recaptcha-response']").serialize();
		var pair = txt.split("&");
		var filledCtr = pair.length;
		//console.log(txt)
		$.each(pair, function (index) {
			var formVal = pair[index].split("=");
			var input = _this.find("[name=" + formVal[0] + "]");
			//console.log(formVal)
			if (formVal[1] == "" && formVal[0] != "NOTE" && formVal[0] != "g-recaptcha-response") {
				if (input.prop("tagName") == "SELECT") {
					input.parent().prev().remove("span");
					input.parent().before("<span class='required'>This field is required.</span>");
					input.parent().parent().css({
						backgroundColor: "#F4A460",
						color: "#ffffff",
						border: "1px solid"
					});
				} else {
					input.parent().find("span").remove();
					input.before("<span class='required'>This field is required.</span>");
					input.css({
						backgroundColor: "#F4A460",
						color: "#ffffff",
						border: "1px solid"
					});
				}
			} else {
				if (input.prop("tagName") == "SELECT") {
					input.parent().prev().remove("span");
					input.parent().parent().removeAttr("style");
				} else {
					input.parent().find("span").remove();
					input.removeAttr("style");
				}
				filledCtr -= 1;
			}
		});
		
		if ( filledCtr > 0 ) {
			_this.find("[type='submit']").next().remove();
			_this.find("[type='submit']").after("<div class='required-note-text'>Please fill out all required field.</div>");
		} else {
			_this.find("[type='submit']").next().remove();
			
			$.ajax({
				url: url,
				type: "POST",
				data: txt,
				dataType: 'jsonp',
				success: function(data) {
					if (data.result == "success") {
						$('#tbi-modal-raffle').modal();
						$("#tbi-modal-raffle").find(".modal-body p").html(data.msg)
					} else {
						$("#tbi-modal-error-request").modal();
						$("#tbi-modal-error-request").find(".modal-body p").html(data.msg)
					}
				}
			})
		}
	});
	
	
	// karen -- jan_22 
	// prepare the form when the DOM is ready 
	var galleryClass = '.gallery';
	$(galleryClass+' li img').click(function(){
		var $gallery = $(this).parents(galleryClass);
		$('.main-img',$gallery).attr('src',$(this).attr('src').replace('thumb/', ''));
	});
	var imgSwap = [];
	 $(galleryClass+' li img').each(function(){
		imgUrl = this.src.replace('thumb/', '');
		imgSwap.push(imgUrl);
	});
	$(imgSwap).preload();

	$(".gallery ul div:first-child li img").addClass("selected");
	$('.gallery ul img').click(function(){
		$(this).closest("ul").find("img").removeClass('selected');
		$(this).addClass('selected');
	});

});

$.fn.preload = function() {
	this.each(function(){
		$('<img/>')[0].src = this;
	});
}