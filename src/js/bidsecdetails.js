/**
 * Created by gupeiling on 2016/10/28.
 */
'use strict';
var status=getQueryString('status');
var bid_id=getQueryString('id');
var tokenid=getCookie('tokenid');
var zz=getQueryString('zz');
$("#bid1").load("about_app/bidsecdetailintro.html #bidCommon", function() {
     $('.tab li').click(function(){
          $(this).addClass('current').siblings().removeClass('current');
          var index=$(this).index();
          $('.con-bid>.bid-main').eq(index).show().siblings().hide();
     })
     if(zz){
          $('#buynow').text(status==1?'立即承接':status=='2'?'已满标':'转让完成')
          $('.recordsLi').text('转让记录');
     }else{
          $('#buynow').text(['','立即出借','已满标','回款中','已结束'][status]);
     }
     if(status==1){
          $('#buynow').on('click',function(){
               window.location.href="me.html";
          })
     }else{
          $('#buynow').css({'background':'#dddcdd'}).attr('disabled',true);
     }
     addlist(1,'true');
     var dropload = $('#bid2').dropload({
          domDown : {
               domClass   : 'dropload-down',
               domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
               domUpdate  : '<div class="dropload-update">↓释放加载</div>',
               domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
          },
          scrollArea : window,
          loadDownFn : function(me){
               setTimeout(function(){
                    var current=$('#current').val().trim();
                    var hasnextpage=$('#hasnextpage').val();
                    if(hasnextpage=='true'){
                         addlist(current,hasnextpage);
                    }else{
                    }
                    me.resetload();
               },1000);
          }
     });
     function addlist(current,hasnextpage){
          if(hasnextpage=='true'){
               $.ajax({
                    url:BIDRECORD_JSON_URL,
                    type:'post',
                    data:{
                         version:app_data.version,
                         current:current,
                         tokenid:tokenid,
                         bid_id:bid_id
                    },
                    success:function(data){
                         if(data.code=='000'){
                              $('.num-join').text(data.totalNum);
                              if(data.bidRecordList.length>0){
                                   data.bidRecordList[0].showLabel = data.current == "1" ? true : false;
                                   data.zz=zz;
                                   var template=$('#record').html();
                                   $('#bid2').append(Mustache.render(template, data));
                              }
                         }
                         current++;
                         $('#hasnextpage').val(data.hasnextpage);
                         $('#current').val(current);
                    }
               })
          }

     }
});
