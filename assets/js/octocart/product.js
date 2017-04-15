jQuery(function ($) {

    // Tabs
    $('body')
        .on('click', '.oc-tabs li a, ul.tabs li a', function (e) {
            e.preventDefault();
            var $tab = $(this);
            var $tabs_wrapper = $tab.closest('.oc-tabs-wrapper, .octocart-tabs');
            var $tabs = $tabs_wrapper.find('.oc-tabs, ul.tabs');

            $tabs.find('li').removeClass('active');
            $tabs_wrapper.find('.oc-tab, .panel:not(.panel .panel)').hide();

            $tab.closest('li').addClass('active');
            $tabs_wrapper.find($tab.attr('href')).show();
        });

    $('.oc-tab, .octocart-tabs .panel:not(.panel .panel)').hide();
    var hash = window.location.hash;
    var url = window.location.href;
    var $tabs = $(this).find('.oc-tabs, ul.tabs').first();

    if (hash.toLowerCase().indexOf('comment-') >= 0 || hash === '#reviews' || hash === '#tab-reviews') {
        $tabs.find('li.reviews_tab a').click();
    } else if (url.indexOf('comment-page-') > 0 || url.indexOf('cpage=') > 0) {
        $tabs.find('li.reviews_tab a').click();
    } else {
        $tabs.find('li:first a').click();
    }

    // Slider
    if ($('.bxslider img').length > 0) {

        // Cache the thumb selector for speed
        var thumb = $('#gallery-thumbs').find('.thumb');

        // How many thumbs do you want to show & scroll by
        var visibleThumbs = 4;

        // Thumbnail slider
        var thumbsSlider = $('#gallery-thumbs').bxSlider({
            controls: false,
            pager: false,
            easing: 'easeInOutQuint',
            //displaySlideQty: visibleThumbs,
            //moveSlideQty: visibleThumbs,
            infiniteLoop: false,
            slideWidth: 100,
            minSlides: visibleThumbs,
            maxSlides: visibleThumbs,
            slideMargin: 10
        });

        // Put slider into variable to use public functions
        var gallerySlider = $('.bxslider').bxSlider({
            controls: true,
            pager: false,
            easing: 'easeInOutQuint',
            infiniteLoop: false,
            speed: 500,
            nextText: '&gt;',
            prevText: '&lt;',

            onSlideAfter: function ($slideElement, oldIndex, newIndex) {
                thumb.removeClass('pager-active');
                thumb.eq(newIndex).addClass('pager-active');
                // Action next carousel slide on one before the end, so newIndex + 1
                var currentSlideNumber = newIndex + 1;

                // Calculate the first number and ignore the remainder
                var m = Math.floor(currentSlideNumber / visibleThumbs);
                // Multiply by the number of visible slides to calculate the exact slide we need to move to
                var slideTo = m;

                // Tell the slider to move
                thumbsSlider.goToSlide(slideTo);
            }
        });

        // When clicking a thumb
        thumb.click(function (e) {

            // -6 as BX slider clones a bunch of elements
            gallerySlider.goToSlide($(this).closest('.thumb-item').index());

            // Prevent default click behaviour
            e.preventDefault();
        });

        // When you click on a thumb
        $('#gallery-thumbs').find('.thumb').click(function () {

            // Remove the active class from all thumbs
            $('#gallery-thumbs').find('.thumb').removeClass('pager-active');

            // Add the active class to the clicked thumb
            $(this).addClass('pager-active');

        });

    }

});