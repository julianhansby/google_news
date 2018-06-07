/*
 * @title App
 * @description Application entry point
 */


/*********************************************************************************
 1. DEPENDENCIES
 *********************************************************************************/

import $ from 'jquery';
import axios from 'axios';

// DATA SETTING AND API FETCHING
let getData = function(value,index){

	let topicKey = value;
	let apiURL = `https://newsapi.org/v2/top-headlines?sources=${topicKey}&apiKey=9e050bb833fe4690856581a1e3dfd272`;
	let articleData = [];
	$('.displayData').empty();
	$('.logo').empty();
	$('.displayData').fadeOut('fast');
	$('.loading-text').show();
	$('.footer').hide();

	// logo data
	let logoData = [
		{ logo: 'https://s.abcnews.com/assets/images/apple-touch-icons/touch-icon-ipad-retina.png' },
		{ logo: 'https://icon-locator.herokuapp.com/lettericons/B-120-3091b8.png' },
		{ logo: 'http://www.ew.com/img/favicons/favicon-120.png' },
		{ logo: `https://www.ft.com/__origami/service/image/v2/images/raw/ftlogo-v1%3Abrand-ft-logo-square-coloured?source=update-logos&width=180&height=180&format=png` },
		{ logo: 'http://oystatic.ignimgs.com/src/core/img/favicon/favicon-128.png' },
		{ logo: 'http://www.mtv.com/apple-touch-icon-precomposed.png' },
		{ logo: 'https://techcrunch.com/wp-content/uploads/2015/02/cropped-cropped-favicon-gradient.png?w=180' },
		{ logo: 'https://icon-locator.herokuapp.com/lettericons/U-120-009bff.png' },
		{ logo: 'https://www.wired.com/apple-touch-icon.png' }
	];

	axios.get(apiURL)
		.then(function (resp) {
			console.log('Here comes the data');
			console.log(resp.data.articles);
			articleData = resp.data.articles;
			let getTop20 = articleData.slice(0,20);
			let htmlData = '';
			let defaultIMGUrl = 'https://www.nato-pa.int/sites/default/files/default_images/default-image.jpg';
			
			// load logo into DOM
			$('.logo').append('<img src="'+logoData[index].logo+'" alt="logo" />');	

			for(let i = 0; i <= getTop20.length - 1; i++){
				if(getTop20[i].urlToImage == null){
					getTop20[i].urlToImage = '<img class="default-image" src="'+defaultIMGUrl+'" />';
				} else {
					getTop20[i].urlToImage = '<img src="'+getTop20[i].urlToImage+'" />';
				}
				if(getTop20[i].author == null){
					getTop20[i].author = getTop20[i].source.name;
				}
				if(getTop20[i].description == null){
					getTop20[i].description = getTop20[i].source.name;
				}

				getTop20[i].publishedAt = getTop20[i].publishedAt.substring(0,getTop20[i].publishedAt.indexOf('T'));				
				htmlData += '<div class="col-md-4">'+
								'<div class="overlay-text">'+
									'<h4>'+getTop20[i].title+'</h4>'+
									'<p>'+getTop20[i].description+'</p>'+
									'<a target="_blank" href="'+getTop20[i].url+'">Read More</a>'+
								'</div>'+
								''+getTop20[i].urlToImage+''+
								'<p class="top-text">'+getTop20[i].author+' <span>|</span> '+getTop20[i].publishedAt.split("-").reverse().join("/")+'</p>'+
								'<p>'+getTop20[i].title+'</p>'+
							'</div>';
			}
			setTimeout(function(){
				$('.loading-text').hide();
				$('.footer').show();
			}, 900);
			$('.l-footer').show();
			$('.displayData').prepend(htmlData);
			$('.displayData').fadeIn('fast');
		}).catch(function (error) {
			console.log(error);
	});
}

// EVENTS
$('.selectModel').on('change', function () {
	let getOptionVal = $(this).find(':selected').val();
	let getIndex = $(this).find(':selected').index();
	getData(getOptionVal,getIndex);
});

$('body,html').on('mouseenter','.col-md-4', function(){
	$(this).find('.overlay-text').fadeIn();
});
$('body,html').on('mouseleave','.col-md-4', function(){
	$(this).find('.overlay-text').fadeOut();
});

// init when page loads
$(function(){ getData('abc-news',0) });