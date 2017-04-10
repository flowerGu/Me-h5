'use strict';

/**
 * 键盘-最简单的
 * 不好的插件设计
 * todo 自定义按键内容（随机数字等）
 * IOS 微信下，按键闪烁
 * 
 * $(selector).keyboard({
 *   cb:function(){
 *     switch(val){
        case 'del':
          if(currIndex<1){
            return;
          }
          $pwdInput[--currIndex].value='';
          break;
        case 'close':
          $keyboard.keyboard('hide');
          break;
        default:
          if(currIndex > 5){
            return;
          }
          $pwdInput[currIndex++].value=val;
          if(currIndex===6){
            $keyboard.keyboard('hide');
          }
          break;
      }
 *   }
 * })
 */

(function ($) {

  var setup = function(){
    var _this=arguments[0];
    var options=arguments[1];

    var str = '<ul class="keyboard clearfix">';

    for(var i=1,len=10;i<len;i++){
      str+='<li data-val="'+i+'">'+i+'</li>';
    }
    str+='<li data-val="close">取消</li></li><li data-val="0">0</li><li data-val="del" class="del">';
    str+='</ul>';
    _this.append(str);
    
    // todo 安装的时候把选项保存到dom对象上
    var placeholder = $('<div class="keyboard-placeholder"/>');
    placeholder.height(_this.height());
    _this.data('placeholder',placeholder);
    $(placeholder).insertAfter(_this);

    _this.on('click','ul>li',function(){
      var _this = $(this);
      options.cb(_this.data('val'))
    });
    if($.isFunction(options.ready)){
      options.ready(_this);
    }
  }

  var methods = {
    init: function (options) {
      return this.each(function () {
        setup($(this),options);
      });
    },
    show:function(){
      var _this=$(this);
      _this.addClass('active');
      _this.data('placeholder').css('display','block');
      // todo,指定滚动div  默认body
      $('#main').scrollTop(_this.offset().top);

      $(document).on('touchstart.keyboard',function(e){
        if($(e.target).parents('.keyboard').length===0){
          methods.hide.apply(_this[0]);
        }
      });

      return this;
    },
    hide:function(){
      $(this).removeClass('active');
      $(this).data('placeholder').css('display','none');
      $(document).off('touchstart.keyboard');
      return this;
    },
    destroy:function(){
      return this.each(function() {
				$(this).off('click').remove();
			});
    }

  };


  $.fn.keyboard = function () {
    var method = arguments[0];
    if (methods[method]) {
      method = methods[method];
    } else if (typeof (method) == 'object' || !method) {
      method = methods.init;
    } else {
      $.error('jQuery.keyboard 没有 ' + method + ' 方法 ');
      return this;
    }
    return method.apply(this,arguments);
  }

})(window.jQuery);

