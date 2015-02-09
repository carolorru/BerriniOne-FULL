var slide = {},
    slidesInterval;

slide.maxWidth = $(window).width();

slide.carouselItem = function(carousel) {  
  slide.maxSlides = carousel.find('>div').size() - 1;
  slide.actualNum = parseInt(carousel.find('>div.active').attr('data-slide'));
}


slide.transition = function(actual, next, direction, transitions, carousel) {
  //console.log(actual, next, direction, transitions);
  $('[data-slide='+ actual +']').stop().animate({
    left: (slide.maxWidth * 0.5 * transitions)+'px',
    opacity: 0    
  }, 1000, function(){
    carousel.find('>div').css({'z-index': '+=1'});
    $('[data-slide='+ actual +']').removeClass('active').addClass(direction).css({'left':'0', 'opacity':'1', 'z-index': '-='+slide.maxSlides+' '});
    $('[data-slide='+ next +']').removeClass(direction).addClass('active');
  });
    
}

slide.showNext = function(carousel) {
  if(slide.actualNum != slide.maxSlides){
    slide.transition(slide.actualNum, slide.actualNum+1, 'next', -1, carousel);
    slide.actualNum = slide.actualNum+1;
  } else {
    slide.transition(slide.actualNum, 1, 'next', -1, carousel);
    slide.actualNum = 1;
  }
}

slide.showPrev = function(carousel) {
  if(slide.actualNum != slide.maxSlides){
    slide.transition(slide.actualNum, slide.actualNum+1, 'prev', 1, carousel);
    slide.actualNum = slide.actualNum+1
  } else {
    slide.transition(slide.actualNum, 1, 'prev', 1, carousel);
    slide.actualNum = 1;
  }
}

slide.intervalPlay = function(carousel) {
  slidesInterval = setInterval(function() { slide.showNext(carousel); }, 4000);
}

slide.intervalStop = function() {
  clearInterval(slidesInterval);
}

slide.mouseEvent = function(carousel) {
  carousel.on('mouseenter', function(){
    slide.intervalStop();
   // console.log('mouseenter');
  }).on('mouseleave', function(){
    slide.intervalPlay(carousel);
   // console.log('mouseleave');
  });
}

slide.btnEvents = function(carousel) {
  $('.bt-prev').off().on('click', function(){
    slide.showPrev(carousel);
  });

  $('.bt-next').off().on('click', function(){
    slide.showNext(carousel);
  });
}

slide.init = function(carousel){
  slide.carouselItem(carousel);
  slide.intervalPlay(carousel);
  slide.mouseEvent(carousel);
  slide.btnEvents(carousel);
}

slide.init($('#slide-01'));
slide.init($('#slide-02'));