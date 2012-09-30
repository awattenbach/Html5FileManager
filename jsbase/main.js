/*
 @liscence
 Main JavaScript Source - Jquery is needed

 Author: Alexander Wattenbach <a.wattenbach@pd-sound-lights.de>
*/

$(document).ready(function(){
	$("a#show-panel").click(function(){
		$("#lightbox, #lightbox-panel").fadeIn(300);
	})
	$("a#close-panel").click(function(){
		$("#lightbox, #lightbox-panel").fadeOut(300);
	})
	$(".element_container").hover(function() { 
	  $(this).find('div').height('auto').slideDown();
		}, function() { 
		  $(this).find('div').show().slideUp();
		})
	$(".element_list").preloader();
});

function MoveElement(direction, targetElement, targetFolder, parentFolder, elementID) {
  $(function() { 
  	if (direction == "left") { $("#"+targetElement+"").fadeTo("normal", 0.33).animate({"left": "-=600px"}, "normal").fadeOut(300); }
  	if (direction == "right") { $("#"+targetElement+"").fadeTo("normal", 0.33).animate({"right": "-=600px"}, "normal").fadeOut(300); }
  	if (direction == "top") { $("#"+targetElement+"").fadeTo("normal", 0.33).animate({"top": "-=600px"}, "normal").fadeOut(300); }
  	if (direction == "bottom") { $("#"+targetElement+"").fadeTo("normal", 0.33).animate({"bottom": "-=600px"}, "normal").fadeOut(300); }
  	setTimeout(function(){ $("#"+targetElement+"").remove(); },1000);
		$("#no_content_"+targetFolder+"").fadeOut(600);
		var randomNo = Math.floor(Math.random()*9999999); // prevent stupid caching by adding random numbers to url
		$.get("loadElement.php?folder_id="+parentFolder+"&element_id="+elementID+"&move_to="+targetFolder+"&random="+randomNo+"", function(data) { 
		   $("#"+targetFolder+"").append(data); 
		   $("#"+targetFolder+" .element_container").delay(600).fadeIn(600);
		   $(".element_container").hover(function() { 
		   $(this).find('div').height('auto').slideDown();
			 }, function() { 
			   $(this).find('div').show().slideUp();
			 });
		}); 

  	$("#"+targetFolder+"_desc").fadeIn("slow", function() { 
  		var n = parseInt($("#"+targetFolder+"_desc .element_count").text(), 10); 
  		var new_count = n+1;
  		$("#"+targetFolder+"_desc .element_count").fadeIn("slow").text(new_count);
  	});
  	
    $("#"+parentFolder+"_desc").fadeIn("slow", function() { 
    	var n = parseInt($("#"+parentFolder+"_desc .element_count").text(), 10); 
    	var new_count = n-1;
    	$("#"+parentFolder+"_desc .element_count").fadeIn("slow").text(new_count); 
			if (new_count == "0") {
				$("#no_content_"+parentFolder+"").delay(1000).fadeIn(600);
			}
    });
    
  });
}

// Image Preloader
$.fn.preloader = function(options) {
	var defaults = {
		onDone : function() {
		},
		onEachLoad : function(img) {
		},
		onLoadError : function(img) {
		},
		fadeIn : 500,
		delay : 100,
		interval : 200,
		parentWrap : 'a',
		loader : 'images/layout/loading.gif'
	},
	options= $.extend(defaults, options),
	images= $(this).find('img'),
	loaderCss = {
		background : 'url(' + options.loader + ') 50% 50% no-repeat',
		display : 'inline-block'
	},
	delayTime = 0
	loadError = false;
	
	images.css({
		visibility : 'visible',
		opacity : 0
		}).each(function() {
				if($(this).parent(options.parentWrap).length) 
						$(this).parent(options.parentWrap).css(loaderCss);
				else 
						$(this).wrap('<a class="unwrap"/>').parent().css(loaderCss);
		});
	  var timer = setInterval(function() {
					init();
			}, options.interval);
	  init = function() {
		images = images.filter(function() {
		
				this.onerror = function() {
						loadError = true;
				};                              
				
				if(loadError == 1) {
			
					$(this).css({ visibility : 'visible',   opacity : 1 });
					
					if($(this).parent().hasClass('unwrap')) 
						$(this).unwrap();
					else 
						$(this).parent().attr('style', '');	
					options.onLoadError($(this));
					return null;                                    
				} else if(this.complete && this.naturalWidth !== 0) {                           
				
					delayTime = delayTime + options.delay;
					$(this).css({ visibility : 'visible' })
						.delay(delayTime).animate({ opacity : 1 }, options.fadeIn, function() {
					
							if($(this).parent().hasClass('unwrap')) 
									$(this).unwrap();
							else 
									$(this).parent().attr('style', '');
									
							options.onEachLoad($(this));
						});
				} else
					return this;
			}
		);
		if(images.length == 0) {
			clearInterval(timer);
			options.onDone();
		}               
	};
}