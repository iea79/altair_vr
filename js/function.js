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
            width: 0,
            color: 'rgba(31, 75, 93, 0.1)'
        },
        line: {
            color: 'rgba(31, 75, 93, 0.1)'
        },
    	length: (window.innerWidth / 8),
		radius: (window.innerWidth / 6)
    });


});

$(window).resize(function(event) {
	checkOnResize()
});

function checkOnResize() {
   	gridMatch();
}

function gridMatch() {
   	$('[data-grid-match] .grid__item').matchHeight({
   		byRow: true,
   	});
}

