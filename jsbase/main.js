/*
@liscence
Main JavaScript Source - Jquery and Jquery UI is needed
Author: Alexander Wattenbach 
a.wattenbach@pd-sound-lights.de

Released under MIT license
*/
$(document).ready(function(){
  // render movment conntrolls
  renderControlls();
  // render preloader
  $(".element_list").preloader();
  // render elemets sortable
  renderSortableItems();
  // render elements at page start
  renderElements();
});
function renderSortableItems() {
  $("section").sortable({
    connectWith: 'section',
    placeholder: 'element_container_placeholder',
    dropOnEmpty: true,
    tolerance: "pointer",
    delay: 300,
    revert: 300,
    opacity: 0.6,
    cancel: '#element_container_dummy',
    scrollSensitivity: 100,
    scrollSpeed: 10,
    cursorAt: { left: 100, top: 60 },
    start: function (event,ui) {
      var oldParentFolder= $(ui.item).closest("section").attr("id");
      var oldOrder = [];
      $('#' + oldParentFolder + ' article').each(function(){
        if (this.id != $(ui.item).attr("id")) {
          oldOrder.push(this.id);
        }
      });
      $("#"+oldParentFolder+"_desc").fadeIn("slow", function() {
        var n = parseInt($("#"+oldParentFolder+"_desc .element_count").text(), 10);
        var new_count = n-1;
        $("#"+oldParentFolder+"_desc .element_count").fadeIn("slow").text(new_count);
        if (new_count == "0") {
          $("#"+oldParentFolder+" #element_container_dummy").fadeIn();
        }
      });
    $.get("methods/saveToDatabase.php",{'newOrder': oldOrder.toString(), 'destParent': oldParentFolder},function(data){
        $('#debug').append(data);
      });
      },stop : function (event,ui) {
      var newParentFolder= $(ui.item).closest("section").attr("id");
      var elementID= $(ui.item).attr("id");
      var newOrder = [];
      $(ui.item).find('div').height('auto').slideDown();
      $("#"+newParentFolder+" #element_container_dummy").fadeOut();
      $('#' + newParentFolder + ' article').each(function(){
        newOrder.push(this.id);
      });
      $("#"+newParentFolder+"_desc").fadeIn("slow", function() {
        var n = parseInt($("#"+newParentFolder+"_desc .element_count").text(), 10);
        var new_count = n+1;
        $("#"+newParentFolder+"_desc .element_count").fadeIn("slow").text(new_count);
      });
    $.get("methods/loadElement.php",{'reloadMovementControlls': '1', 'folder_id': newParentFolder.replace('folder_', ''),'elementID': elementID.replace('container_', '')},function(data){
        $("#"+newParentFolder+" .movement_controlls").html(data);
      });
    $.get("methods/saveToDatabase.php",{'newOrder': newOrder.toString(), 'destParent': newParentFolder},function(data){
        $('#debug').append(data);
      });
    }
  });
  $(".element_list").disableSelection();
}
function renderElements() {
  $(".element_list article").each(function(index) {
    if ($(this).attr("id") != "element_container_dummy") {
      $(this).delay(100*index).fadeIn(1500);
    }
  });
}
function renderControlls() {
  $('.element_container').hover(function() {
    clearTimeout($(this).data('timeout'));
    $(this).find('div').height('auto').slideDown(300);
    }, function() {
    var elementID = $(this);
    var t = setTimeout(function() {
      $(elementID).find('div').slideUp(300);
    }, 400);
    $(this).data('timeout', t);
  });
}
function moveElementWithArrows(direction, targetElement, targetFolder, parentFolder, elementID) {
  $(function() {
  if (direction == "left") { $("#"+targetElement+"").fadeTo("normal", 0.33).animate({"left": "-=600px"}, "normal").fadeOut(300);
    }
  if (direction == "right") { $("#"+targetElement+"").fadeTo("normal", 0.33).animate({"right": "-=600px"}, "normal").fadeOut(300);
    }
  if (direction == "top") { $("#"+targetElement+"").fadeTo("normal", 0.33).animate({"top": "-=600px"}, "normal").fadeOut(300);
    }
  if (direction == "bottom") { $("#"+targetElement+"").fadeTo("normal", 0.33).animate({"bottom": "-=600px"}, "normal").fadeOut(300);
    }
    setTimeout(function(){ $("#"+parentFolder+" #"+targetElement+"").remove();
    },1000);
    $("#"+targetFolder+" #element_container_dummy").fadeOut(600);
    var randomNo = Math.floor(Math.random()*9999999);
    // prevent stupid caching by adding random numbers to url
    $.get("methods/loadElement.php?folder_id="+parentFolder+"&element_id="+elementID+"&move_to="+targetFolder+"&random="+randomNo+"", function(data) {
      $("#"+targetFolder+"").append(data);
      $("#"+targetFolder+" #container_"+elementID+"").delay(600).fadeIn(600);
      renderControlls();
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
        $("#"+parentFolder+" #element_container_dummy").delay(1000).fadeIn(600);
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
        $(this).css({ visibility : 'visible',  opacity : 1 });
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