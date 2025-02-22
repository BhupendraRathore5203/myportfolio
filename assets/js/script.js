$(document).ready(function () {
    // Cache the navigation links and sections
    const $links = $(".navbar-custom-links");
    const $sections = $("section[id^='section']");

    // Function to highlight the link based on the visible section
    function highlightLink() {
        let scrollPosition = $(document).scrollTop();

        $sections.each(function () {
            const sectionTop = $(this).offset().top - 70; // Add offset to start highlighting slightly before
            const sectionBottom = sectionTop + $(this).outerHeight();

            const $link = $(`#link-${this.id}`);

            // Check if the current section is in view
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                $links.css("color", "white"); // Reset all links to white
                $link.css("color", "#009FC2"); // Highlight the current link
            }
        });
    }

    // Trigger the function on page load and scroll
    highlightLink();
    $(window).on("scroll", highlightLink);
});

$(document).ready(function () {
    // Smooth scrolling
    $('.navbar-custom-links').click(function (event) {
        event.preventDefault(); // Prevent default anchor click behavior
        const targetSection = $(this).data('target'); // Get the target from data attribute
        const targetOffset = $('#' + targetSection).offset().top;
        if ($(window).width() < 767) {
            $("#menu").slideUp();
        }
        // Animate scrolling
        $('html, body').animate({
            scrollTop: targetOffset
        }, 1500); // Duration in milliseconds
    });
});





$(document).ready(function () {
    $("#menu-button").on('click', function () {
        $("#menu").slideToggle();
    });


    $(".navbar-custom-links").click(function (e) {
        e.preventDefault(); // Prevent default link behavior

        // Reset all links to white
        $(".navbar-custom-links").css("color", "white");

        // Set the clicked link color to red
        $(this).css("color", "#009FC2");
    });


    // Function to check if an element is in the viewport
    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return rect.top >= 0 && rect.bottom <= window.innerHeight;
    }

    // Function to animate progress bars
    function animateProgressBars() {
        $('.progress-bar').each(function () {
            // Check if progress bar is visible and not animated yet
            if (isElementInViewport(this) && !$(this).hasClass('animated')) {
                // Animate width from 0 to the full width of the progress bar
                var progressWidth = $(this).find('.progress').data('width');
                $(this).find('.progress').animate({ width: progressWidth }, 600, function () {
                    // Add 'animated' class after animation completes to prevent re-animation
                    $(this).closest('.progress-bar').addClass('animated');
                });
                $(this).closest('.progress-bar').addClass('animated');
            }
        });
    }

    // Initialize: Check visibility of progress bars on page load
    animateProgressBars();

    // On scroll: Check visibility and animate if in view
    $(window).on('scroll', function () {
        animateProgressBars();
    });

    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function (event) {
        event.preventDefault(); // Prevent the default anchor behavior

        // Get the target section's position
        var target = $($(this).attr('href'));
        if ($(window).width() < 768) {
            $scrollToValue = target.offset().top - 400;
        } else {
            $scrollToValue = target.offset().top - 100;
        }
        if (target.length) {
            $('html, body').animate(
                {
                    scrollTop: $scrollToValue, // Scroll to the top of the target section
                },
                1000, // Duration of animation in milliseconds
                'swing' // Easing function
            );
        }
    });



});

$(document).ready(function () {
    const scrollAmount = 350; // Amount to scroll in pixels
    const carousel = $('#education-carousel');

    // Scroll Left
    $('#prev-btn').click(function () {
        carousel.animate({ scrollLeft: '-=' + scrollAmount }, 500);
    });

    // Scroll Right
    $('#next-btn').click(function () {
        carousel.animate({ scrollLeft: '+=' + scrollAmount }, 500);
    });

    // Add hover animations to items
    $('.snap-center').hover(
        function () {
            $(this).addClass('scale-105');
        },
        function () {
            $(this).removeClass('scale-105');
        }
    );

    // Auto-scroll and connect timeline animations
    let scrollInterval = setInterval(() => {
        carousel.animate({ scrollLeft: '+=1' }, 100);
    }, 30);

    // Pause scrolling on hover
    carousel.hover(
        () => clearInterval(scrollInterval),
        () => (scrollInterval = setInterval(() => carousel.animate({ scrollLeft: '+=1' }, 100), 30))
    );
});



