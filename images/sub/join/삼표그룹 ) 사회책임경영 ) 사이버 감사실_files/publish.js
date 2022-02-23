/* 우측배너 상단고정 */
 window.onload = onWindowReady;	
  
  var view_topnavi

  function onWindowReady()
  {
	  view_topnavi = document.getElementById("fnLocation");
	  window.onscroll = onWindowScroll;
  }
  
  
  function getScrollTop()
  {
	  return ( document.body.scrollTop == 0 ) ? document.documentElement.scrollTop : document.body.scrollTop;
  }
  
  function onWindowScroll( e )
  {
	  //console.log( e );
	  
	  var scrollTopNum;
	  scrollTopNum = getScrollTop();
	  
	  if( scrollTopNum >= 163 ){
		  view_topnavi.style.position = "fixed";
		  view_topnavi.style.top = "0px";
		  view_topnavi.style.height = "150px";				
		  $('.location_wrap').addClass('active');
		  $('.fnbtn_navi').addClass('showfn');
		  $('.contents_this').addClass('active');	  
		  
	  }else{
		  view_topnavi.style.position = "static";
		  view_topnavi.style.top = "0"; 
		  view_topnavi.style.height = "240px";
		  $('.location_wrap').removeClass('active');
		  $('.contents_this').removeClass('active');
		  $('.fnbtn_navi').removeClass('showfn');
	  }
	  
  }	

/* 마우스오버 효과 */
$(document).ready(function(){
		btn_hover('.btn_src, .btn_chgico, .btn_people');
});
		
	function btn_hover(selector){
		$(selector).bind('mouseover focusin touchstart', function(){
			$(this).addClass('btn_hover');
		}).bind('mouseout focusout touchend', function(){
			$(this).removeClass('btn_hover');
		});				   
}

/* Tab Contents */	
function init_tabs() {
		$("div.tab_contents").css("display","none");
		if (!$('ul#tabList').length) { return; }
		$('#tab_content_wrap').each(function() {
			$(this).find('div.tab_contents:first').show();
		});
		$('ul#tabList li a').click(function() {
			if (!$(this).hasClass('on')) {
				$(this).addClass('on').parent('li').siblings('li').find('a.on').removeClass('on');
				$($(this).attr('href')).show().siblings('div.tab_contents').hide();
			}
		   // this.blur();
			return false;
		});
	}
	
$(document).ready(function(){
		$('.footer_gnb ul li a').bind('mouseover focusin touchstart', function(){
			$(this).addClass('btn_hover');
		}).bind('mouseout focusout touchend', function(){
			$(this).removeClass('btn_hover');
		});		
});	