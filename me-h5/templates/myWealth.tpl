<div class="myWealth-header clearfix">
	<div class="box clearfix">
		<form id="upload_form" style="float:left;padding-top:1em" enctype="multipart/form-data" target='frameFile' method="post"
			action="upload.php">
			<div class="fileUpload btn btn-primary" style="width:70px;height:70px;border-radius:50%;background-color:#fff;">
				<img src="{{head_url}}" id="uploadBtn" width='70px' height='70px;' />
				<input type="file" class="upload" name="headImage" id="image_file" onchange="changeImg()" />
			</div>
			<div id='uploadLog' style='width:80px; color:#fff; left: 35px;'> </div>
			<input type='hidden' name='tokenid' id='tokenid' />
			<input type='hidden' name='version' id='version' value="" />
		</form>
		<iframe id='frameFile' name='frameFile' style='display: none;'></iframe>
		<span class="arrowSpan icon-triangle" onclick="location.href='my_setting.html'"></span>
		<div style="float:left;" class="toSet">
			<!--<p>{{name}}<span id="sayhello" style="font-size:14px;padding-left:15px;"></span></p>-->
			<P class="num_p">{{phone_number}}</P>
			<p class="user-auth">
				<span{{^realname_status}} class="active"{{/realname_status}}>
					<i class="icon icon-user{{^realname_status}} active{{/realname_status}}"></i>
					{{^realname_status}}未实名{{/realname_status}}
					{{#realname_status}}已实名{{/realname_status}}
				</span>
				<span>
					<a{{^emailStatus}} class="active"{{/emailStatus}}>
						<i class="icon icon-email{{^emailStatus}} active{{/emailStatus}}"></i>
						{{^emailStatus}}邮箱未绑定{{/emailStatus}}
						{{#emailStatus}}邮箱已验证{{/emailStatus}}
					</a>
				</span>
			</p>
		</div>
	</div>
</div>
<div class="wealth clearfix btm">
	<ul>
		<li>
			<p>总资产(元)</p>
			<span id="totalMoney">{{total_assets}}</span>
		</li>
		<li>
			<p>累计收益(元)</p>
			<span id="totalBenifit">{{earning}}</span>
		</li>
		<li style="border-right:0">
			<p>
				可用余额(元)
				<em class="icon" id="refresh">U</em>
			</p>
			<span id="remainMoney">{{balance}}</span>
		</li>
	</ul>
</div>
<div class="proceeds clearfix">
	<div class="pro_fl">
		<p style="font-size:15px;color:rgb(157,157,157)">昨日收益(元)<img src="images/shouyi.png"></p>
		<p style="font-size: 25px;color:#ff4c4c;">￥<span id="recentMoney">{{previous_earning}}</span></p>
	</div>
	<div class="pro_fr">
		<input type="button"  class="button" onclick="location.href='chongzhi.html'" value="存管充值"/>
		<!--<input type="button" class="button white" onclick="location.href='tixian.html'" value="提现"/>-->
	</div>
</div>
<div class="wealth_list">
	<div class="first">
		<a href="having_project.html" class="btm"><em class='icon bgem yt'>1</em><label>已出借项目</label>
					<span><!-- 查看已投项目 --></span><i class="icon-triangle"></i></a>
		<a href="assets.html" class="btm">
			<em class='icon bgem zichan'>2</em><label>资产明细</label>
			<i class="icon-triangle"></i>
			<span><!-- 查看我的资产 --></span></a>
		<a href="record.html" class="btm">
			<em class='icon bgem zjjl'>#</em><label>资金记录</label>
			<i class="icon-triangle"></i>
		</a>
	</div>
	<div class="first" style="margin-top:.5em;">
		<a href="red_package.html" class="btm">
			<em class='icon  tqbj '>T</em>
			<label>我的福利</label>
			<i class="icon-triangle"></i>
			<span class="invite_code">{{privnum}}张</span>
		</a>
		<!--<a href="javascript:;" class="btm">
					<label class="sign-label">签到有好礼，好礼等你拿</label>
					<span class="invite_code sign-span" id="sign-span"><signNum id="signNum">{{signIntegral}}</signNum><status id="signtext"></status></span>
				</a>-->
		<!--<a href="javascript:;" class="btm">
					<em class='icon bgem jf'>4</em>
					<label>积分</label>
					<i class="icon-triangle"></i>
					<span>
					<signNum id="signNum">{{signIntegral}}</signNum>
					</span>
				</a>-->
	</div>
</div>
<div class="wealth_list" style="margin-bottom:60px;">
	<a href="invited_register.html?num={{referral_code}}" class="btm" style="margin-top:10px">
		<em class='icon bgem wdyq'>5</em><label>我的邀请链接/码</label>
		<span class="invite_code">{{referral_code}}</span>
		<i class="icon-triangle"></i>
	</a>
	<a href="message.html" class="btm" style="margin-top:10px">
		<em class='icon bgem xxzx' id='message_pic'>6</em><label>消息中心</label>
		<i class="icon-triangle"></i>
	</a>
</div>
<!--{{#is_risk_assessment}}<div class="wealth_list"style="margin-bottom:60px;">
				<a href="risk_level.html?tokenid={{tokenid}}" class="btm" style="margin-top:10px">
					<em class="fxcp bgem"></em><label>风险测评</label>
					<span class="">未测评</span>
					<i class="icon-triangle"></i>
				</a>
		{{/is_risk_assessment}}
		{{^is_risk_assessment}}
		<div class="wealth_list"style="margin-bottom:60px;">
				<a href="javascript:;" class="btm" style="margin-top:10px">
					<em class="fxcp bgem"></em><label>风险测评</label>
					<span class="">已测评</span>
				</a>
		{{/is_risk_assessment}}-->
</div>
