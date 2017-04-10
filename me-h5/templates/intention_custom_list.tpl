				
				{{#list}} 
				<ul onclick='custom_detail(this)' id='tr_{{id}}' class="clearfix whitebg">
					<li>
						<p>
							{{#girl}}<i class="sexb">女</i>{{/girl}}
							{{#boy}}<i class="sexg">男</i>{{/boy}}
							<span class="custName">{{custname}}</span>
							<span class="custTel">{{phonenums}}</span>
						</p>
						<p>备注：{{remark}}</p>
					</li>
					<li>
						<span>级别</span>
					{{level}}
					</li>
				</ul>
				{{/list}}
			