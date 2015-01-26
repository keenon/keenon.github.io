// By Keenon Werling, 2015

$(document).ready(function() {
	var elems = $(".scrollbox");
	for (var i = 0; i < elems.length; i++) {
		var elem = $(elems[i]);
		elem.css({
			"z-index": i
		});
	}

	var leftArrow = $("#leftArrow");
	var rightArrow = $("#rightArrow");

	var scrollPosition = 0;
	var scrollThreshold = 3;
	var animating = false;

	var unselectedArrow = 0.5;

	function updateScrollPosition(delta) {
		scrollPosition += delta;
		if (scrollPosition < 0) scrollPosition = 0;
		if (scrollPosition > (elems.length-1))
			scrollPosition = (elems.length-1);
		refreshScrollboxes();
	}

	function refreshScrollboxes() {

		var docWidth = $(window).width();
		var docHeight = $(window).height();

		leftArrow.css({
			position: "fixed",
			top: (docHeight/2) - (leftArrow.height()/2),
			left: 20
		})

		rightArrow.css({
			position: "fixed",
			top: (docHeight/2) - (rightArrow.height()/2),
			left: docWidth - rightArrow.width() - 20
		})

		for (var i = 0; i < elems.length; i++) {
			var elem = $(elems[i]);
			var offset = scrollPosition - i;

			var linearOffset = Math.exp(offset/1.5);

			var scaleSize = linearOffset;

			elem.css({
				transform: "scale("+scaleSize+","+scaleSize+")",
				position: "fixed",
				left: 0,
				top: 0
			});

			var elemWidth = elem.width();
			var elemHeight = elem.height();

			var left = docWidth - ((docWidth/2)*linearOffset);
			var top = (docHeight/2)*linearOffset;

			elem.css({
				opacity: 1 - Math.abs(1 - linearOffset),
				left: left - (elemWidth/2),
				top: top - (elemHeight/2)
			});
		}

		if (scrollPosition > elems.length-1.1) {
			rightArrow.css({
				opacity: unselectedArrow
			})
		}
		if (scrollPosition < 0.9) {
			leftArrow.css({
				opacity: unselectedArrow
			})
		}
	}

	function tryScrollUp() {
		if (scrollPosition < elems.length-1.1) {
			animating = true;
			var lastScrollAnim = 0;
			$({scrollAnim: 0}).animate({scrollAnim: 1},
			{
				duration: 1000,
				step: function() {
					var deltaScrollAnim = this.scrollAnim - lastScrollAnim;
					updateScrollPosition(deltaScrollAnim);
					lastScrollAnim = this.scrollAnim;
				},
				complete: function() {
					animating = false;
				}
			})
		}
	}

	function tryScrollDown() {
		if (scrollPosition > 0.9) {
			animating = true;
			var lastScrollAnim = 0;
			$({scrollAnim: 0}).animate({scrollAnim: -1},
			{
				duration: 1000,
				step: function() {
					var deltaScrollAnim = this.scrollAnim - lastScrollAnim;
					updateScrollPosition(deltaScrollAnim);
					lastScrollAnim = this.scrollAnim;
				},
				complete: function() {
					animating = false;
				}
			});
		}
	}

	function introAnimation() {
		animating = true;
		$({scrollAnim: -0.05}).animate({scrollAnim: 0.0},
		{
			duration: 1000,
			step: function() {
				scrollPosition = this.scrollAnim;
				refreshScrollboxes();
			},
			complete: function() {
				animating = false;
			}
		});
	}

	$(window).scroll(function() {
		var st = $(this).scrollTop();
		$(this).scrollTop(0);
		$(this).scrollLeft(0);
		if (st < -scrollThreshold && !animating) {
			tryScrollDown();
		}
		else if (st > scrollThreshold && !animating) {
			tryScrollUp();
		}
	})

	leftArrow.mousedown(function() {
		tryScrollDown();
	})

	leftArrow.mouseover(function() {
		if (scrollPosition > 0.9) {
			leftArrow.css({
				opacity: 1.0
			})
		}
	})

	leftArrow.mouseout(function() {
		leftArrow.css({
			opacity: unselectedArrow
		})
	})
	leftArrow.mouseout();

	rightArrow.mousedown(function() {
		tryScrollUp();
	})

	rightArrow.mouseover(function() {
		if (scrollPosition < elems.length-1.1) {
			rightArrow.css({
				opacity: 1.0
			})
		}
	})

	rightArrow.mouseout(function() {
		rightArrow.css({
			opacity: unselectedArrow
		})
	})
	rightArrow.mouseout()

	$(window).resize(function() {
		refreshScrollboxes();
	})

	$(window).resize();

	introAnimation();

	// refreshScrollboxes();
})
