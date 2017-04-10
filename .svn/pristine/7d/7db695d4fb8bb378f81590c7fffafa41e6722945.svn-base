/**
 * Created by gupeiling on 2016/9/3.
 */
var isBandData=JSON.parse(localStorage.getItem('isBandData'));
var tokenid=getCookie('tokenid');
var tel=getCookie('tel_no');
$(function(){
     var dd=$(document).height();
     $('body').css("minHeight",dd);//设置body的高度
     if(isBandData.is_realname==0){//未实名时-->验证码按钮
          var length=$('ul.findProgress li').length;
          $('ul.findProgress>li').css('width',(100/length)+'%');
          $('ul.findProgress li').removeClass('selected').eq(0).addClass('selected');
     }else{//实名时-->身份证按钮
          $('ul.findProgress').prepend('<li ><img src="images/findtradepwd/idveri_red.png"/>身份验证</li>').find('li').eq(0).addClass('selected');
          var length=$('ul.findProgress li').length;
          $('ul.findProgress li').css({'width':100/length+'%'})
     }
})
     function backFun(){
          var index=$('ul.findProgress li.selected').index();
          if(isBandData.is_realname==0){
               window.history.back(-1);
          }else{
               if(index === 0){
                    window.history.back(-1);
               }else if(index ===1){
                    window.location.reload();
               }
          }
     }
     if(isBandData.is_realname==0){//未实名
          $('.nextDiv').css({'background-color':'#dcdcdc'}).attr('disable','disable');//“下一步”按钮置灰
          $('.header p').text('填写验证码');
          var template1=toTemplate('code');
          var data={};
          var formTel=tel.split('');
          formTel.splice(3,4,'****');
          data.logintel=formTel.join('');
          $('.findWrap').html('').append(Mustache.render(template1,data));//填写验证码框架
          $('#loginTel').text(data.loginTel);
          countdown({//倒计时发送
               dom: $('#send'),
               retryTxt: '重新发送',
               preDoing: function() { //倒计时条件判断
                    $.post(TOPAYJXCHECKCODE_JSON_URL,{
                         version:app_data.version,
                         tokenid:tokenid,
                         phone_number:tel,
                         type:32
                    },function(data){
                         if(data.code=='000'){
                              tip_window('我们已将验证码发送到您的手机，请注意查收','确定');
                         }else{
                              tip_window(data.msg,'确定');
                         }
                    })
                    return true;
               },
               cb: function() { //倒计时结束
               }
          });
          $('input.code-message').on('keyup',function(){
               if($(this).val().length>0){
                    $('.nextDiv').css({'background-color':'#f5004d'});
                    $('.nextDiv').removeAttr('disable');
               }else{
                    $('.nextDiv').css({'background-color':'#dcdcdc'});
                    $('.nextDiv').attr('disable','disable');
               }
          })
          $('.nextDiv').off('click').on('click',function(){//验证码的下一步按钮
               if($(this).attr('disable')=='disable'){
                    return false;
               }
               var checkCode=$('#codeMessage').val().trim();
               $.post(PLATFORMTRADECHECKCODE_JSON_URL, {
                    version: app_data.version,
                    tokenid: tokenid,
                    check_code: checkCode
               }).then(function(data){
                    if(data.code=='000'){
                         window.location.href="set_trade_pwd.html";
                    }else{
                         tip_window(data.msg,'确定');
                    }
               })
          })
     }else{//已实名
          var template=toTemplate('veri');//页面初始化追加身份证验证
          var dataId={idverifi:true}
          $('.findWrap').html('').append(Mustache.render(template,dataId));
          $('input[name=idCode]').click(function() {
               $('.keybordWrap').toggle();
          });
          $('.keybordWrap ul li').click(function(){//输入身份证号
               var id_input=$('input[name=idCode]').val();
               if($(this).attr('data-type')=='del'){//删除键
                    if(id_input.length>=1 && id_input!=''){
                         id_input=id_input.substr(0,id_input.length-1);
                         $('input[name=idCode]').val(id_input)
                    }
               }
               if($(this).attr('data-type')=='num'){//数字键
                    if(id_input.length>=18){
                         return false;
                    }
                    id_input=id_input+($(this).html());
                    $('input[name=idCode]').val(id_input)
               }
               if(tools.validate.IDCard(id_input)){
                    $('.keybordWrap').hide();
                    $('.nextDiv').css({'background-color':'#f5004d'});
               }else{
                    $('.nextDiv').css({'background-color':'#dcdcdc'});
               }
          })
          $('.idverifi').off('click').on('click',function(){//身份证的下一步按钮
               var idcode=$('input[name=idCode').val().trim();
               if(tools.validate.IDCard(idcode)){
                    $(this).css({'background-color':'#f5004d'});
                    $.post(FPT_VERIFICATIONIDCARD_JSON_URL,{//验证身份证号
                         version:app_data.version,
                         logintel:tel,
                         idcard:idcode,
                         tokenid:tokenid
                    }).then(function(data){
                         if(data.code == '000'){
                              $('ul.findProgress li').eq(1).addClass('selected').siblings().removeClass();//填写验证码tab高亮
                              $('.nextDiv').css({'background-color':'#dcdcdc'}).attr('disable','disable');//“下一步”按钮置灰
                              $('.header p').text('填写验证码')
                              var template1=toTemplate('code');
                              $('.findWrap').html('').append(Mustache.render(template1,data));//填写验证码框架

                            //   countdown({//倒计时发送
                            //        dom: $('#send'),
                            //        retryTxt: '重新发送',
                            //        preDoing: function() { //倒计时条件判断
                            //             $.post(TOPAYJXCHECKCODE_JSON_URL,{
                            //                  version:app_data.version,
                            //                  tokenid:tokenid,
                            //                  phone_number:tel,
                            //                  type:32
                            //             },function(data){
                            //                  if(data.code=='000'){
                            //                       tip_window('我们已将验证码发送到您的手机，请注意查收','确定');
                            //                  }else{
                            //                       tip_window(data.msg,'确定');
                            //                  }
                            //             })
                            //             return true;
                            //        },
                            //        cb: function() { //倒计时结束
                            //        }
                            //   });

                                $('#send').on('click',function(){
                                    tools.sendCodeDialog({//发送语音
                                        ele:'#send',
                                        url:TOPAYJXCHECKCODE_JSON_URL,
                                        logintel:tel,
                                        tipText:'我们已将验证码发送到您的手机，请注意查收',
                                        codeType:[32,'32_voice'],
                                    })
                                })
                              $('input.code-message').on('keyup',function(){
                                   if($(this).val().length>0){
                                        $('.nextDiv').css({'background-color':'#f5004d'});
                                        $('.nextDiv').removeAttr('disable');
                                   }else{
                                        $('.nextDiv').css({'background-color':'#dcdcdc'});
                                        $('.nextDiv').attr('disable','disable');
                                   }
                              })
                              $('.nextDiv').off('click').on('click',function(){//验证码的下一步按钮
                                   if($(this).attr('disable')=='disable'){
                                        return false;
                                   }
                                   var checkCode=$('#codeMessage').val().trim();
                                   $.post(PLATFORMTRADECHECKCODE_JSON_URL, {
                                        version: app_data.version,
                                        tokenid: tokenid,
                                        check_code: checkCode
                                   }).then(function(data){
                                        if(data.code=='000'){
                                             window.location.href="set_trade_pwd.html";
                                        }else{
                                             tip_window(data.msg,'确定');
                                        }
                                   })
                              })
                         }else{
                              tip_window(data.msg,'确定');
                              $('.idverifi').css({'background-color':'#dcdcdc'});
                              $('input[name=idCode]').val('');
                         }
                    },function(data){
                         tip_window('网络超时','确定');
                    })
               }
          })
     }