jQuery(document).ready(function ($) {
    var timelines = $('.cd-horizontal-timeline'),
        eventsMinDistance = 60;

    (timelines.length > 0) && initTimeline(timelines);

    function initTimeline(timelines) {
        timelines.each(function () {
            var timeline = $(this),
                timelineComponents = {};
            //cache timeline components 
            timelineComponents['timelineWrapper'] = timeline.find('.events-wrapper');
            timelineComponents['eventsWrapper'] = timelineComponents['timelineWrapper'].children('.events');
            timelineComponents['fillingLine'] = timelineComponents['eventsWrapper'].children('.filling-line');
            timelineComponents['timelineEvents'] = timelineComponents['eventsWrapper'].find('a');
            timelineComponents['timelineDates'] = parseDate(timelineComponents['timelineEvents']);
            timelineComponents['eventsMinLapse'] = minLapse(timelineComponents['timelineDates']);
            timelineComponents['timelineNavigation'] = timeline.find('.cd-timeline-navigation');
            timelineComponents['eventsContent'] = timeline.children('.events-content');

            //assign a left postion to the single events along the timeline
            setDatePosition(timelineComponents, eventsMinDistance);
            //assign a width to the timeline
            var timelineTotWidth = setTimelineWidth(timelineComponents, eventsMinDistance);
            //the timeline has been initialize - show it
            timeline.addClass('loaded');

            //detect click on the next arrow
            timelineComponents['timelineNavigation'].on('click', '.next', function (event) {
                event.preventDefault();
                updateSlide(timelineComponents, timelineTotWidth, 'next');
            });
            //detect click on the prev arrow
            timelineComponents['timelineNavigation'].on('click', '.prev', function (event) {
                event.preventDefault();
                updateSlide(timelineComponents, timelineTotWidth, 'prev');
            });
            //detect click on the a single event - show new event content
            timelineComponents['eventsWrapper'].on('click', 'a', function (event) {
                event.preventDefault();
                timelineComponents['timelineEvents'].removeClass('selected');
                $(this).addClass('selected');
                updateOlderEvents($(this));
                updateFilling($(this), timelineComponents['fillingLine'], timelineTotWidth);
                updateVisibleContent($(this), timelineComponents['eventsContent']);
            });

            //on swipe, show next/prev event content
            timelineComponents['eventsContent'].on('swipeleft', function () {
                var mq = checkMQ();
                (mq == 'mobile') && showNewContent(timelineComponents, timelineTotWidth, 'next');
            });
            timelineComponents['eventsContent'].on('swiperight', function () {
                var mq = checkMQ();
                (mq == 'mobile') && showNewContent(timelineComponents, timelineTotWidth, 'prev');
            });

            //keyboard navigation
            $(document).keyup(function (event) {
                if (event.which == '37' && elementInViewport(timeline.get(0))) {
                    showNewContent(timelineComponents, timelineTotWidth, 'prev');
                } else if (event.which == '39' && elementInViewport(timeline.get(0))) {
                    showNewContent(timelineComponents, timelineTotWidth, 'next');
                }
            });
        });
    }

    function updateSlide(timelineComponents, timelineTotWidth, string) {
        //retrieve translateX value of timelineComponents['eventsWrapper']
        var translateValue = getTranslateValue(timelineComponents['eventsWrapper']),
            wrapperWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', ''));
        //translate the timeline to the left('next')/right('prev') 
        (string == 'next')
            ? translateTimeline(timelineComponents, translateValue - wrapperWidth + eventsMinDistance, wrapperWidth - timelineTotWidth)
            : translateTimeline(timelineComponents, translateValue + wrapperWidth - eventsMinDistance);
    }

    function showNewContent(timelineComponents, timelineTotWidth, string) {
        //go from one event to the next/previous one
        var visibleContent = timelineComponents['eventsContent'].find('.selected'),
            newContent = (string == 'next') ? visibleContent.next() : visibleContent.prev();

        if (newContent.length > 0) { //if there's a next/prev event - show it
            var selectedDate = timelineComponents['eventsWrapper'].find('.selected'),
                newEvent = (string == 'next') ? selectedDate.parent('li').next('li').children('a') : selectedDate.parent('li').prev('li').children('a');

            updateFilling(newEvent, timelineComponents['fillingLine'], timelineTotWidth);
            updateVisibleContent(newEvent, timelineComponents['eventsContent']);
            newEvent.addClass('selected');
            selectedDate.removeClass('selected');
            updateOlderEvents(newEvent);
            updateTimelinePosition(string, newEvent, timelineComponents, timelineTotWidth);
        }
    }

    function updateTimelinePosition(string, event, timelineComponents, timelineTotWidth) {
        //translate timeline to the left/right according to the position of the selected event
        var eventStyle = window.getComputedStyle(event.get(0), null),
            eventLeft = Number(eventStyle.getPropertyValue("left").replace('px', '')),
            timelineWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', '')),
            timelineTotWidth = Number(timelineComponents['eventsWrapper'].css('width').replace('px', ''));
        var timelineTranslate = getTranslateValue(timelineComponents['eventsWrapper']);

        if ((string == 'next' && eventLeft > timelineWidth - timelineTranslate) || (string == 'prev' && eventLeft < - timelineTranslate)) {
            translateTimeline(timelineComponents, - eventLeft + timelineWidth / 2, timelineWidth - timelineTotWidth);
        }
    }

    function translateTimeline(timelineComponents, value, totWidth) {
        var eventsWrapper = timelineComponents['eventsWrapper'].get(0);
        value = (value > 0) ? 0 : value; //only negative translate value
        value = (!(typeof totWidth === 'undefined') && value < totWidth) ? totWidth : value; //do not translate more than timeline width
        setTransformValue(eventsWrapper, 'translateX', value + 'px');
        //update navigation arrows visibility
        (value == 0) ? timelineComponents['timelineNavigation'].find('.prev').addClass('inactive') : timelineComponents['timelineNavigation'].find('.prev').removeClass('inactive');
        (value == totWidth) ? timelineComponents['timelineNavigation'].find('.next').addClass('inactive') : timelineComponents['timelineNavigation'].find('.next').removeClass('inactive');
    }

    function updateFilling(selectedEvent, filling, totWidth) {
        //change .filling-line length according to the selected event
        var eventStyle = window.getComputedStyle(selectedEvent.get(0), null),
            eventLeft = eventStyle.getPropertyValue("left"),
            eventWidth = eventStyle.getPropertyValue("width");
        eventLeft = Number(eventLeft.replace('px', '')) + Number(eventWidth.replace('px', '')) / 2;
        var scaleValue = eventLeft / totWidth;
        setTransformValue(filling.get(0), 'scaleX', scaleValue);
    }

    function setDatePosition(timelineComponents, min) {
        for (i = 0; i < timelineComponents['timelineDates'].length; i++) {
            var distance = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][i]),
                distanceNorm = Math.round(distance / timelineComponents['eventsMinLapse']) + 2;
            timelineComponents['timelineEvents'].eq(i).css('left', distanceNorm * min + 'px');
        }
    }

    function setTimelineWidth(timelineComponents, width) {
        var timeSpan = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][timelineComponents['timelineDates'].length - 1]),
            timeSpanNorm = timeSpan / timelineComponents['eventsMinLapse'],
            timeSpanNorm = Math.round(timeSpanNorm) + 4,
            totalWidth = timeSpanNorm * width;
        // console.log(totalWidth);
        timelineComponents['eventsWrapper'].css('width', totalWidth + 'px');
        updateFilling(timelineComponents['timelineEvents'].eq(0), timelineComponents['fillingLine'], totalWidth);

        return totalWidth;
    }

    function updateVisibleContent(event, eventsContent) {
        var eventDate = event.data('date'),
            visibleContent = eventsContent.find('.selected'),
            selectedContent = eventsContent.find('[data-date="' + eventDate + '"]'),
            selectedContentHeight = selectedContent.height();

        if (selectedContent.index() > visibleContent.index()) {
            var classEnetering = 'selected enter-right',
                classLeaving = 'leave-left';
        } else {
            var classEnetering = 'selected enter-left',
                classLeaving = 'leave-right';
        }

        selectedContent.attr('class', classEnetering);
        visibleContent.attr('class', classLeaving).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
            visibleContent.removeClass('leave-right leave-left');
            selectedContent.removeClass('enter-left enter-right');
        });
        eventsContent.css('height', selectedContentHeight + 'px');
    }

    function updateOlderEvents(event) {
        event.parent('li').prevAll('li').children('a').addClass('older-event').end().end().nextAll('li').children('a').removeClass('older-event');
    }

    function getTranslateValue(timeline) {
        var timelineStyle = window.getComputedStyle(timeline.get(0), null),
            timelineTranslate = timelineStyle.getPropertyValue("-webkit-transform") ||
                timelineStyle.getPropertyValue("-moz-transform") ||
                timelineStyle.getPropertyValue("-ms-transform") ||
                timelineStyle.getPropertyValue("-o-transform") ||
                timelineStyle.getPropertyValue("transform");

        if (timelineTranslate.indexOf('(') >= 0) {
            var timelineTranslate = timelineTranslate.split('(')[1];
            timelineTranslate = timelineTranslate.split(')')[0];
            timelineTranslate = timelineTranslate.split(',');
            var translateValue = timelineTranslate[4];
        } else {
            var translateValue = 0;
        }

        return Number(translateValue);
    }

    function setTransformValue(element, property, value) {
        element.style["-webkit-transform"] = property + "(" + value + ")";
        element.style["-moz-transform"] = property + "(" + value + ")";
        element.style["-ms-transform"] = property + "(" + value + ")";
        element.style["-o-transform"] = property + "(" + value + ")";
        element.style["transform"] = property + "(" + value + ")";
    }

    //based on http://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
    function parseDate(events) {
        var dateArrays = [];
        events.each(function () {
            var dateComp = $(this).data('date').split('/'),
                newDate = new Date(dateComp[2], dateComp[1] - 1, dateComp[0]);
            dateArrays.push(newDate);
        });
        return dateArrays;
    }

    function parseDate2(events) {
        var dateArrays = [];
        events.each(function () {
            var singleDate = $(this),
                dateComp = singleDate.data('date').split('T');
            if (dateComp.length > 1) { //both DD/MM/YEAR and time are provided
                var dayComp = dateComp[0].split('/'),
                    timeComp = dateComp[1].split(':');
            } else if (dateComp[0].indexOf(':') >= 0) { //only time is provide
                var dayComp = ["2000", "0", "0"],
                    timeComp = dateComp[0].split(':');
            } else { //only DD/MM/YEAR
                var dayComp = dateComp[0].split('/'),
                    timeComp = ["0", "0"];
            }
            var newDate = new Date(dayComp[2], dayComp[1] - 1, dayComp[0], timeComp[0], timeComp[1]);
            dateArrays.push(newDate);
        });
        return dateArrays;
    }

    function daydiff(first, second) {
        return Math.round((second - first));
    }

    function minLapse(dates) {
        //determine the minimum distance among events
        var dateDistances = [];
        for (i = 1; i < dates.length; i++) {
            var distance = daydiff(dates[i - 1], dates[i]);
            dateDistances.push(distance);
        }
        return Math.min.apply(null, dateDistances);
    }

    /*
        How to tell if a DOM element is visible in the current viewport?
        http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
    */
    function elementInViewport(el) {
        var top = el.offsetTop;
        var left = el.offsetLeft;
        var width = el.offsetWidth;
        var height = el.offsetHeight;

        while (el.offsetParent) {
            el = el.offsetParent;
            top += el.offsetTop;
            left += el.offsetLeft;
        }

        return (
            top < (window.pageYOffset + window.innerHeight) &&
            left < (window.pageXOffset + window.innerWidth) &&
            (top + height) > window.pageYOffset &&
            (left + width) > window.pageXOffset
        );
    }

    function checkMQ() {
        //check if mobile or desktop device
        return window.getComputedStyle(document.querySelector('.cd-horizontal-timeline'), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
    }
});

