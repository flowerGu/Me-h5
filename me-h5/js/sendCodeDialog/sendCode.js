/**
 *短信，语音验证码弹框
 *opts = {
          url:a,
          logintel:d,
          check_code_key:b,
          ans_posi:c,
          ele:dom ,
          slideInit:[cb,锁元素,滑块初始化],
          tipText://提示文字,
          tipType://提示文字弹框显示传方法时不用传此属性，元素文字需传dom节点
        }
 **/
tools.sendCodeDialog = function(opts){
    var str = '<div class="sendCodeWrap">\
                  <div class="sendBg">\
                  </div>\
                  <div class="sendContainer">\
                    <p>短信验证码</p>\
                    <p>语音验证码</p>\
                    <p>取消</p>\
                  </div>\
                </div>',
        $html = $(str),
        sendBtn = $html.children('.sendContainer').find('p'),
        url = opts.url || GETSENDMSGCODE,
        check_code_key = opts.check_code_key || '',
        ans_posi = opts.ans_posi || '',
        logintel = opts.logintel,
        ele = opts.ele,
        tipType = opts.tipType,
        tipText = opts.tipText || '验证码已发送';
        opts.codeType.map(function(data,i){
            sendBtn.eq(i).attr('data-type', opts.codeType[i]);
        });
        sendBtn.off('click.gpl').on('click.gpl',function(){//弹框类型发送
            $(this).css({'color':'#fa4949'});
                $html.fadeOut()
                if($(this).data('type')){
                    var type = $(this).data('type');
                    var obj_phone_number = {
                        type:type,
                        check_code_key:check_code_key,
                        ans_posi:ans_posi,
                    };
                    if(url != GETSENDMSGCODE ){
                        obj_phone_number.phone_number = logintel;
                    }else{//注册，邀请注册，忘记登录密码
                        obj_phone_number.logintel = logintel;
                    }

                    //添加事件
                    countdown({
                        dom:ele,
                        retryTxt:'免费获取',
                        preDoing:function(){
                            var is = true;
                                ajax({
                                    url:url,
                                    async: false,
                                    data:  obj_phone_number,
                                    cb:function(data){
                                            if(typeof tipType == 'string'){
                                                $(tipType).text(tipText);
                                            }else{
                                                tip_window(tipText,'确定')
                                            }
                                        return false;
                                    },
                                    dialog:function(data,code){
                                        if(code == 'CC_01'){
                                            if(check_code_key && ans_posi){
                                                opts.slideInit[0]();
                                                $(opts.slideInit[1]).attr("src","./images/passLock_03.jpg")
                                                $(opts.slideInit[2]).removeClass("isPassed").removeAttr('data-choosed').css("left",0);
                                            }
                                            tip_window('验证码失效，请重新选择答案','确定');
                                        }else{
                                            tip_window(data,'确定');
                                            if(check_code_key && ans_posi){
                                                opts.slideInit[0]();
                                                $(opts.slideInit[1]).attr("src","./images/passLock_03.jpg")
                                                $(opts.slideInit[2]).removeClass("isPassed").removeAttr('data-choosed').css("left",0);
                                            }
                                        }
                                        is =  false;
                                    }
                                })
                                return is;
                        },
                    })
                    $(ele).trigger('click.yyj');
                    $(ele).off('click.yyj');
                }
        })
      if($('.sendCodeWrap').length !=0){
        $('body').find('.sendCodeWrap').fadeIn();
        $('.sendCodeWrap').find('p').css({'color':'#585858'});
      }else{
        $(document.body).append($html);
        $html.fadeIn();
      }
}