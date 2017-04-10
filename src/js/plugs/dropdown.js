'use strict';
/**
 * 下拉显示 Me金融服务由民信技术中心提供 之类的
 * 没卵用
 * @import './core/y-dropload';
 *   <div id="y_dropload_msg" class="y-dropload-message">
    <p class="y-dropload-message-title">Me金融服务由民信技术中心提供</p>
    <div class="y-message-time">
      <img src="images/refresh.png" alt="" class="y-dropload-message-logo">
      <p class="y-message-content">懂money的少数派</p>
      <p><span>最近更新时间：</span><span id="y_dropload_msg_time"></span></p>
    </div>
  </div>
 */

function dropDown() {

    var currTop = 0;
    var dom = document.getElementById('dropload');
    var startY, currentY;
    var startScrollTop;
    var status = '';
    var translate;
    var timeDom = document.getElementById('y_dropload_msg_time');
    timeDom.innerText = tools.dateFormat('yyyy-MM-dd HH:mm:ss');

    var dpr = $('html').data('dpr') || 1;

    var options = {
        topDistance: 101 * dpr,
        fixedPos: 100 * dpr,
        maxDistance: 300 * dpr,
        holdTime: 2000,
        cb: null
    };

    /*
     *
     */
    function getScrollTop(ele) {
        if (ele === undefined) {
            return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
        } else {
            return ele.scrollTop;
        }
    }

    function setPosition() {
         dom.style.transform = 'translate3d(0, ' + translate + 'px, 0)';
         //dom.style.transitionDelay = '3s'
        // dom.animate({
        //     transform : 'translate3d(0, ' + translate + 'px, 0)'
        // })
    }

    dom.addEventListener('touchstart', function (event) {
        $('#y_dropload_msg').addClass('active');
        startY = event.touches[0].clientY;
        startScrollTop = getScrollTop();
    })
    dom.addEventListener('touchmove', function (event) {
        currentY = event.touches[0].clientY;
        var distance = currentY - startY;
        var direction = distance > 0 ? 'down' : 'up';
        if (status !== 'loading' && getScrollTop() === 0 && direction === 'down') {
            event.preventDefault();
            event.stopPropagation();
            translate = distance - startScrollTop;
            status = translate >= options.topDistance ? 'drop' : 'pull';
            if (translate < options.maxDistance) {
                setPosition();
            }
        }

    })
    dom.addEventListener('touchend', function () {
        if (status === 'drop') {
            translate = options.fixedPos;
            status = 'loading';
            if (typeof options.cb === 'function') {
                options.cb();
            }
            else {
                setTimeout(function () {
                    timeDom.innerText = tools.dateFormat('yyyy-MM-dd HH:mm:ss');
                    status = '';
                    translate = 0;
                    setPosition();
                }, options.holdTime);
            }
        }
        else {
            translate = 0;
            status = 'pull';
        }
        setPosition();
    });
};

$(window).on('load', dropDown);



// function dropdown() {

// }
// dropdown.prototype = {

// };