$(document).ready(function () {
    const currentYear = new Date().getFullYear(); // Get the current year
    $("#this-year-copy-right").text(currentYear); // Set the year to the element


    const $scrollToTop = $('#scrollToTop');

    // Show or hide the button based on scroll position
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 600) {
            $scrollToTop.addClass('show'); // Show the button when scrolled 600px
        } else {
            $scrollToTop.removeClass('show'); // Hide the button otherwise
        }
    });

    // Smooth scroll to top when the button is clicked
    $scrollToTop.on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 600, function () {
            $scrollToTop.removeClass('show'); // Ensure the button is hidden after reaching the top
        });
    });
});


$(document).ready(function () {
    // Function to handle shadow toggling
    function toggleNavShadow() {
        // Check if section1 is in the viewport
        const section1 = $('#section1');
        const section1Top = section1.offset().top;
        const section1Bottom = section1Top + section1.outerHeight();
        const scrollPosition = $(window).scrollTop() + 100;
        const windowHeight = $(window).height();

        if (scrollPosition >= section1Top && scrollPosition < section1Bottom) {
            // Section 1 is visible
            $('nav').removeClass('shadow-2xl');
        } else {
            // Section 1 is not visible
            $('nav').addClass('shadow-2xl');
        }
    }

    // Initial call to set shadow based on the initial viewport
    toggleNavShadow();

    // Add scroll event listener
    $(window).on('scroll', function () {
        toggleNavShadow();
    });
});


$(document).ready(function () {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxVZhUTr4xoPX8eOWockI6j1YRysTGb5cXX1MJJ1RvQHx331rH1Ys2CtvZ_CpvFuDw/exec';

    $("#contact-form").on("submit", function (e) {
        e.preventDefault();

        // Gather form data
        const formData = {
            name: $("#name").val(),
            email: $("#email").val(),
            subject: $("#subject").val(),
            message: $("#message").val(),
        };

        // Submit to Google Sheets
        $.ajax({
            url: scriptURL,
            method: "POST",
            data: formData,
            dataType: "application/json",
            success: function (response) {
                $("#contact-form")[0].reset();
            },
        });
        $("#contact-form")[0].reset();
        $('#alert').removeClass('hidden');
        setTimeout(() => {
            $('#alert').addClass('hidden');
        }, 3000);
    });
});

document.getElementById('close-alert').addEventListener('click', function () {
    document.getElementById('alert').classList.add('hidden');
});

