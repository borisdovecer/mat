/*global jQuery */
/* Contents
// ------------------------------------------------>
	1.  LOADING SCREEN
	2.  BACKGROUND INSERT
	3.	NAV MODULE
	4.  MOBILE MENU
	5.  HEADER AFFIX
	6.  HEADER ONE PAGE
	7.  COUNTER UP
	8.  COUNTDOWN DATE
	9.  AJAX MAILCHIMP
	10. AJAX CAMPAIGN MONITOR 
	11. AJAX CONTACT FORM 
	12. OWL CAROUSEL
	13. MAGNIFIC POPUP
	14. MAGNIFIC POPUP VIDEO
	15. ROUNDED SKILL
	16. SWITCH GRID
	17. BACK TO TOP
	18. PORTFOLIO FLITER
	19. SHOP FLITER
	20. FOLLOW INSTAGRAM
	21. TWITTER FEED
	22. SCROLL TO
	23. PROGRESS BAR
	24. NAV SPLIT
	25. SLIDER RANGE
	26. COLUMN HEIGHT
	27. GOOGLE MAP
*/
(function($) {
    "use strict";


    /* ------------------  FOLLOW INSTAGRAM ------------------ */

    var instafeedModule = $('#instafeedModule').length,
        instafeedSidebar = $('#instafeedSidebar').length,
        instafeedSection = $('#instafeedSection').length,
        instafeedFooter = $('#instafeedFooter').length,
        InstaUserID = '10914798979',
        /*YOUR_USER_ID*/
        InstaAccessToken = '10914798979.1677ed0.516c6df12e7b4d4b96534555f02ba46f'; /*YOUR_ACCESS_TOKEN*/
	if (instafeedModule > 0) {

        var userFeedModule = new Instafeed({
            target: 'instafeedModule',
            get: 'user',
            userId: InstaUserID,
            accessToken: InstaAccessToken,
            limit: $('.instafeed').data("insta-number"),
            template: '<a href="{{link}}" target="_blank"><img src="{{image}}" /><div class="insta-hover"><i class="fa fa-plus"></i></div></a>',
            resolution: 'low_resolution',
        });

        userFeedModule.run();
    }

    if (instafeedSidebar > 0) {

        var userFeedSidebar = new Instafeed({
            target: 'instafeedSidebar',
            get: 'user',
            userId: InstaUserID,
            accessToken: InstaAccessToken,
            limit: $('.instafeed').data("insta-number"),
            template: '<a href="{{link}}" target="_blank"><img src="{{image}}" /><div class="insta-hover"><i class="fa fa-plus"></i></div></a>',
            resolution: 'low_resolution',
        });
        userFeedSidebar.run();
    }

    if (instafeedSection > 0) {

        var userFeedSection = new Instafeed({
            target: 'instafeedSection',
            get: 'user',
            userId: InstaUserID,
            accessToken: InstaAccessToken,
            limit: $('.instafeed').data("insta-number"),
            template: '<a href="{{link}}" target="_blank"><img src="{{image}}" /><div class="insta-hover"><i class="fa fa-instagram"></i></div></a>',
            resolution: 'low_resolution',
        });
        userFeedSection.run();
    }

    if (instafeedFooter > 0) {

        var userFeedFooter = new Instafeed({
            target: 'instafeedFooter',
            get: 'user',
            userId: InstaUserID,
            accessToken: InstaAccessToken,
            limit: $('.instafeed').data("insta-number"),
            template: '<a href="{{link}}" target="_blank"><img src="{{image}}" /><div class="insta-hover"><i class="fa fa-plus"></i></div></a>',
            resolution: 'low_resolution',
        });
        userFeedFooter.run();
    }



}(jQuery));