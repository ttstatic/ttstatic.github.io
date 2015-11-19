(function ($) {

	$.fn.materialize = function (options) {
		
		var settings = $.extend({
			placeholder : this.attr("data-placeholder")
		}, options);
		
		this.addClass("ttdform--input");
		this.wrap(
			"<div class='ttmdform'>" +
				"<div class='ttmdform--casing'></div>" +
			"</div>"
		);
		this.before("<em class='ttmdform--placeholder'>" + settings.placeholder + "</em>");

	};
	
	$("body, .modal").on("click", ".ttmdform--placeholder", function () {
		$(this).parents(".ttmdform--casing:eq(0)").find(".ttdform--input").trigger("focus");
	});
	$("body, .modal").on("focus", ".ttdform--input", function () {
		$(this).parents(".ttmdform--casing:eq(0)").find(".ttmdform--placeholder").addClass("move");
	}).on("blur", ".ttdform--input", function () {
		if ($.trim($(this).val()) == "") {
			$(this).parents(".ttmdform--casing:eq(0)").find(".ttmdform--placeholder").removeClass("move");
		}
	});

}(jQuery));