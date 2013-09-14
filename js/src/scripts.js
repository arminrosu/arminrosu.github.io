$(function () {
	'use strict';

	var count = 0,
	services = [
		{
			"service": "disqus",
			"user": "29553789",
			"key": "munOyX0heZAP70y8iPa4FZDyInDlLVAbeh1ioritgOHKQPZHLXKaDEUFG8Fe5inX"
		},
		{
			"service": "fancy",
			"user": "arminrosu"
		},
		{
			"service": "github",
			"user": "arminrosu"
		},
		{
			"service": "googleplus",
			"user": "115822427604092267963",
			"key": "AIzaSyDLzBxFbGo5e-WbFlMN5MlpdNsm0j2d6nc"
		},
		{
			"service": "linkedin",
			"user": "97711736",
			"url": "http://www.linkedin.com/rss/nus?key=SgoqsPsPxlTbHl4cb2ooRUtpi3wK1LNu6dfWHjNAoWWmqMIBNN7urxIBgSoTtIUgBj"
		},
		{
			"service": "quora",
			"user": "Armin-Rosu"
		},
		{
			"service": "stackoverflow",
			"user": "584441"
		},
		{
			"service": "twitter",
			"user": "arminrosu"
		},

		{
			"service": "vimeo",
			"user": "arminsan"
		},
		{
			"service": "wikipedia",
			"user": "Alexandru.rosu"
		}
	];

	$("#lifestream").lifestream({
		"limit": 20,
		"list": services,
		"feedloaded": function(){
			count++;
			// Check if all the feeds have been loaded
			if( count === services.length ){
				$("#lifestream li").each(function(){
					var element = $(this),
						date = new Date(element.data("time"));
					element.append(' <abbr class="timeago" title="' + date.toISOString() + '">' + date + "</abbr>");
				});

				$("#lifestream .timeago").timeago();
			}
		}
	});
});
