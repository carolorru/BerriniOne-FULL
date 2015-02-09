$(document).ready(function () {
	var links = $('ul.navbar-nav li a')
		_document = $(document)
		navScroll = {};

	navScroll.onScroll = function(){

		var scrollPos = _document.scrollTop();
	    
	    links.each(function () {
	        
	        var currLink = $(this);
	        var refElement = $(currLink.attr("attr-href")).find('>.title');
	        
	        if (refElement.offset().top - 80 <= scrollPos && refElement.offset().top - 80 + refElement.parent().height() > scrollPos) {
	            
	            links.removeClass("active");
	            currLink.addClass("active");

	        }
	        else{
	            currLink.removeClass("active");
	        }
	    });

	};

	navScroll.setup = function(){
		_document.on('scroll', navScroll.onScroll);

		links.each(function(){		
			var target;

			$(this).on('click', function(e){
				e.preventDefault();

				$('a').each(function () {
	    			$(this).removeClass('active');
				})
				$(this).addClass('active');
				$('.navbar-toggle').click();

				target = $(this).attr('attr-href');
				
				$('html, body').stop().animate({
					'scrollTop': $(target+'>.title').offset().top - 80
				}, 500, 'swing');
			});
		});

	};

	navScroll.setup();
});