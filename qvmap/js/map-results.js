(function() {

	$(document).ready(function() {
		//sliders
		//http://lokku.github.io/jquery-nstslider/
		$('.twoRange').nstSlider({
			"crossable_handles": false,
			"left_grip_selector": ".leftGrip",
			"right_grip_selector": ".rightGrip",
			"value_bar_selector": ".bar",
			"value_changed_callback": function(cause, leftValue, rightValue) {
				var lv = leftValue;
				var rv = rightValue;
				var pf = '';
				var rpf = '';

				if (lv >= 1000000) {
					lv = lv / 1000000;
					pf = "M";
				} else if (lv >= 1000) {
					lv = lv / 1000;
					pf = "k";
				}
				if (rv >= 1000000) {
					rv = rv / 1000000;
					rpf = "M";
				} else if (rv >= 1000) {
					rv = rv / 1000;
					rpf = "k";
				}


				$(this).parent().find('.leftLabel').text((lv.toFixed(1)) + pf);
				$(this).parent().find('.rightLabel').text((rv.toFixed(1)) + rpf);
			}
		});



		$('.slideB, .slideC, .slideD').nstSlider({
			"left_grip_selector": ".leftGrip",
			"value_changed_callback": function(cause, leftValue, rightValue) {

				var pfx = "";
				if ($(this).attr('data-prefix') !== undefined) {
					pfx = $(this).attr('data-prefix');
				}
				$(this).parent().find('.leftLabel').text(leftValue + pfx);


			}
		});


		//disabled all on init
		$('  .slideB, .slideC, .slideD').nstSlider('disable');
		$(' .slideB, .slideC, .slideD').css({
			'opacity': '0.5',
			'cursor': 'auto'
		});

		// checkboxes enable-disable
		$("#YieldAboveCHB,#GrowthAboveCHB,#EstimatedRentCHB").change(function(e) {
			var slide = $($(this).attr('data-target'));
			if ($(this).is(":checked")) {
				slide.css({
					'opacity': '1',
					'cursor': 'pointer'
				});
				slide.nstSlider('enable');
			} else {
				slide.css({
					'opacity': '0.5',
					'cursor': 'auto'
				});
				slide.nstSlider('disable');

			}
		});

		// top radio buttons action / update slide bar values & range
		$("input:radio[name ='resFilterRadio']").change(function(e) {
			var rbut = $("input:radio[name ='resFilterRadio']:checked");
			$('#doubleSliderTitle').html(rbut.val());
			if (rbut.attr('data-initValues') !== undefined && rbut.attr('data-range') !== undefined) {

				var newValues = rbut.attr('data-initValues').split('/');
				var newRange = rbut.attr('data-range').split('/');
				if (newValues.length == 2 && newRange.length == 2) {

					$('.twoRange').nstSlider('set_range', parseInt(newRange[0]), parseInt(newRange[1]));
					$('.twoRange').nstSlider('set_position', parseInt(newValues[0]), parseInt(newValues[1]));
					$('.twoRange').nstSlider('refresh');
				}
			}
		});

		initInsightsDropDown();

	});

	// insight dropdown action functions
	function initInsightsDropDown() {
		$('#SIlist li a').click(insightsDropDownAction);
		$('#SIlistA li a').click(insightsDropDownAction);
	}

	function insightsDropDownAction(e) {
		if (e) e.preventDefault();
		var label = $(this).clone().text();
		var href = $(this).attr('href'); //if we need the href attr
		$('#SIlabel').html(label);
		$('#SIlabelA').html(label);
	}



})();



