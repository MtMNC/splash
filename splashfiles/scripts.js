$(document).ready(function(){

	$("#blue-container").css({"background-position": "0 140px"});
	$("#red-container").css({"background-position": "0 250px"});
	$("#white-container").css({"background-position": "0 360px"});
			
	$.ajax({
		type: "GET",
		url: "http://meta.brickimedia.org/api.php?action=query&meta=siteinfo&siprop=statistics&format=xml",
		dataType: "xml",
		success: function(xml) {
			$(xml).find("statistics").each(function(){
				accounts = $(this).attr("users");
				if (accounts >= 1000) {
					accounts = ((accounts/1000).toFixed(1).replace(/\.?0+$/, "")) + "k";
				}
			}); //meta parse
			$("#circle-accounts .circle-number").append(accounts);
			$.ajax({
				type: "GET",
				url: "http://en.brickimedia.org/api.php?action=query&meta=siteinfo&siprop=statistics&format=xml",
				dataType: "xml",
				success: function(xml) {
					$(xml).find("statistics").each(function(){
						articles = parseInt($(this).attr("articles"), 10);
					}); //en parse
					$.ajax({
						type: "GET",
						url: "http://customs.brickimedia.org/api.php?action=query&meta=siteinfo&siprop=statistics&format=xml",
						dataType: "xml",
						success: function(xml) {
							$(xml).find("statistics").each(function(){
								articles += parseInt($(this).attr("articles"), 10);
							}); //customs parse
							$.ajax({
								type: "GET",
								url: "http://stories.brickimedia.org/api.php?action=query&meta=siteinfo&siprop=statistics&format=xml",
								dataType: "xml",
								success: function(xml) {
									$(xml).find("statistics").each(function(){
										articles += parseInt($(this).attr("articles"), 10);
									}); //stories parse
									$.ajax({
										type: "GET",
										url: "http://cuusoo.brickimedia.org/api.php?action=query&meta=siteinfo&siprop=statistics&format=xml",
										dataType: "xml",
										success: function(xml) {
											$(xml).find("statistics").each(function(){
												articles += parseInt($(this).attr("articles"), 10);
											}); //cuusoo parse
											if (articles >= 1000) {
												articles = ((articles/1000).toFixed(1).replace(/\.?0+$/, "")) + "k";
											}
											$("#circle-articles .circle-number").append(articles);
											$("#circles").css({"display": "block"});
										} //cuusoo success
									}); //cuusoo ajax
								} //stories success
							}); //stories ajax
						} //customs success
					}); //customs ajax		
				} //en success
			}); //en ajax
		} //meta success
	}); //meta ajax
	
	$(window).scroll(function() {
		var hero = $(this).scrollTop();
		var diffToBottom = $(document).height() - ($(this).scrollTop() + $(this).height());
		if ($(window).width() > 780) {
			$("#hero").css({"background-position": "0 " + parseInt(-hero / 5) + "px"});
			$("#blue-container").css({"background-position": "0 " + (140 + parseInt(-hero / 5)) + "px"});
			$("#red-container").css({"background-position": "0 " + (250 + parseInt(-hero / 5)) + "px"});
			$("#white-container").css({"background-position": "0 " + (360 + parseInt(-hero / 5)) + "px"});
			if (diffToBottom <= 150 && diffToBottom > 7) {
				$("#wiki-nav-bottom").css({"margin-top":  35 + diffToBottom/4.5 + "px"});
  			}
			if (diffToBottom <= 100) {
				$("#wiki-nav-bottom").css({"opacity":  (100 - diffToBottom) / 100});
			}
		} else {
			$("#hero").css({"background-position": "0 0"});
			$("#blue-container").css({"background-position": "0 0"});
			$("#red-container").css({"background-position": "0 0"});
			$("#white-container").css({"background-position": "0 0"});
			$("#wiki-nav-bottom").css({"margin-top":  "35px", "opacity": 1});
		}
	});
});
