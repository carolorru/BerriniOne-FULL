$(document).ready(function () {
  var gallery = {};

  gallery.component = $('.gallery');
  gallery.page = $('.gallery .page>div');
  gallery.item = $('.gallery .item');
  gallery.attr = '';


  gallery.itemHeight = function() {
    var totalWidth = $(window).width();
    var itemHeight;
    
    if (totalWidth < 992) {
      itemHeight = 'auto';
    } else {
      itemHeight = totalWidth * (822/1922);
    }
    
    
    return itemHeight;
  };

  gallery.itemOpen = function($_this) { 
    $_this.find('.img').addClass('active');      
    gallery.item.find('[data-gallery='+gallery.attr+']').addClass('active');  
    gallery.item.css({
      'transition': 'opacity 1s, height .8s ease',
      '-webkit-transition': 'opacity 1s, height .8s ease',
      'height': gallery.itemHeight,
      'opacity': '1'
    });
  };

  gallery.itemClose = function() {    
    gallery.item.css({
      'transition': 'opacity 1s, height .8s ease',
      '-webkit-transition': 'opacity 1s, height .8s ease',
      'height': '0px',
      'opacity': '0px'
    });
    gallery.page.find('.img').removeClass('active');
    setTimeout(function() { gallery.item.find('>div').removeClass('active'); }, 1000);
    
  };

  gallery.itemChange = function($_this) {
    gallery.page.find('.img').removeClass('active')
    gallery.item.find('>div').fadeOut().removeClass('active');

    $_this.find('.img').addClass('active');        
    gallery.item.find('[data-gallery='+gallery.attr+']').fadeIn().addClass('active');
  };

  gallery.pageEvent = function() {
    gallery.page.on('click', function() {
      var $_this = $(this);
      gallery.attr =  $_this.attr('data-index-gallery');

      // if any item has active class call itemOpen function
      if(gallery.component.find('.page div.active').length == 0){
        gallery.itemOpen($_this);
      } 
      // else we have to check if we need to close or change this item
      else {
        if ($_this.find('.img').hasClass('active')) {
          gallery.itemClose();
        } else {
          gallery.itemChange($_this);
        }
      }
    });

    gallery.item.find('a.close').on('click', function() {
      gallery.itemClose();
    });  
  };

  gallery.init = function() {
    
    gallery.item.height(gallery.itemHeight);
    
    $( window ).resize(function() {
      if(gallery.component.find('.page div.active').length != 0){
        gallery.item.height(gallery.itemHeight);
      }
    });  

    gallery.pageEvent();

  };
  gallery.init();
});

            
