{{#debtList}}
<div class="debt_con whitebg">
				<ul>
					<li class="useFor btm clearfix">{{debtUse}}</li>
					<li class="btm clearfix">
							<label>借款金额</label>
							<span>{{debtSumAmount}}元</span>
					<li class="btm clearfix">
							<label>协议出借利率</label>
							<span>{{debtVearlyRate}}</span>
					</li>
						
					</li>
					<li class="btm clearfix">
							<label>债务人个人情况</label>
							<span>{{debtidentityType}}</span>
					</li>
					<li class="clearfix">
						<label>借款人</label>
						<span>{{debtName}}</span>
					</li>
				</ul>
			</div>
{{/debtList}}