(function() {
	//open/close results div
	var resOpened = true;
	var resultsDiv;
	var mobStatus = 'closed';
	$(document).ready(function() {
		resultsDiv = $('.left-module').eq(0);
		$("#closeMapButton").click(resultsToggle);
		$("#refine-button").click(function(e) {
			e.preventDefault();
			toggleMobFilters()
		});
		$("#props-bottom-btn").click(function(e) {
			e.preventDefault();
			$(".toggle-view").toggle();
			showMobProperties()
		})

		$("#props-close-btn").click(function(e) {
			e.preventDefault();
			$(".toggle-view").toggle();
			hideMobProperties()
		})

		$(window).resize(align);
		align();
	});

	function resultsToggle(e) {
		if (e) e.preventDefault();
		if (resOpened) {
			closePane()
		} else {
			openPane();
		}

	}

	function closePane() {
		var dw = resultsDiv.outerWidth();


		resultsDiv.animate({
			left: (dw * -1) + 'px'
		}, 500);
		$('#mapTopBar').animate({
			left: (0) + 'px'
		}, 500);
		$('#mapZoom').animate({
			left: (10) + 'px'
		}, 500);

		$("#closeMapButton i").removeClass('fa-chevron-left');
		$("#closeMapButton i").addClass('fa-chevron-right');
		resOpened = false;

	}

	function openPane() {
		var dw = resultsDiv.outerWidth();
		resultsDiv.animate({
			left: (0) + 'px'
		}, 500);
		$('#mapTopBar').animate({
			left: (dw) + 'px'
		}, 500);
		$('#mapZoom').animate({
			left: (dw + 10) + 'px'
		}, 500);

		$("#closeMapButton i").removeClass('fa-chevron-right');
		$("#closeMapButton i").addClass('fa-chevron-left');
		resOpened = true;


	}



	function align() {

		if ($("#bottomPane").css('display') == 'none') {
			$("#refine-button").html('refine');
			mobStatus = 'closed';
			$('#filters-pane').show();
			$('#properties-pane').show();
			$('#bottomPane').css({
				'bottom': '0px'
			});
			resultsDiv.addClass('hidden-sm hidden-xs');
			resultsDiv.css({
				'opacity': '1',
				'top': '0px'
			});
			if (resOpened) {
				openPane();
			} else {
				closePane();
			}
			$(".map-results").css('height', "100%");
			$(".map-results").css('min-height', (800) + "px");

		} else {
			if (mobStatus == "closed") {
				$('#bottomPane').css({
					'bottom': '0px'
				});

				$(".map-results").css('height', ($(window).height() - ($(".map-results").offset().top)) + "px");
				$(".map-results").css('min-height', ($(window).height() - ($(".map-results").offset().top)) + "px");


			}
		}
	}


	// mobile toggle
	function toggleMobFilters() {
		resultsDiv.css('left', '0px');
		openPane();
		closeProps();

		if (mobStatus != 'filters') {
			openFilters();
			mobStatus = 'filters';
			$('#bottomPane').animate({
				'bottom': '-50px'
			});

		} else {
			closeFilters();
			mobStatus = 'closed';
			$('#bottomPane').animate({
				'bottom': '0px'
			});
		}


	}

	function openFilters() {
		$('#filters-pane').show();
		$("#refine-button").html('close');
		resultsDiv.removeClass('hidden-sm hidden-xs');
		slideRes();
	}

	function closeFilters() {
		$('#filters-pane').hide();
		$("#refine-button").html('<img src="img/refine-icon.png"> refine');
		resultsDiv.addClass('hidden-sm hidden-xs');
	}


	function showMobProperties() {
		$('#filters-pane').hide();
		$("#refine-button").html('<img src="img/refine-icon.png"> refine');
		resultsDiv.css('left', '0px');
		openPane();
		openProps();
		mobStatus = "props";
		$('#bottomPane').animate({
			'bottom': '-50px'
		});
	}

	function hideMobProperties() {
		closeProps();
		$('#bottomPane').animate({
			'bottom': '0px'
		});
		mobStatus = "closed";
	}

	function openProps() {

		$('#properties-pane').show();
		resultsDiv.removeClass('hidden-sm hidden-xs');
		slideRes();
	}

	function closeProps() {

		$('#properties-pane').hide();
		resultsDiv.addClass('hidden-sm hidden-xs');
	}

	function slideRes() {
		resultsDiv.css({
			'opacity': '0',
			'top': '300px'
		});
		resultsDiv.animate({
			opacity: 1,
			'top': '0px'
		}, 300);
		// scroll to top?
		//goToTop();
	}

})();

//mob map search
(function() {

	$(document).ready(function() {

		$('#map-search-input').autocomplete({
			lookup: searchSuggestions,
			onSelect: function(obj) {
				$("#map search-input").val(obj.value);
			}
		});

	}); //ready



})();

// bootstrap filters show/hide events
(function() {
	$(document).ready(function() {
		$('#propFeatures').on('show.bs.collapse', function(e) {
			$(".propChevron").removeClass("fa-chevron-down").addClass("fa-chevron-up");
		});

		$('#propFeatures').on('hide.bs.collapse', function(e) {
			$(".propChevron").removeClass("fa-chevron-up").addClass("fa-chevron-down");
		});

		$('#advFilters').on('show.bs.collapse', function(e) {
			$(".advChevron").removeClass("fa-chevron-down").addClass("fa-chevron-up");
		});

		$('#advFilters').on('hide.bs.collapse', function(e) {
			$(".advChevron").removeClass("fa-chevron-up").addClass("fa-chevron-down");
		});
	});
})();


// CUSTOM - Rodan
$(document).ready(function() {
	$('.right-module a.collapse-btn').click(function() {
		$(this).parent().removeClass('expandPanel');
		$(this).parent().toggleClass('hidePanel');
	});
	$('.right-module a.expand-btn').click(function() {
		$(this).parent().toggleClass('expandPanel');
	});
});
