var pass_word='';var rePass_word='';var passwords = $('#password').get(0);var temp_mopassword='';var tokenid=getCookie('tokenid');
var modify=getQueryString('modify');//修改交易密码
function backFn(){
     var disable2=$('#btn_next2').css('display');//确认密码显示
     var disable1=$('#btn_next').css('display');//设置交易密码显示
     if(modify==1){//修改交易密码后退
          if(disable2=='none' && disable1=='none'){//当处于输入原始密码状态时，回退到上一页面
               goBack();
          }else if(disable1=='block'){//当处于设置状态时，回退到页面最初
               window.location.reload();
          }else if(disable2=='block'){//当处于确认密码状态时，回退到设置密码
               $('#btn_next_mondify,#forget,#btn_next2').css({'display':'none'});
               $('#btn_next').css({'display':'block'});
               $('#tiptext').text('设置新交易密码');
               $('#tiptext2').text('输入交易密码')
               for(var i=0;i<passwords.elements.length;i++){
                    $(passwords.elements[i]).val('');
               }
               pass_word='';
               rePass_word='';
          }
     }else{//设置交易密码后退
          if(disable2=='none'){
               goBack();
          }else{
               window.location.reload();
          }
     }
}
$(function(){
     test_tokenid();
     var character;	$("#password").attr("disabled",true);
     if(modify=='1'){//修改交易密码
          $('title').text('修改交易密码');
          $('#tiptext').text('输入原始交易密码');
          $('#btn_next_mondify,#forget').css({'display':'block'});
          $('#btn_next').css({'display':'none'});
     }else{
          $('#btn_next_mondify').css({'display':'none'});
          $('#btn_next').css({'display':'block'});
     }
     $('#keyboard li').click(function(){//虚拟键盘点击
          if ($(this).attr('data-type')=='del') {
               for(var i= 0,len=passwords.elements.length-1;len>=i;len--){
                    if($(passwords.elements[len]).val()!=''){
                         $(passwords.elements[len]).val('');
                         break;
                    }
               }
               return false;
          }
          if ($(this).attr('data-type')=='num'){
               character = $(this).text();
          }
          for(var i= 0,len=passwords.elements.length;i<len;i++){
               if(($(passwords.elements[i]).val()== null ||$(passwords.elements[i]).val()==undefined||$(passwords.elements[i]).val()=='')&& character !=undefined){
                    $(passwords.elements[i]).val(character);
                    break;
               }
          }
          if(!($(passwords.elements[5]).val()== null ||$(passwords.elements[5]).val()==undefined||$(passwords.elements[5]).val()=='')) {
               if(pass_word!==''){//最后确认交易密码输入
                    var temp_rePass_word = '';
                    for (var i = 0; i < passwords.elements.length; i++) {
                         temp_rePass_word += $(passwords.elements[i]).val();
                    }
                    rePass_word = temp_rePass_word;
               }
          }
          return false;
     });
     $("#btn_next").click(function(){//设置交易密码时的下一步按钮操作
          var temp_password='';
          for(var i=0;i<passwords.elements.length;i++){
               temp_password+=$(passwords.elements[i]).val();
               $(passwords.elements[i]).val('');
          }
          if(temp_password.length<6){
               $('#tiptext2').text('交易密码不能小于6位数字');
               return false;
          }
          if(modify==1 && hex_md5(temp_password)==hex_md5(temp_mopassword)){
               $('#tiptext2').text('新密码与旧密码不能一致,请重新输入');
               return false;
          }
          pass_word=temp_password;
          $('#tiptext2').text('再次确认交易密码');
          $('#tiptext,title').text('确认交易密码');
          $(this).hide();
          $('#btn_next2').show();
     });
     $('#btn_next2').on('click',function(){//判断交易密码是否一致
          if(rePass_word!=''&& hex_md5(pass_word)==hex_md5(rePass_word)){//两次密码一致
               $('#tiptext2').text('两次输入一致');
               $("#password").attr("disabled",true);
               if(modify==1){//修改交易密码
                    $.post(PLATFORMTRADEPWD_JSON_URL,{
                         version:app_data.version,
                         tokenid:tokenid,
                         trade_id:hex_md5(pass_word)
                    }).then(function(data){
                         if(data.code=='000'){
                              $('.keybordWrap').hide();
                              var historyPage=document.referrer;
                              if(historyPage.indexOf('account_details.html')>=0 || historyPage==''){//修改交易密码入口
                                   tools.dialog({
                                        title:'设置成功',
                                        content:'恭喜您：设置成功，快去出借并获得收益吧！！',
                                        btn:['返回我的账户','出借'],
                                        cb:['myWealth.html','index.html']
                                   })
                              }else{//历史页
                                   window.location.href=historyPage;
                              }
                         }
                    },function(data){
                         tip_window('网络超时','确定');
                    })
               }else{//设置交易密码
                    $.post(PLATFORMTRADEPWD_JSON_URL,{
                         version:app_data.version,
                         tokenid:tokenid,
                         trade_id:hex_md5(pass_word)
                    }).then(function(data){
                         if(data.code=='000'){
                              $('.keybordWrap').hide();
                              $.post(JD_SAFEAUTH_JSON_URL,{
                                   version:app_data.version,
                                   tokenid:tokenid
                              }).then(function(data){
                                   if(data.code=='000'){
                                        var isBandData=JSON.parse(localStorage.getItem('isBandData'));
                                        isBandData.plat_trapwd_status=data.plat_trapwd_status;
                                        window.localStorage.setItem('isBandData',JSON.stringify(isBandData));
                                        var historyPage=document.referrer;
                                        var hisArr=['account_details.html','FindTradePwd.html','set_trade_pwd.html'];
                                        var isExist=false;//判断条件
                                        for(var i=0,len=hisArr.length;i<len;i++){
                                             if(historyPage.indexOf(hisArr[i])>-1){
                                                  isExist=true;
                                                  break;
                                             }
                                        }
                                        if(isExist || historyPage===''){//设置交易密码入口
                                             tools.dialog({
                                                  title:'设置成功',
                                                  content:'恭喜您：设置成功，快去出借并获得收益吧！！',
                                                  btn:['返回我的账户','出借'],
                                                  cb:['myWealth.html','index.html']
                                             })
                                        }else{//历史页
                                             window.location.href=historyPage;
                                        }
                                   }

                              })

                         }
                    },function(data){
                         tip_window('网络超时','确定');
                    })
               }
          }else{
               $('#tiptext2').text('两次输入不一致,请重新输入确认密码 ');
               for(var i=0;i<passwords.elements.length;i++){
                    $(passwords.elements[i]).val('');
               }
               rePass_word='';
          }
     })
     $('#btn_next_mondify').on('click',function(){//输入原密码的“下一步”操作
          for(var i=0;i<passwords.elements.length;i++){
               temp_mopassword+=$(passwords.elements[i]).val();
               $(passwords.elements[i]).val('');
          }
          if(temp_mopassword.length<6){
               $('#tiptext2').text('原始密码不能小于6位数字,请重新输入');
               temp_mopassword=''
               return false;
          }
          $.post(PLATFORMTRADEPWDCHECK_JSON_URL,{//验证旧密码
               version:app_data.version,
               tokenid:tokenid,
               trade_id:hex_md5(temp_mopassword)
          }).then(function(data){
               if(data.code=='000'){
                    $('#tiptext').text('设置新交易密码');
                    $('#tiptext2').text('输入交易密码');
                    $('#btn_next_mondify').hide();
                    $('#btn_next').show();//设置交易密码下一步显示
               }else{
                    tip_window(data.msg,'确定');
                    temp_mopassword='';
               }
          },function(data){
               tip_window('网络超时','确定');
          })
     })
});
(function () {
     function tabForward(e) {
          e = e || window.event;
          var target = e.target || e.srcElement;
          if (target.value.length === target.maxLength) {
               var form = target.form;
               for (var i = 0, len = form.elements.length-1; i < len; i++) {
                    if (form.elements[i] === target) {
                         if (form.elements[i++]) {
                              form.elements[i++].focus();
                         }
                         break;
                    }
               }
          }
     }
     var form = document.getElementById("password");
     form.addEventListener("keyup", tabForward, false);
})();

