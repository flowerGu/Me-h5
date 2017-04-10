'use strict';
checkLogin();

ajax({
  url: MANAGERINDEX_JSON_URL,
  cb: function (data) {
    localStorage.setItem("cus_sum_num", data.cus_sum_num);// 设置客户总数
    setCookie("cust_id", data.cust_id);
    setCookie("phone_number", data.phone_number);
    data.tel_no = getCookie('tel_no');
    data.custtype = JSON.parse(localStorage.getItem("custtype"));
    data.cus_manager_name = data.cus_manager_name.replace('/', ' -- ');
    data.intentcust_num = data.intentcust_num || 0;
    localStorage.setItem('nums', data.intentcust_num);//
    $(document.body).prepend(template('tpl', data));
    // 三项开关控制员工学习区
    if (switch_channel.getItem().show_business == true) {
      $("#study").removeClass("hide");
    }
  }
});

custFn(3); // 菜单
