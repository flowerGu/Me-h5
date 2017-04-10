<!-- <div class="wrapper">
    <p class="time_p">
    本月
    </p>
</div> -->
<table cellpadding="0" cellspacing="0"id="tbl_t" style="padding-top:0px;">
    	{{#list}}
    					{{#exchend_data_type}}
    					<tr id="wrapper_{{id}}" class="exchend_data" >
    						<td colspan="3" style="padding:6px 0 6px 0;padding-left:10px;background: #ddd;height: 20px;color: #000;text-align: left;width: 500px;/*position: fixed;top:0;*/">{{exchend_data}}</td>
    					</tr>
    					{{/exchend_data_type}}
		                <tr class="list_td">
							<td class="td_1"><p>{{create_date}}</p></td>
							{{#status}}
								<td class="td_2"><p class="type_c type_suc">{{option_type}}</p></td>
							{{/status}}
							{{^status}}
								<td class="td_2"><p class="type_c type_err">{{option_type}}</p></td>
							{{/status}}
							<td class="td_3">
								{{#sign}}+{{/sign}}{{^sign}}-{{/sign}}{{operation_amount}}
								<p>{{remark}}</p>
							</td>
						</tr>
		{{/list}}
</table>


