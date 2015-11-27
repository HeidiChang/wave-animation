$(document).ready(function(){
	for(i = 0; i < 16; i++){		
		var x = Math.floor((Math.random() * 100) + 1);
		var y = Math.floor((Math.random() * 100) + 1) - 6;
		var bubblesize = Math.floor((Math.random() * 12));
		if ((x < 36 || x > 56) && ( y < 36 || y > 56))  {
			$('.logo').after('<div class="bubble" style="top:'+y+'%; left:'+x+'%; height:'+bubblesize+'vw; width:'+bubblesize+'vw;"></div>');	
		}
		else i--;
	}
	var start = $('.bubble:first');

	function fade(lobj){
		var fadeTime = Math.floor((Math.random() * 400) + 1);
		lobj.fadeTo(fadeTime,lobj.css('opacity')==1 ? 0 : 0.75, 
			function(){
		        var nobj = lobj.next();
		        if(nobj.length)
		            fade(nobj);
		        //else
		            //fade(start);//加上這段會不斷循環
	    	});
	}

	// make some waves.
	var ocean = document.getElementById("ocean"),
	    waveWidth = 10,
	    waveCount = Math.floor(window.innerWidth/waveWidth),
	    docFrag = document.createDocumentFragment();

	for(var i = 0; i < waveCount; i++){
	  var wave = document.createElement("div");
	  wave.className += " wave";
	  docFrag.appendChild(wave);
	  wave.style.left = i * waveWidth + "px";
	  wave.style.webkitAnimationDelay = (i/100) + "s";

	  var wave_middle = document.createElement("div");
	  wave_middle.className += " wave_middle";
	  docFrag.appendChild(wave_middle);
	  wave_middle.style.left = i * waveWidth + "px";
	  wave_middle.style.webkitAnimationDelay = (i/91) + "s";

	  var wave_bottom = document.createElement("div");
	  wave_bottom.className += " wave_bottom";
	  docFrag.appendChild(wave_bottom);
	  wave_bottom.style.left = i * waveWidth + "px";
	  wave_bottom.style.webkitAnimationDelay = (i/97) + "s";

	  var wave_light = document.createElement("div");
	  wave_light.className += " wave_light";
	  docFrag.appendChild(wave_light);
	  wave_light.style.left = i * waveWidth + "px";
	  wave_light.style.webkitAnimationDelay = 0 + "s";

	}

	fade(start);
	ocean.appendChild(docFrag);

	var stickyTop = $('#menu').offset().top; // returns number 
	var windowHH = ($("#menu").height())*0.3;
	
	$(window).scroll(function(){ // scroll event
		var windowTop = $(window).scrollTop(); // returns number
		if (stickyTop < windowTop) {
			$('#menu').css({ position: 'fixed', top: 0 });
		}
		else {
			$('#menu').css('position','relative');
		}

		var intrTop = $("#intr").offset().top - windowHH ;
		var manualTop = $("#manual").offset().top - windowHH ;

		if( windowTop >= intrTop && windowTop < manualTop){
			$("#menu").find('.active').removeClass('active');
			$("#menu a[data-ref='#intr']").addClass('active');
		}
		else if( windowTop >= manualTop ){
			$("#menu").find('.active').removeClass('active');
			$("#menu a[data-ref='#manual']").addClass('active');
		}
	});

	$("#menu a").click(function(){
		var target = $(this).attr('data-ref');
		var pos = $(target).offset().top;
		$('html, body').animate({scrollTop: pos}, pos*0.5);
		$("#menu").find('.active').removeClass('active');
		$(this).addClass('active');
		if($(window).innerWidth() <= 1024){
			$('#menu').css({ position: 'relative', left: '-100%', display: 'none', 'z-index': '0' });
			$('#menu_btn').removeClass('open');
		}
	});
	
});