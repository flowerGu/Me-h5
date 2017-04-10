<div class="manner_header">
	<p class="manner_detial"><span style="margin-right:1em;">{{name}}</span><span style="font-size:.9em">{{phone_number}}</span></p>
	<p class="manner_type"><span>{{cus_manager_name}}</span></p>
	<ul class="clearfix">
		<li>
			<p>本月新增邀请</p>
			<p class="manner_num">{{current_month_num}}人</p>
			<span></span>
		</li>
		<li>
			<p>本月新增出借</p>
			<p class="manner_num">{{current_month_amount}}万</p>
			<span></span>
		</li>
		<li>
			<p>本月业绩排名</p>
			<p class="manner_num">{{cus_report_order}}名</p>
		</li>
	</ul>
</div>
<div class="manager_content clearfix" style="margin-bottom:60px">
	<ul>
		
		<li style="border-right: 1px solid rgb(239,239,239);" onclick="location.href='customer_list.html'">
			<b>7</b>
			<p>客户列表</p>
			<div><span>{{cus_sum_num}}</span>位</div>
		</li>

		<li onclick="location.href='my_account.html'">
			<b>4</b>
			<p>订单查询</p>
			<div>{{cus_sum_amount}}</span>万<span><!--/{{cus_sum_sale}}</span>次<br/>--></div>
		</li>
		<li style="border-right: 1px solid rgb(239,239,239);" onclick="location.href='Performance_s.html'">
			<b>.</b>
			<p>业绩查询</p>
			<!--<div>本月业绩<span>{{cus_report_order}}</span>名</div>-->
			<div>民信排名</div>
		</li>
		{{#yaoqing}}
			<li onclick="location.href='my_invited.html'">
		{{/yaoqing}}
		{{^yaoqing}}
			<li onclick="location.href='my_account_no.html'">
		{{/yaoqing}}
			<b>8</b>
			<p>我的邀请</p>
			<div><span>{{manager_invite_num}}</span>位</div>
		</li>
		<!-- <li onclick="location.href='wealth_manager_detail.html?cust_id='+{{cust_id}}"> -->
		<li onclick="location.href='interiorFeed.html'" >
			<b>9</b>
			<p>内部反馈</p>
			<div><span>反馈有礼</span></div>
		</li>
		<li  id="intent">
			<b>:</b>
			<p>意向客户</p>
			<div><span>{{intentcust_num}}</span>位</div>
		</li>
		{{#team_manager}}
		<li onclick="location.href='team_manager.html'">
			<b class="team_manager">;</b>
			<p>团队尊享</p>
			<div><span>{{custmgr_num}}</span>位经理</div>
		</li>
		{{/team_manager}}
		{{#chief_honor}}
		<li onclick="location.href='chief_honor.html'">
			<b class="chief_honor"><</b>
			<p>总监尊享</p>
			<div><span>{{team_num}}</span>个团队</div>
		</li>
		{{/chief_honor}}
		{{#center_honor}}
			<li onclick="location.href='center_honor.html'">
				<b class="center_honor">=</b>
				<p>中心尊享</p>
				<div><span>{{team_num}}</span>个销售团队</div>
			</li>
		{{/center_honor}}
		
		<!--<li >
			<img src="images/wm_09.png"  style="    margin-top: 42px;" />
		</li>-->
		
	</ul>
</div>