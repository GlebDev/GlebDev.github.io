/*GOVNO------------------------KOD*/
var enter = document.querySelector(".login-enter");
var login_menu = document.querySelector(".login-menu");
var fon = document.querySelector(".fon");
var close = login_menu.querySelector('.login-close');
var login = login_menu.querySelector('.login-field');
var password = login_menu.querySelector('.password-field');
var form = login_menu.querySelector('form');
var bady2= document.getElementById('bady2')
enter.addEventListener('click', function (event) {
    event.preventDefault();
    login_menu.classList.add('login-show');
	fon.classList.toggle('fon-show');
	bady2.classList.toggle('blur');
}, false);
close.addEventListener('click', function (event) {
	event.preventDefault();
	login_menu.classList.remove('login-show');
	fon.classList.remove('fon-show');
	fon.classList.remove('fon-show-passive');
	fon.classList.remove('fon-error');
	bady2.classList.remove('blur');
}, false);

form.addEventListener('submit', function (event) {
	if (!login.value || !password.value) {
      event.preventDefault();
      fon.classList.add('fon-error');
	  fon.classList.remove('fon-show');
		window.setTimeout("{fon.classList.remove('fon-error');fon.classList.add('fon-show-passive');}", 500);

    }
  }, false);

//paralax
	$(window).scroll(function(e){
		  parallax();
		});
		function parallax(){
		  var scrolled = $(window).scrollTop();
		  $('.bg').css('top',-(scrolled*0.4)+'px');
		}

//gallery

$(document).ready(function(){
	var slides = $(".slide").length;					//counts the number of slides there are
	var slideWidth = $(".slide").outerWidth();			//gets the width of a slide
	var currentSlide = 1;						//keeps track of the slide thats visible
	var leftMax = slideWidth * -1 * slides + slideWidth;	//gets the maximum ammount of animation (for navigating to last slide)

	$("#slides").css({"width" : slides * slideWidth});	//sets the with of the slides div, so you can make as many slides as you want

	$(".buttonPrev").click(function(){								//when buttonPrev is clicked start the function
		if (currentSlide == 1)									//when the first slide is selected, we want to animate to the last slide
		{
			$(".buttonPrev").attr('disabled',true);
			$("#slides").animate({left : + leftMax + "px"}, 500);			//animate to the last slide, to the maximum animation
			currentSlide = slides;
			setTimeout(function() { $(".buttonPrev").removeAttr('disabled',true) }, 500);

		}
		else												//if the current slide is not one we want to go one slide back
		{
			$(".buttonPrev").attr('disabled',true);
			$("#slides").animate({left : "+=" + slideWidth + "px"}, 500);		//animate one time the slideWidth back
			currentSlide = currentSlide - 1;
			setTimeout(function() { $(".buttonPrev").removeAttr('disabled',true) }, 500);

		};
	});

	$(".buttonNext").click(function(){								//when buttonNext is clicked start the function
		if (currentSlide == slides)								//when the last slide is selected we want to animate to the first slide
		{
			$(".buttonNext").attr('disabled',true);
			$("#slides").animate({left : "0px"}, 500);					//animate to the minimun left, 0, get back to the start position
			currentSlide = 1;									//set currentSlide variable to 1
			setTimeout(function() { $(".buttonNext").removeAttr('disabled',true) }, 500);
		}
		else 												//if the current slide is not the last slide we want to go forward one slide
		{
			$(".buttonNext").attr('disabled',true);
			$("#slides").animate({left : "-=" + slideWidth + "px"}, 500);		//animate one time the slide forward
			currentSlide = currentSlide + 1;										//update currentslide variable
			setTimeout(function() { $(".buttonNext").removeAttr('disabled',true) }, 500);
		};
	});

});
