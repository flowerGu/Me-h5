/***
 * 
 */

document.body.addEventListener('touchstart', function () {
  return false;
})

window.onload = function () {

  document.getElementById('loading').className = 'loading';

  //
  var swiper = new Swiper('#swiper-container', {
    pagination: '#pagination',
    direction: 'vertical',
    // preloadImages: false,
    // lazyLoading: true,
    cube: {
      slideShadows: true,
      shadow: true,
      shadowOffset: 20,
      shadowScale: 0.94
    },
    onInit: function (swiper) {
      swiperAnimateCache(swiper); //隐藏动画元素 
      swiperAnimate(swiper); //初始化完成开始动画
    },
    onSlideChangeEnd: function (swiper) {
      swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
    }
  });

  swiper.on('ReachEnd', function (swiper) {
    console.log(swiper.isEnd)
  });

};

