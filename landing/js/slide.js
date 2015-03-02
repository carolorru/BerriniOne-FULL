var slide = {},
    slidesInterval;

slide.maxWidth = $(window).width();
slide.maxSlides = $('.slides>div').size() - 1;
slide.actualNum = parseInt($('.slides>div.active').attr('data-slide'));

slide.transition = function(actual, next, direction, transitions) {
  //console.log(actual, next, direction, transitions);
  $('[data-slide='+ actual +']').stop().animate({
    left: (slide.maxWidth * 0.5 * transitions)+'px',
    opacity: 0    
  }, 1000, function(){
    $('.slides>div').css({'z-index': '+=1'});
    $('[data-slide='+ actual +']').removeClass('active').addClass(direction).css({'left':'0', 'opacity':'1', 'z-index': '-=4'});
    $('[data-slide='+ next +']').removeClass(direction).addClass('active');
  });
    
}

slide.showNext = function() {
  if(slide.actualNum != slide.maxSlides){
    slide.transition(slide.actualNum, slide.actualNum+1, 'next', -1);
    slide.actualNum = slide.actualNum+1;
  } else {
    slide.transition(slide.actualNum, 1, 'next', -1);
    slide.actualNum = 1;
  }
}

slide.showPrev = function() {
  if(slide.actualNum != slide.maxSlides){
    slide.transition(slide.actualNum, slide.actualNum+1, 'prev', 1);
    slide.actualNum = slide.actualNum+1
  } else {
    slide.transition(slide.actualNum, 1, 'prev', 1);
    slide.actualNum = 1;
  }
}

slide.intervalPlay = function() {
  slidesInterval = setInterval(function() { slide.showNext(); }, 4000);
}

slide.intervalStop = function() {
  clearInterval(slidesInterval);
}

slide.mouseEvent = function() {
  $('.slides').on('mouseenter', function(){
    slide.intervalStop();
   // console.log('mouseenter');
  }).on('mouseleave', function(){
    slide.intervalPlay();
   // console.log('mouseleave');
  });
}

slide.btnEvents = function() {
  $('.bt-prev').off().on('click', function(){
    slide.showPrev();
  });

  $('.bt-next').off().on('click', function(){
    slide.showNext();
  });
}

slide.init = function(){
  slide.intervalPlay();
  slide.mouseEvent();
  slide.btnEvents();
}

slide.init();