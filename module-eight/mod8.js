$(function(){
	$('.bady').empty();
	$('body').append('<div class="mse-h"><span id="Date" class="span-date"></span></div>');
	$('body').append('<header class="mse-header"><span id="span-header"><div class="left-header"><span class="mod8">Module 8</spa><input class="input-c" type="text" id="search_input" value="" autocomplete="on" placeholder="Search Movies, actors, critics"/></div><div class="right-header"><a id="box-o" class="btn btn-primary" href="#">Box Office </a> <a id="in-t" class="btn btn-primary" href="#">In Theaters </a> <a id="up" class="btn btn-primary" href="#">Upcoming</a></div> </span></header>');
	$('body').append('<ul class="bady"></ul>');
	var value = $('search_input').val();
	var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
	var dayNames= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	var newDate = new Date();
	newDate.setDate(newDate.getDate());
	$('#Date').html(dayNames[newDate.getDay()] + " " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear());
	$('#search_input').keypress	(function(E){
		if (E.which == 13){
	$ .ajax({
		url: 'http://api.rottentomatoes.com/api/public/v1.0/movies.json',
		dataType: 'jsonp',
		data: {
			q: $('#search_input').val(),
			apiKey: '9qdx6nfsqq5wj4zjbm4tdgmv'
		},
		success: showMovies
			});
		$('#search_input').val('');
		}
	});	
 
 function getTemplate(template_name, data) {
        var markup = "";
        var template = $('#' + template_name).html();
        var $template = Handlebars.compile(template);
        markup = $template(data);
        return markup;
    }

     function showMovies(response) {
      console.log('response', response);
      var movies = response.movies;
      var input = $('#search_input').val();
      $('.result').html('');
      $('.result').height('absolute');
        for (var i = 0; i < movies.length; i++) {
            var movie = movies[i];
               $('.result').append(getTemplate('tpl-movie', movie));
        }  
    }
		$('.blocks').click(function(){
			var info = $(this).children();
			var info2 = $(info[3]).children();
			$('.bady').empty().append(
				'<div class="block" style="margin-top:30px;">' +
				'<img src="' + info[2].src + '" style="width:180px; length:180px;"><br>' +
				info[0].textContent + '<br>' +
				info2[0].textContent + '<br>' +
				info2[1].textContent + '<br>' +
				info2[3].textContent +
				info2[4].textContent + '<br>' +
				info2[6].textContent +
				info2[7].textContent + '<br>' +
				info2[9].textContent +
				info2[10].textContent + '<br>' +
				info2[12].textContent +
				info2[13].textContent + '<br>' +
				'</div>'
			);
		});
	
	$('a#box-o').click(function(){
		$.ajax({
			url: 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json',
			dataType: 'jsonp',
			data: {
				apiKey: '9qdx6nfsqq5wj4zjbm4tdgmv'
			},
			success: showMovies
		});
	});
	
	$('a#in-t').click(function(){
		$.ajax({
			url: 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json',
			dataType: 'jsonp',
			data: {
				apiKey: '9qdx6nfsqq5wj4zjbm4tdgmv'
			},
			success: showMovies
		});
	});
	
	$('a#up').click(function(){
		$.ajax({
			url: 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/upcoming.json',
			dataType: 'jsonp',
			data: {
				apiKey: '9qdx6nfsqq5wj4zjbm4tdgmv'
			},
			success: showMovies
		})
		});
});

