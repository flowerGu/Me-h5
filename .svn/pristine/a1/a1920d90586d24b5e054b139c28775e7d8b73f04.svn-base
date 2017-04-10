
var dropDownPageOpts = [//江西
  { // prject_in
    first: true,
    page: 1,
    enable: true,
    timer: null
  }, {// prject_complete
    first: true,
    page: 1,
    enable: true,
    timer: null
  }
];

// 保存订单号

getData(1,'#prject_in',dropDownPageOpts[0])//进行中
getData(2,'#prject_complete',dropDownPageOpts[1]) //已完成

function getData(status,ele,obj) {
  ajax({
    url: JDINVESTS_JSON_URL,
    data: {
      current: obj.page,
      type:status
    },
    cb: function (data) {
      data.type = status==1?true:false;
      if (data.list == null || data.list.length === 0) {
        obj.enable = false;
        if (obj.first) {
            //no data
          $(ele).html(Mustache.render($("#no-data").html(), data));
        }
        return;
      }
      obj.page++;
      if (data.list[0].idnumber !== undefined) {
            setCookie('id_number', data.list[0].idnumber);
        }
        $.each(data.list, function(i, item) {
            item.invest_money=parseFloat(item.invest_money).toFixed(2);
            if (item.temp1=='2') {
                item.bid_id_status = true;
                if(item.item_status=='1'|| item.item_status=='2' || item.item_status=='4'){
                    item.item_status_s=true;
                }
                if(item.item_status=='5'){
                    item.item_status_e=true;
                    item.item5=5;
                }
            }
            else{
                item.product_id_status = true;
                if (item.is_send_mail == 0) {
                    item.noSend = 'true';
                } else if (item.is_send_mail == 1) {
                    item.noSend = 'false';
                }
            }
            if (status == '1') {
                item.item_status = true;
                data.wan_status = 1;
            } else {
                item.item_status = false;
                data.wan_status = 2;
            }
            if (item.is_online_user == '0') {
                item.downline = true; //线下
            }
            if (item.is_online_user == '1') {
                item.online = true; //线下
            }
            if (item.is_online_user == '2') {
                item.otherline = true; //线下
            }
            item.over5 = item.whetherOrNot_send =='0'?false:true;//产品:0不可以,1可以发合同
            item.transferType = item.transferType == '0'?true:false; // 是否债转
            item.expire_profit_status = item.transferType && (item.expire_profit==null || item.expire_profit==0)?true:false;
            item.expire_profit = item.expire_profit!=null?item.expire_profit.toFixed(2):'';
            item.having_info = JSON.stringify({bid_id:item.bid_id,
                                id:item.id,
                                contract_status:item.contract_status,
                                reserve:item.reserve_date,
                                interrest:item.interrest,
                                end_date:item.end_date,
                                expire:item.expire_profit,
                                invest:item.invest_money,
                                bid_name:item.loan_title,
                                item5:item.item5,
                                transferType:item.transferType,
                                orderNumber:item.orderNumber,
                                expire_profit_status:item.expire_profit_status //债转放款 待收收益：true 放款前(隐藏)
                            })
        });
      $(ele).append(Mustache.render($("#data-list").html(), data));

      $('#content').find('li').each(function(){
        $(this).click(function(){
            if($(this).find('a').attr('bid_id')!=undefined){
                var obj =$(this).find('a').attr('data-json');
                sessionStorage.setItem("obj_intro",obj);
                window.location.href="having_project_info.html"
            }
        })
      })
      obj.first = false;
    }
  })
}

var $ul = $('#content').children('ul');
$('.tab li').click(function() {
    var index = $(this).index();
    $('.tab li').removeClass('current');
    $(this).addClass('current');
    $ul.css('display', 'none');
    $ul.eq(index).css('display', 'block');
})

var meDropload = $('#prject_in').dropload({
    scrollArea: window,
    loadDownFn: function (me) {
        if (dropDownPageOpts[0].timer !== null) {
        window.clearTimeout(dropDownPageOpts[0].timer);
        dropDownPageOpts[0].timer = null;
        }
        dropDownPageOpts[0].timer = setTimeout(function () {
        dropDownPageOpts[0].timer = null;
        if (dropDownPageOpts[0].enable) {
            getData(1,'#prject_in',dropDownPageOpts[0])
        }
        me.resetload();
        }, 1000);
    },
    });
    meDropload.unlock();

var meDropload = $('#prject_complete').dropload({
    scrollArea: window,
    loadDownFn: function (me) {
        if (dropDownPageOpts[1].timer !== null) {
            window.clearTimeout(dropDownPageOpts[1].timer);
            dropDownPageOpts[1].timer = null;
            }
            dropDownPageOpts[1].timer = setTimeout(function () {
            dropDownPageOpts[1].timer = null;
            if (dropDownPageOpts[1].enable) {
                getData(2,'#prject_complete',dropDownPageOpts[1])
            }
            me.resetload();
            }, 1000);
        },
        });
        meDropload.unlock();