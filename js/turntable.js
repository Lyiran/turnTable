$(function () {
/*
	**
	信息提示弹层
	**
*/
  var dialogBg = $('#j-dialog-backdrap');
  var dialogAwardBox = $('#j-award-box-layer');
  var dialogNoawardBox = $('#j-noaward-box-layer');
  var dialogReceiveAward = $('#j-receive-award-layer');
  var dialogSuccessAward = $('#j-success-box-layer');
  var dialogRuleBox = $('#j-rule-box-layer');
  var dialogShareBox = $('#j-share-box-layer');
  var phoneReg = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
  var oWarningText = $('#j-warning-text');
  var openId = $('#j-openId');
  // 点击弹出提示
  //dialogLayerShow(dialogSuccessAward);




  /**
   * 显示对话框
   */

  function dialogLayerShow (dialog,cont) {
  	dialogBg.show();
  	dialog.show();
  	var phoneNum = dialog.find('.j-phone-num');
  	dialog.find('.j-close-btn').click(function () {
  		dialogHide(dialog);
  	});

  	dialog.find('.j-award-content').text(cont);
  	dialog.find('.j-success-award-content').text(cont);
  	dialog.find('.j-receive-award-btn').click( function () {
  		dialogHide(dialog);
  		dialogLayerShow(dialogReceiveAward);
  	});
		dialog.find('.j-receive-btn').click( function () {
			phoneNum.focus(function() {
				oWarningText.text('');
			});
	  	if (phoneNum.val() === '') {
	  		oWarningText.text("手机号不能为空");
	  	} else if (phoneReg.test(phoneNum.val()) === false) {
	  		oWarningText.text("请输入正确联通手机号");
	  	} else {
  			$.ajax({
  				type: 'post',
  				url: '/path/to/file',//后端接口
  				async: false,
  				dataType: 'json',
  				data: {
  					openid: openId.val(),
  					phonenum: phoneNum.val()
  				}
  			})
  			.done( function(res) {
  				console.log("success");
  				/*{
  					"code": 0,
  					"message": "success",
  					"data": {
  					'lotteryNum': 0,
  					'prize': '什么奖'
  					}
  				}*/
  				//约定code 为0时则发送成功，1时为失败
  				//data数据中为还可抽奖次数 1时为还可以抽一次，0时不可再次抽奖了
  				if (res.code == 0) {
  					dialogHide(dialog);
  					dialogLayerShow(dialogSuccessAward,res.data.prize);
  				} else if (res.code == 1) {
  					dialogHide(dialog)
						layer.open({
							content: res.message,
							style: ' background-color:rgba(222,222,222,0.3); color:#fff; border:none; font-size:14px;',
							time: 3
						});
  				}
  			});
	  	}

		});


  }
    /**
   * 点击提示对话框
   */
   $('#j-reward-rule').click( function () {
   	dialogLayerShow(dialogRuleBox);
   });
   /*获奖信息获取*/
   /*function Txt*/

  /**
   * 关闭对话框
   */
  function dialogHide (dialog) {
    dialogBg.hide();
    dialog.hide();
    //解除绑定事件
    dialog.find('.j-close-btn').off('click');
  }

  /**
   * 判断是否在微信中打开页面
   */
   function isWeixinBrowser () {
    var ua = navigator.userAgent.toLowerCase();
    return (/micromessenger/.test(ua)) ? true : false ;
   }
   function setUp () {
	   if (!isWeixinBrowser()) {
	   	//不在微信中则跳转页面地址
	   	location.href = "https://www.baidu.com/";
	   }
   }


var turnplate={
		restaraunts:[],				//大转盘奖品名称
		colors:[],					//大转盘奖品区块对应背景颜色
		outsideRadius:192,			//大转盘外圆的半径
		textRadius:155,				//大转盘奖品位置距离圆心的距离
		insideRadius:54,			//大转盘内圆的半径
		startAngle:0,				//开始角度
		bRotate:false				//false:停止;ture:旋转
};

$(document).ready(function(){
	//动态添加大转盘的奖品与奖品区域背景颜色
	turnplate.restaraunts = ["100元话费", "50元话费", "谢谢参与","30元话费", "10元话费", "5元话费", "6元锁屏险",  "谢谢参与"];
	turnplate.colors = ["#FFF4D6", "#FFFFFF", "#FFF4D6", "#FFFFFF","#FFF4D6", "#FFFFFF", "#FFF4D6", "#FFFFFF"];

	
	var rotateTimeOut = function (){
		$('#wheelcanvas').rotate({
			angle:0,
			animateTo:2160,
			duration:8000,
			callback:function (){
				//alert('网络超时，请检查您的网络设置！');
				layer.open({
					content: '网络超时，请检查您的网络设置！',
					style: ' background-color:rgba(222,222,222,0.3); color:#fff; border:none; font-size:14px;',
					time: 3
				});
			}
		});
	};

	//旋转转盘 item:奖品位置; txt：提示语;
	var rotateFn = function (item, txt){
		var angles = item * (360 / turnplate.restaraunts.length) - (360 / (turnplate.restaraunts.length*2));
		if(angles<270){
			angles = 270 - angles;
		}else{
			angles = 360 - angles + 270;
		}
		$('#wheelcanvas').stopRotate();
		$('#wheelcanvas').rotate({
			angle:0,
			animateTo:angles+1800,
			duration:8000,
			callback:function (){
				//alert(txt);
/*				layer.open({
					content: txt,
					style: ' background-color:rgba(222,222,222,0.3); color:#fff; border:none; font-size:14px;',
					time: 3
				});*/
				if (txt === "谢谢参与") {
					dialogLayerShow(dialogNoawardBox,txt);

				} else if (txt.indexOf("话费")>0) {

					dialogLayerShow(dialogAwardBox,txt);
				} else if (txt.indexOf("元锁屏险")>0) {
					dialogLayerShow(dialogAwardBox,txt);
				}
				turnplate.bRotate = !turnplate.bRotate;
			}
		});
	};

	$('.pointer').click(function (){
		if(turnplate.bRotate)return;
		turnplate.bRotate = !turnplate.bRotate;
		//获取随机数(奖品个数范围内)
		var item = rnd(1,turnplate.restaraunts.length);
		//奖品数量等于8,指针落在对应奖品区域的中心角度[315, 270, 225, 180, 135, 90, 45, 360]
		rotateFn(item, turnplate.restaraunts[item-1]);
		/* switch (item) {
			case 1:
				rotateFn(315, turnplate.restaraunts[0]);
				break;
			case 2:
				rotateFn(270, turnplate.restaraunts[1]);
				break;
			case 3:
				rotateFn(225, turnplate.restaraunts[2]);
				break;
			case 4:
				rotateFn(180, turnplate.restaraunts[3]);
				break;
			case 5:
				rotateFn(135, turnplate.restaraunts[4]);
				break;
			case 6:
				rotateFn(90, turnplate.restaraunts[5]);
				break;
			case 7:
				rotateFn(45, turnplate.restaraunts[6]);
				break;
			case 8:
				rotateFn(360, turnplate.restaraunts[7]);
				break;
		} */
		console.log(item);
	});
});

function rnd(n, m){
	var random = Math.floor(Math.random()*(m-n+1)+n);
	return random;
}


//页面所有元素加载完毕后执行drawRouletteWheel()方法对转盘进行渲染
window.onload=function(){
	drawRouletteWheel();
};

function drawRouletteWheel() {
  var canvas = document.getElementById("wheelcanvas");
  if (canvas.getContext) {
	  //根据奖品个数计算圆周角度
	  var arc = Math.PI / (turnplate.restaraunts.length/2);
	  //使用getContext()调用canvas的绘图环境
	  var ctx = canvas.getContext("2d");
	  //在给定矩形内清空一个矩形
	  ctx.clearRect(0,0,422,422);
	  //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
	  ctx.strokeStyle = "#FFBE04";
	  //font 属性设置或返回画布上文本内容的当前字体属性
	  ctx.font = '16px Microsoft YaHei';
	  for(var i = 0; i < turnplate.restaraunts.length; i++) {
	  	//起始角加上每一份的角度
		  var angle = turnplate.startAngle + i * arc;
		  ctx.fillStyle = turnplate.colors[i];
		  ctx.beginPath();
		  //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
		  ctx.arc(211, 211, turnplate.outsideRadius, angle, angle + arc, false);
		  ctx.arc(211, 211, turnplate.insideRadius, angle + arc, angle, true);
		  ctx.stroke();
		  ctx.fill();
		  //锁画布(为了保存之前的画布状态)
		  ctx.save();
		  //----绘制奖品开始----
		  ctx.fillStyle = "#E5302F";
		  var text = turnplate.restaraunts[i];
		  var line_height = 17;
		  //translate方法重新映射画布上的 (0,0) 位置
		  ctx.translate(211 + Math.cos(angle + arc / 2) * turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * turnplate.textRadius);

		  //rotate方法旋转当前的绘图
		  ctx.rotate(angle + arc / 2 + Math.PI / 2);
		  
		  /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
		  if(text.indexOf("M")>0){//流量包
			  var texts = text.split("M");
			  for(var j = 0; j<texts.length; j++){
				  ctx.font = j == 0?'bold 20px Microsoft YaHei':'16px Microsoft YaHei';
				  if(j == 0){
					  ctx.fillText(texts[j]+"M", -ctx.measureText(texts[j]+"M").width / 2, j * line_height);
				  }else{
					  ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
				  }
			  }
		  }else if(text.indexOf("M") == -1 && text.length>6){//奖品名称长度超过一定范围 
			  text = text.substring(0,6)+"||"+text.substring(6);
			  var texts = text.split("||");
			  for(var j = 0; j<texts.length; j++){
				  ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
			  }
		  }else{
			  //在画布上绘制填色的文本。文本的默认颜色是黑色
			  //measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
			  ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
		  }

		  //添加对应图标
		  if(text.indexOf("话费")>0){
			  var img= document.getElementById("shan-img");
			  img.onload=function(){
				  ctx.drawImage(img,-15,10);
			  };
			  ctx.drawImage(img,-15,10);
		  } else if (text.indexOf("元锁屏险")>0) {
			  var img= document.getElementById("shan-img");
			  img.onload=function(){
				  ctx.drawImage(img,-15,10);
			  };
			  ctx.drawImage(img,-15,10);
		  }
		  else if(text.indexOf("谢谢参与")>=0){
			  var img= document.getElementById("sorry-img");
			  img.onload=function(){
				  ctx.drawImage(img,-15,10);
			  };
			  ctx.drawImage(img,-15,10);
		  }
		  //把当前画布返回（调整）到上一个save()状态之前
		  ctx.restore();
		  //----绘制奖品结束----
	  }
  }
}



});