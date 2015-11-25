$(function() {

	// 获取参数
	var imgSlider = $('.imageSlider'),                                         // 图片轮换容器
		imageBox = imgSlider.children(".imageBox"),                            // 图片容器
		icoBox = imgSlider.children(".icoBox"),                                // 图标容器
		icoArr = icoBox.children('span'),                                      // 所有图标（数组）
		arrowLeft = imgSlider.children('.left'),                               //向前翻页箭头
		arrowRight = imgSlider.children('.right'),                             //向后翻页箭头

		imageWidth = imgSlider.width(),                                        // 图片宽度
		imageNum = imageBox.children('a').length,                              // 图片数量
		imageReelWidth = imageWidth * imageNum,                                // 图片容器宽度

		icoWidth = icoArr.outerWidth(true),                                    // 缩略图宽度
		icoNum = icoArr.length,                                                // 缩略图数量
		icoReelWidth = icoWidth * icoNum,                                      // 缩略图容器宽度

		activeID = parseInt(icoBox.children(".active").attr("rel")),           // 当前图片ID
		nextID = 0,                                                            // 下张图片ID
		setIntervalID,                                                         // 大图轮播setInterval() 函数ID
		setIcoID,															   // 缩略图轮播setInterval() 函数ID
		intervalTime = 6000,                                                   // 间隔时间
		imageSpeed = 500,                                                      // 大图轮播动画执行速度
		icoHoverSpeed = 60,													   // 缩略图鼠标悬停动画执行速度
		icoClickSpeed = 400;											       // 缩略图点击动画执行速度

		
	
	// 设置 图片容器 , 缩略图容器 宽度
	imageBox.css( 'width' , imageReelWidth + "px" );
	icoBox.css('width', icoReelWidth + 'px');

	// 图片轮换函数
	var rotate = function(clickID) {
		// nextID 是下张需要显示的图片id
		if (clickID) {
			nextID = clickID;
		} else {
			// 自动轮播的情况下
			// 判断是否为最后一张图片
			// 是则切换到第一张
			nextID = activeID <= imageNum - 1 ? activeID + 1 : 1;
		}
		
		// 切换缩略图active 
		$(icoArr[activeID - 1]).removeClass("active");
		$(icoArr[nextID - 1]).addClass("active");
				
		// 切换图片
		imageBox.animate({ left: "-" + (nextID - 1) * imageWidth + "px"} , imageSpeed);
		
		// 切换当前图片 id
		activeID = nextID;
	};
	
	// 启动图片自动轮播
	setIntervalID = setInterval(rotate, intervalTime);

	// 鼠标移上图片停止切换移开后继续
	imageBox.hover(function() {
		clearInterval(setIntervalID);
	}, function() {
		setIntervalID = setInterval(rotate, intervalTime);
	});

	// 点击缩略图切换图片
	icoArr.on('click', function() {
		clearInterval(setIntervalID); // 停止自动切换
		var clickID = parseInt($(this).attr("rel"));
		rotate(clickID);
		setIntervalID = setInterval(rotate, intervalTime); // 启动自动切换
	});

	//缩略图hover滚动
	var icoScollLeft = function() {
		var curPos = icoBox.position().left;
		if (curPos >= 0) {
			clearInterval(setIcoID);
		} 
		icoBox.css('left', curPos + 1 + 'px');
	}
	var icoScollRight = function() {
		var curPos = icoBox.position().left;
		var maxPos = 0 - icoReelWidth + imageWidth;
		if (curPos <= maxPos) {
			clearInterval(setIcoID);
		}	
		icoBox.css('left', curPos - 1 + 'px');
	}

	//缩略图翻页
	arrowRight.hover(function() {
		setIcoID = setInterval(icoScollRight, icoHoverSpeed);
	}, function() {
		clearInterval(setIcoID);
	});
	arrowLeft.hover(function() {
		setIcoID = setInterval(icoScollLeft, icoHoverSpeed);
	}, function() {
		clearInterval(setIcoID);
	});

	arrowRight.click(function(event) {
		var curPos = icoBox.position().left,
			dafultMoveWidth = 3 * icoWidth,
			maxPos = 0 - icoReelWidth + imageWidth,
			nextPos;
		if ( - dafultMoveWidth + curPos  < maxPos) { //右边界
		 	nextPos = maxPos;
		} else {
			nextPos = - dafultMoveWidth + curPos;
		}
		console.log(nextPos);
		icoBox.animate({ left: nextPos + "px"} , icoClickSpeed);
	});

	arrowLeft.click(function(event) {
		var curPos = icoBox.position().left,
			dafultMoveWidth = 3 * icoWidth,
			nextPos;
		if ( dafultMoveWidth + curPos  > 0) { //左边界
		 	nextPos = 0;
		} else {
			nextPos = dafultMoveWidth + curPos;
		}
		icoBox.animate({ left: nextPos + "px"} , icoClickSpeed);
	});


});
