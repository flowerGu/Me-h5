$.ajax({
			url: host1 + 'queryProblemList.do',
			data: {
				channel: 'h5',
				categoryId: 55
			},
			async: false,
			success: function (data) {
				if (data.list.constructor == Array && data.list.length > 0) {
					data.list.forEach(function (item, i) {
						if (i < 5) {
							item.topFive = true;
							item.index = i+1;
						}
					})
					$('body>.contentWrap').append(Mustache.render($('#learn-data-list').html(), data));
				}else{
					tip_window(data.msg,'确定');
				}
			}
		})
		$.ajax({
			url: host1 + 'queryCommProblem.do',
			data: {
				channel: 'h5',
				categoryId: 24
			},
			async: false,
			success: function (data) {
				if (data.list.constructor == Array && data.list.length > 0) {
					$('body>.contentWrap').append(Mustache.render($('#problem-classify').html(), data))
				}else{
					tip_window(data.msg,'确定');
				}
			}

		})
		$.ajax({
			url: host1 + 'querySelfServiceInfo.do',
			data: {
				channel: 'h5',
				categoryId:64
			},
			async: false,
			success: function (data) {
				if (data.list.constructor == Array && data.list.length > 0) {
					data.list.forEach(function (item, i) {
						if (i < 6) {
							item.topFive = true;
						}
						if(item.title.match('银行服务热线')){
							item.goDetail = true;
						}
					})
					$('body>.contentWrap').append(Mustache.render($('#self-service').html(), data))
				}
			}
		})