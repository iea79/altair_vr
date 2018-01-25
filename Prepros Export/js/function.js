var TempApp = {
    lgWidth: 1200,
    mdWidth: 992,
    smWidth: 768,
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    touchDevice: function() { return navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i); }
};

function isLgWidth() { return $(window).width() >= TempApp.lgWidth; } // >= 1200
function isMdWidth() { return $(window).width() >= TempApp.mdWidth && $(window).width() < TempApp.lgWidth; } //  >= 992 && < 1200
function isSmWidth() { return $(window).width() >= TempApp.smWidth && $(window).width() < TempApp.mdWidth; } // >= 768 && < 992
function isXsWidth() { return $(window).width() < TempApp.smWidth; } // < 768
function isIOS() { return TempApp.iOS(); } // for iPhone iPad iPod
function isTouch() { return TempApp.touchDevice(); } // for touch device

// Хак для клика по ссылке на iOS
if (isIOS()) {
    $(function(){$(document).on('touchend', 'a', $.noop)});
}

if ('flex' in document.documentElement.style) {
	// Хак для UCBrowser
	if (navigator.userAgent.search(/UCBrowser/) > -1) {
		document.documentElement.setAttribute('data-browser', 'not-flex');
	} else {		
	    // Flexbox-совместимый браузер.
		document.documentElement.setAttribute('data-browser', 'flexible');
	}
} else {
    // Браузер без поддержки Flexbox, в том числе IE 9/10.
	document.documentElement.setAttribute('data-browser', 'not-flex');
}

$(document).ready(function() {

	// First screen full height
	function setHeiHeight() {
	    $('.full__height').css({
	        minHeight: $(window).height() + 'px'
	    });
	}
	setHeiHeight(); // устанавливаем высоту окна при первой загрузке страницы
	$(window).resize( setHeiHeight ); // обновляем при изменении размеров окна


	// Reset link whte attribute href="#"
	$('[href*="#"]').click(function(event) {
		event.preventDefault();
	});

    $('.language__current').on('click', function() {
        $(this).parent().toggleClass('open');
    });

	// Scroll to ID // Плавный скролл к элементу при нажатии на ссылку. В ссылке указываем ID элемента
	// $('#main__menu a[href^="#"]').click( function(){ 
	// 	var scroll_el = $(this).attr('href'); 
	// 	if ($(scroll_el).length != 0) {
	// 	$('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500);
	// 	}
	// 	return false;
	// });

	// Stiky menu // Липкое меню. При прокрутке к элементу #header добавляется класс .stiky который и стилизуем
    // $(document).ready(function(){
    //     var HeaderTop = $('#header').offset().top;
        
    //     $(window).scroll(function(){
    //             if( $(window).scrollTop() > HeaderTop ) {
    //                     $('#header').addClass('stiky');
    //             } else {
    //                     $('#header').removeClass('stiky');
    //             }
    //     });
    // });
   	// setGridMatch($('[data-grid-match] .grid__item'));
   	gridMatch();

    $('.polifill').constellation({
        star: {
            width: 3,
            color: 'rgba(31, 75, 93, 0.3)'
        },
        line: {
        	width: 2,
            color: 'rgba(31, 75, 93, 0.1)'
        },
        // radius: 300,
    	length: (window.innerWidth / 10),
		radius: (window.innerWidth / 5)
    });

    $('.polifill_min').constellation({
        star: {
            width: 1,
            color: 'rgba(31, 75, 93, 0.1)'
        },
        line: {
            width: 1,
            color: 'rgba(31, 75, 93, 0.1)'
        },
    	length: (window.innerWidth / 8),
		radius: (window.innerWidth / 6)
    });

    var slider = $('.exp__slider');

    slider.slick({
        dots: true,
        prevArrow: $('.exp__slider_prev'),
        nextArrow: $('.exp__slider_next'),
        adaptiveHeight: true,
        initialSlide: 18,
        autoplay: true,
        autoplaySpeed: 4000
    });

    $('.team__more').on('click', function(event) {
        event.preventDefault();
        $(this).parent().find('.team__descr').toggleClass('open');
        $(this).toggleClass('open');
    });

    $('.team__grid .grid__item').on('mouseleave', function(event) {
        event.preventDefault();
        $(this).find('.team__descr,.team__more').removeClass('open');
    });

    if (!isXsWidth()) {

        // $('.slide__left').addClass("hidden.toggleClass('open')").viewportChecker({
        //     classToAdd: 'visible animated slideInLeft',
        //     offset: 100
        // });

        // $('.slide__right').addClass("hidden").viewportChecker({
        //     classToAdd: 'visible animated slideInRight',
        //     offset: 100
        // });

        // $('.slide__top').addClass("hidden").viewportChecker({
        //     classToAdd: 'visible animated fadeInUp',
        //     offset: 100
        // });
        // var target = $('.slide__top');
        // target.each(function(index) {        
        //     var targetPos = target.offset().top;
        //     var winHeight = $(window).height();
        //     var scrollToElem = targetPos - winHeight;
        //     target.addClass('hidden').attr('data-anim', index);;
        // });
        // $(window).scroll(function(){
        // var winScrollTop = $(this).scrollTop();
        //     if(winScrollTop > scrollToElem){
        //         target.addClass('visible animated fadeInUp');
        //         //сработает когда пользователь доскроллит к элементу с классом .elem
        //     }
        // });

        // animStart('.slide__left', 'slideInLeft');
        // animStart('.slide__right', 'slideInRight');
        animStart('.slide__top', 'fadeInUp');

        fixGridHeight();

    }


});

$(window).resize(function(event) {
	checkOnResize();
});

function checkOnResize() {
   	gridMatch();
    fixGridHeight();
}

function gridMatch() {
   	$('[data-grid-match] .grid__item').matchHeight({
   		byRow: true,
   	});
}

function animStart(el, anim) {
    var windowHeight = $(window).height();

    $(el).addClass('hidden');
 
    $(document).on('scroll', function() {
        $(el).each(function() {
            var self = $(this),
            height = self.offset().top + self.height();
            if ($(document).scrollTop() + windowHeight >= height) {
                self.addClass('visible animated '+anim)
            }
        });
    });
}

function fixGridHeight() {
    var el = $('[data-fix-height] .grid__wrapper');
    $('[data-fix-height] img').on('load', function() {    
        var elHei = el.height();
        el.each(function() {
            $(this).css('height', elHei);
        });
    });
}
