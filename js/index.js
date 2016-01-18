$(function () {
  var dialogBg = $('#j-dialog-backdrap');
  var dialogAwardBox = $('#j-award-box-layer');
  var dialogNoawardBox = $('#j-noaward-box-layer');
  var dialogReceiveAward = $('#j-receive-award-layer');
  var dialogRuleBox = $('#j-rule-box-layer');
  var dialogShareBox = $('#j-share-box-layer');

  // 点击弹出提示
  dialogLayerShow(dialogShareBox);


  /**
   * 显示对话框
   */

  /*有关闭按钮*/
  function dialogLayerShow (dialog) {
  	dialogBg.show();
  	dialog.show();
  	dialog.find('.j-close-btn').click(function () {
  		dialogHide(dialog);
  	});
  }
   /*没有关闭按钮*/


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


});