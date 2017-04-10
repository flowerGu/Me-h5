/**
 * Created by Administrator on 2016/11/12.
 */
$(function(){
    var data;
    //从cookie中取出平台注册手机号
    var registerTel = getCookie("tel_no");
    $("#J_oldtel").val(registerTel.substring(0,3)+"****"+registerTel.substring(7,11));
    $("#oldTel").val(registerTel.substring(0,3)+"****"+registerTel.substring(7,11));
    if(GetRequest().type == "tel"){
        $('.formlast').removeClass("none");
        data = form2json($(".formlast"));
    }else if(GetRequest().type == "notel"){
        $("title").html("绑定手机号");
        $('.form').removeClass("none");
        data = form2json($(".form"));
    }

    //点击绑定时的各种验证(原手机号不存在)
    $("#bindnoTel").click(function(){
        data = form2json($(".form"));
        if(!data.newTel || !data.bankCard || !data.idCard || !data.userName ||　!data.userName){
            tip_window("请输入完整信息", '确定');
            return false;
        }
        //
        if(!data.newTel){
            tip_window("请输入手机号", '确定');
            return false;
        }
        if(!tools.validate.mobile(data.newTel)){
            tip_window("手机号输入错误", '确定');
            return false;
        }
        if(!tools.validate.name(data.userName)){
            tip_window("请输入真实姓名", '确定');
            return false;
        }
        if(!tools.validate.IDCard(data.idCard)){
            tip_window("请输入正确的身份证号", '确定');
            return false;
        }
        if(!tools.validate.bankCard(data.bankCard)){
            tip_window("请输入正确的银行卡号", '确定');
            return false;
        }
        if(!data.msgCode){
            tip_window("请输入短信验证码", '确定');
            return false;
        }
        $(".u_btn_form_default").addClass("active");
    })
    //点击获取短信验证码
    $(".sendMsgCode").click(function(){
        if(GetRequest().type == "tel"){
            data = form2json($(".formlast"));
        }else if(GetRequest().type == "notel"){
            data = form2json($(".form"));
        }
        if(!data.newTel){
            tip_window("请输入手机号", '确定');
            return false;
        }
        if(!tools.validate.mobile(data.newTel)){
            tip_window("请输入正确手机号", '确定');
            return false;
        }else{

        }
    })
    //点击绑定时的各种验证(原手机号存在)
    $("#bindnoTel").click(function(){
        if(!data.newTel || !data.bankCard || !data.idCard || !data.userName ||　!data.userName){
            tip_window("请输入完整信息", '确定');
            return false;
        }
        if(!tools.validate.mobile(data.newTel)){
            tip_window("请输入正确手机号", '确定');
            return false;
        }
    })
})
