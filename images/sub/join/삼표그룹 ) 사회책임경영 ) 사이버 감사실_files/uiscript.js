/*  Global Menu Bar  */	

var gnbController = function() 
{
	var that = this;
	this.closerTimer = null;
	this.currentAnchor = null;
	this.currentNode = null;
	this.hoverclass = 'hover';
	this.onclass = 'on';
	this.menuheight = 0;

	this.currentCode = parseInt(window.pagecode.split("-")[0],10) - 1;
	this.initialize = function()
	{
		that.gnb = $(that["opts"].gnbobj);
		that.sub = $(that["opts"].gnbsubContent);

		var dummyTimer = null;
		
		if(that["opts"].variousClass) 
		{
			this.hoverclass = that["opts"].variousClass.hoverclass;
			this.onclass = that["opts"].variousClass.onclass;
		}

		that.gnbChildren = that.gnb.find('>ul>li>a');
		that.subChildren = that.sub.find('>div>div');

		that.currentActivior();
		
		that.gnbChildren.live('focus mouseenter',function(e) 
		{
			$('.gnb > ul > li > div').css({'display':'block'});
			$('.gnb > ul > li > div > div').css({'display':'none', 'opacity':'0'});
            if(e.preventDefault) e.preventDefault();
			else e.returnValue = false; 
            e.stopPropagation();

			if(that.currentNode) if(that.currentNode.get(0) === this) return;
			that.hoverfn(this);
		});
		that.gnb.live('mouseleave',function(e) { that.leavefn(); });
		
		that.subChildren.last().bind('focusin',function(e) { clearTimeout(dummyTimer); });
		that.subChildren.last().bind('focusout',function(e) { dummyTimer = setTimeout(function() { that.leavefn() },100); });
		
		//that.menuheight = that.subChildren.last().height();
		//that.subChildren.css({visibility:'hidden',display:'block'}).height(0);
	}
}

gnbController.prototype = 
{
	hidemenu : function(target)
	{
		$('.gnb > ul > li > div').css({'display':'block'});
		$('.gnb > ul > li > div > div').css({'display':'none', 'opacity':'0'});		

	},

	showmenu : function(target)
	{
		
		var topheight = target.height();
		//target.parent().stop().animate({'height':topheight+'px'}, 300);
		target.css({'display':'block'}).stop().animate({'opacity':'1'}, 300);	



	},

	hoverfn : function(self)
	{


		if(this.closerTimer) clearTimeout(this.closerTimer);
		if(this.currentAnchor)
		{
			this.currentAnchor.parent().removeClass(this.hoverclass).removeClass(this.onclass);
			if(this.currentNode) this.hidemenu.call(this,this.currentNode);
			$('.gnb > ul > li > div').css({'display':'block'});
			$('.gnb > ul > li > div > div').css({'display':'none', 'opacity':'0'});			
		}

		this.currentAnchor = $(self);
		this.currentNode = $("#"+this.currentAnchor.attr('name'));
		
		this.currentAnchor.parent().addClass(this.hoverclass);				
		this.showmenu.call(this,this.currentNode);

	},

	leavefn : function()
	{

		var that = this;
		if(this.closerTimer) clearTimeout(this.closerTimer);
		this.closerTimer = setTimeout(function()
		{
			if(that.currentNode)
			{
				$('.gnb > ul > li > div').css({'display':'none'});
				$('.gnb > ul > li > div > div').css({'display':'none', 'opacity':'0'});
				that.currentAnchor.parent().removeClass(that.hoverclass);			 	
				that.hidemenu.call(that,that.currentNode); 
			}
			that.currentAnchor = null;
			that.currentNode = null;

			that.currentActivior();
		},100);
	},

	currentActivior : function() 
	{
		$('.gnb > ul > li > div').css({'display':'none'});
		$('.gnb > ul > li > div > div').css({'display':'none', 'opacity':'0'});
		if(this.currentCode<0) return;
		if(this.currentAnchor) this.currentAnchor.parent().removeClass(this.onclass);
		
		this.currentAnchor = this.gnbChildren.eq(this.currentCode);
		this.currentAnchor.parent().addClass(this.onclass);
	}
}

$(document).ready(function(){
		$('.gnb > ul > li > div > div > ul > li > a').bind('mouseover focusin touchstart', function(){
			$(this).addClass('hv');			
		}).bind('mouseout focusout touchend', function(){
			$(this).removeClass('hv');		
		});
		
		$('.gnb > ul > li > div > div > ul > li > div > a').bind('mouseover focusin touchstart', function(){
			$(this).addClass('hv');			
		}).bind('mouseout focusout touchend', function(){			
			$(this).removeClass('hv');			
		});				
		
		 $('*:not(".gnb a")').focus(function(){
		  $(".gnb > ul > li").removeClass("hover")
		  $('.gnb > ul > li > div').css({'display':'none'});
	  });
	 
	   
	   $(".gnb").each(function(){
		  //var gnbmenu = $("> ul > li > div > div > ul > li")
		  //var gnbDepth = gnbmenu.find('.depth');
		   
		   $("> ul > li > div > div > ul > li > div", this).css({"display":"none"});		   		  		   		   		 
		   $("li.depth").on("mouseenter focusin",function(){																
				  $(this).find('div').show();
				  $(this).find('>a').addClass('on')
				  
			  }).on("mouseleave",function(){
				  $(this).find('div').hide();
				  $(this).find('>a').removeClass('on')
				  
			  }); 	   
	   });   
});


/*   location LNB    */	

$(function() { 
 
 function locationFunction()
	{
		var target = $(".location>ul");
		if(!target.length) return false;
		var children = target.children();
		var currentNode;
		
		function subActivior()
		{
			var self = $(this);
			var timer = null;
			if(self.find('>div.hover').length) 
			{

				var activelayer = self.find('>div.hover');
				activelayer.css('display','block');

				activelayer.find('a').bind('focus',function()
				{
					$(this).addClass('on');
					currentNode = this;
					clearTimeout(timer);
				});
				activelayer.find('a').bind('blur',function()
				{
					if(currentNode) { $(currentNode).removeClass('on'); }
					timer = setTimeout(function() { activelayer.css('display','none'); },100);
				});
			}

		}

		children.bind('focusin',subActivior);
		
		return false;
	}

	new locationFunction();
});


$(function() {
	
	// 맨위로 스크롤
	$('#GoTop, #naviGotop').bind('click',function(){
		$('body, html').stop().animate({scrollTop:0},700, 'easeInOutExpo');		
	});
	
	//푸터 전체메뉴	 
	$('.btn_allmem').click(function () {
		  var $this = $(this);
		  if ($(this).hasClass('active')) {
			  $(this).removeClass('active');				
			  $('.footer_gnb').stop().animate({'height':'0'},{duration:600, easing:"easeOutExpo", complete : function(){					 
		  }});	
									 
			  $this.attr("title", "전체메뉴 열기");
		  } else {
			  $(this).addClass('active');                
			  $this.attr("title", "전체메뉴 닫기");				
			   $('.footer_gnb').stop().animate({'height':'430px'},{duration:600, easing:"easeOutExpo", complete : function(){										  
		   }});	
			$('html, body').stop().animate({scrollTop: $($(this).attr('href')).offset().top}, 600,'easeOutExpo');
		  }
		 return false;
	});
	
	//푸터 전체메뉴 접근성
	$("#footer").each(function(){	
		$('.footer_gnb').on("focusin",function(){	
			$('.footer_gnb').css({'height':'430px'});
			  }).on("focusout",function(){
			$('.footer_gnb').css({'height':'0'});	  				  
		}); 
	}); 	
});