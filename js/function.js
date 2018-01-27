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
	$('.menu__list a[href^="#"]').click( function(){ 
		var scroll_el = $(this).attr('href'); 
		if ($(scroll_el).length != 0) {
		$('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 700);
		}
		return false;
	});

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
   	// gridMatch();


    // Menu open/close
    var list = $('.menu__list');
    var listWrap = $('.menu__list_wrap');

    var actionBox = $('.header__action');
    // var actionWid = actionBox.width();
    var language = $('.language');

    language.width(language.width());

    actionBox.width(actionBox.width());

    $('.menu__toggle').on('click', function(event) {
        event.preventDefault();

        if (!isXsWidth()) {
            $('.menu').toggleClass('open');
        }

        var toggle = $(this);

        if (toggle.hasClass('open')) {
            // If menu open
            listWrap.removeClass('show');
            list.removeClass('animated slideInLeft');
            list.addClass('animated slideOutLeft');
            setTimeout(function() {
                toggle.removeClass('open');
            }, 500);
            setTimeout(function() {
                if (!isXsWidth()) {
                    actionBox.removeClass('hide');
                    language.removeClass('hide');
                }
            }, 600);
        } else {
            // If menu close
            if (!isXsWidth()) {
                actionBox.addClass('hide');
                language.addClass('hide');
            }
            setTimeout(function() {
                toggle.addClass('open');
            }, 200);
            setTimeout(function() {
                var listWid = list.width();
                list.removeClass('animated slideOutLeft');
                list.addClass('animated slideInLeft');
                listWrap.addClass('show');
            }, 400);
        }
    });

    // Animete first screen
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
    var smiSlider = $('.smi__slider');
    var newslider = $('.news__slider');

    slider.slick({
        dots: true,
        prevArrow: $('.exp__slider_prev'),
        nextArrow: $('.exp__slider_next'),
        adaptiveHeight: true,
        initialSlide: 18,
        autoplay: true,
        autoplaySpeed: 5000,
        infinite: true,
        responsive: [
            {
            breakpoint: 767,
            settings: {
                    autoplay: false,
                }
            }
        ]
    });

    smiSlider.slick({
        prevArrow: $('.smi__slider_prev'),
        nextArrow: $('.smi__slider_next'),
        adaptiveHeight: true,
        // autoplay: true,
        // autoplaySpeed: 5000,
        responsive: [
            {
            breakpoint: 767,
            settings: {
                    autoplay: false,
                }
            }
        ]
    });

    newslider.slick({
        prevArrow: $('.news__slider_prev'),
        nextArrow: $('.news__slider_next'),
        adaptiveHeight: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        // autoplay: true,
        // autoplaySpeed: 5000,
        responsive: [
        {
            breakpoint: 991,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                autoplay: false,
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: false,
            }
        }
        ]
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

        $('.slide__top').addClass("hidden").viewportChecker({
            classToAdd: 'visible animated fadeInUp',
            offset: 100
        });
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
        // animStart('.slide__top', 'fadeInUp');

        fixGridHeight();

        actionBox.removeAttr('style');
        actionBox.width(actionBox.width());


    }

    // Contact form
    $('.contact__item_field').on('focus', function() {
        $(this).closest('.contact__item').addClass('focused')
    });

    $('.contact__item_field, .presale__form input[type=text]').on('blur', function() {
        if ($(this).val().length < 1) {
            $(this).closest('.contact__item').removeClass('focused');
        } else {
            $(this).removeClass('invalid');
        }
    });

    $('.contact__form,.presale__form').submit(function() {
        if (checkEmptyField($(this)) == 'invalid') {
            return false;
        } else {
            // показываем попап после успешной подписки на новости
            // if ($(this).hasClass('contact__form')) {
            //     $('#success__modal').modal('show');
            // }
        }
    });

    $('input[type=checkbox]').on('change', function() {
        if ($(this).prop('checked')) {
            $(this).removeClass('invalid');
        }
    });

    // $('.success__box_code--copy').on('click', function() {
    //     CopyToClipboard('salecode');
    // });

});

function checkEmptyField(form) {
    var empty = 0;
    var fields = $(form).find('input[type=text]');
    var checker = $(form).find('input[type=checkbox]');

    $(fields).each(function() {
        if ($(this).val() == '') {
            $(this).addClass('invalid');
            empty++;
        } else {
            $(this).removeClass('invalid');
        }
    });

    if (empty > 0) {
        return 'invalid';
    }

    if (!(checker.prop('checked'))) {
        checker.addClass('invalid');
        return 'invalid';
    }
}

$(window).resize(function(event) {
	checkOnResize();
});

function checkOnResize() {
   	// gridMatch();
    var teamItem = $('[data-fix-height] .grid__wrapper');
    teamItem.removeAttr('style');
    teamItem.each(function() {
        var elHei = teamItem.height();
        $(this).css('height', elHei);
    });

}

// function gridMatch() {
//    	$('[data-grid-match] .grid__item').matchHeight({
//    		byRow: true,
//    	});
// }

// function animStart(el, anim) {
//     var windowHeight = $(window).height();

//     $(el).addClass('hidden');
 
//     $(document).on('scroll', function() {
//         $(el).each(function() {
//             var self = $(this),
//             height = self.offset().top + self.height();
//             if ($(document).scrollTop() + windowHeight >= height) {
//                 self.addClass('visible animated '+anim)
//             }
//         });
//     });
// }

function fixGridHeight() {
    var el = $('[data-fix-height] .grid__wrapper');
    $('[data-fix-height] img').on('load', function() {    
        var elHei = el.height();
        el.each(function() {
            $(this).css('height', elHei);
        });
    });

}
