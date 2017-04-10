/**
 * Created by gupeiling on 2016/11/15.
 */
var tokenid=getCookie('tokenid');
test_tokenid();
initH('body',undefined,'',function(){
    $('body').css('background-color','#f6f6f6')
})
var data = JSON.parse(localStorage.getItem("user_detail"));
/*保存已填入的数据*/
var saveMessage = {};
$("input[name=area]").click(function(){
    saveMessage.name = $("input[name=name]").val();
    saveMessage.tel = $("input[name=tel]").val();
    window.localStorage.setItem("saveMessage",JSON.stringify(saveMessage))
})
var pcType=getQueryString('pcType');
$.ajax({
    url: SELECTADDRESS_JSON_URL,
    type: 'post',
    data: {
        version: app_data.version,
        tokenid:tokenid
    },
    dataType: 'json',
    success: function (data) {
        if(data.code=='000'){
            if(data.list!=''){
                setCookie('addressID',data.list[0].id);
                $("input[name=name]").val(data.list[0].recipName);
                $("input[name=tel]").val(data.list[0].recipTel);
                if(pcType !='' && pcType=='strate'){//个人设置进入
                    var arrmy1=data.list[0].detailAddress.split('@');
                    $("#address").val(arrmy1.pop());//详细地址
                    $('#area').val(arrmy1);//地区
                }
                if(pcType !='' && pcType=='seclect_area'){//选择地区进入
                    var my_address = JSON.parse(localStorage.getItem("my_address"));
                    var arrmy2=my_address.split('@');
                    $('#area').val(arrmy2.join(' '));
                }
            }
            else{
                if(pcType !='' && pcType=='seclect_area'){
                    $("input[name=name]").val(JSON.parse(localStorage.getItem('saveMessage')).name);
                    $("input[name=tel]").val(JSON.parse(localStorage.getItem('saveMessage')).tel);
                    var my_address = JSON.parse(localStorage.getItem("my_address"));
                    var arrmy2=my_address.split('@');
                    $('#area').val(arrmy2[0]+' '+arrmy2[1]+' '+arrmy2[2]);
                }
                setCookie('addressID','')
            }
        }
    }
});
function next() {
    var address = JSON.parse(localStorage.getItem("my_address"))+'@'+$("#address").val();
    var myaddress=$("textarea[name=address]").val();//详细地址
    var myarea=$("input[name=area]").val();//地区
    var mytel=$("input[name=tel]").val();//手机号
    var myname=$("input[name=name]").val();//姓名
    if(myname == ''){
        tip_window('姓名不能为空！','确定');
        return false;
    }
    if(mytel == ''){
        tip_window('手机号不能为空！','确定');
        return false;
    }
    if(myarea == ''){
        tip_window('所在地区不能为空！','确定');
        return false;
    }
    if(myaddress == ''){
        tip_window('详细地址不能为空！','确定');
        return false;
    }
    $.ajax({
        url: SAVEADDRESS_JSON_URL,
        type: 'post',
        data: {version: app_data.version,
            tokenid: tokenid,
            detailAddress: address,
            recipName: myname,
            recipTel: mytel,
            addressStatus: 1,
            id:getCookie('addressID')
        },
        dataType: 'json',
        success: function (data) {
            if(data.code=='000'){
                tip_window('保存成功','返回个人设置','my_setting.html');
            }
            else if(data.code=='999'){
                tip_window('保存失败','确定');
            }
            else{
                tip_window(data.msg,'确定');
            }
        },
        error: function (data) {

        }
    });
}
