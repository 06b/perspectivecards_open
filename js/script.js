$(document).ready(function($){

	buildCard(0);

	// $('.card .button').on('click', function(e){
	// 	var thisCard = $(this).closest('.card');
	// 	var nextCard = thisCard.next();

	// 	if(!nextCard.hasClass('card')){
	// 		nextCard = $('.cards .card:eq(1)');	
	// 	}

	// 	var description = descriptions[Math.floor(Math.random()*descriptions.length)];
	// 	nextCard.find('.card-description').html(description);

	// 	var winWidth = $(window).width();
	// 	var tooltipElement = nextCard.find('.tooltiptext');
		
	// 	if(winWidth < 768){
	// 		var tooltipHeight = tooltipElement.height();
	// 		if(tooltipHeight > 20){
	// 			var bottomPosition = -1 * (tooltipHeight - 20);
	// 			tooltipElement.css({'bottom': bottomPosition + "px"});
	// 		}
	// 	}else{
	// 		tooltipElement.removeAttr('style');
	// 	}

	// 	thisCard.removeClass('active');
	// 	nextCard.addClass('active');
	// });

	$('.btn-about').click(function(e){
		e.preventDefault();
		$('.modal-about').addClass('active');
		$('body').addClass('modal-opened');
	});

	$('.close-modal').click(function(e){
		e.preventDefault();
		$('.modal-about').removeClass('active');
		$('body').removeClass('modal-opened');
	});

	$('.dropdown-menu a').click(function(e){
		e.preventDefault();
		var dd = $(this).closest('.dropdown-menu');
		var btn = dd.prev();
		var spn = btn.find('span.btn-text');
		spn.html($(this).html());

		$('.card').not('.intro').remove();
		if($('.card.intro').hasClass('active')){
			$('.card.intro').removeClass('active')
		}
		
		var categoryId = parseInt($(this).attr('data-val'));
		buildCard(categoryId);
		setTimeout(function(){
			$('.card:eq(1)').addClass('active');
		}, 100);
	})

	var twitUrl = $('.twitter-share-button').attr('href') + '?url=' + window.location.href;
	$('.twitter-share-button').attr('href', twitUrl);
	$('.twitter-share-button').click(function(e){
		e.preventDefault();
		popitup($(this).attr('href'));
	});

})

$(window).resize(function(){
	var winWidth = $(window).width();
	
	if(winWidth < 768){
		$('.tooltiptext').each(function(){
			var tooltipElement = $(this);
			var tooltipHeight = tooltipElement.height();
			if(tooltipHeight > 20){
				var bottomPosition = -1 * (tooltipHeight - 20);
				tooltipElement.css({'bottom': bottomPosition + "px"});
			}
		});
	}else{
		$('.tooltiptext').removeAttr('style');
	}
})

function buildCard(category){
	var cardsBlock = '';
	var filteredCards = (category == 0) ? cards : filter(cards, category);
	var shuffledCards = shuffle(filteredCards);
	var cardCount = shuffledCards.length;

	for(i=0; i<cardCount; i++){
		var selectedIntro = intro[Math.floor(Math.random()*intro.length)];
		var selectedPerson = person[Math.floor(Math.random()*person.length)];
		var card = shuffledCards[i];
		var cardTitle = selectedIntro + " " + selectedPerson + " " + card.fill + " " +  card.perspective;
		var cardTooltip = card.tooltip;
		var buttonText = (i == cardCount -1)? 'Replay':'SHOW ME ANOTHER';

		if(card.link != ''){
			cardTooltip += ' <a href="'+ card.link +'" target="_blank">'+ card.linktext +'</a>';
		}
		
		var cardItem = '<div class="card">'+
			'<div class="card-inner">'+
				'<h2>'+
					'<span>'+ cardTitle +' </span>'+
					'<span class="card-tooltip">'+
						'<span class="tooltiptext">'+ cardTooltip +'</span>'+
					'</span>'+
				'</h2>'+
				'<p class="card-description"></p>'+
				'<div class="btn-wrapper">'+
					'<button type="button" class="button btn-pink" onclick="nextCard(this)">'+ buttonText +'</button>'+
				'</div>'+
			'</div>'+
		'</div>';

		cardsBlock += cardItem;
	}

	$('.card.intro').after(cardsBlock);
}

function nextCard(obj){
	var _obj = $(obj);
	var thisCard = _obj.closest('.card');
	var nextCard = thisCard.next();

	if(!nextCard.hasClass('card')){
		nextCard = $('.cards .card:eq(1)');	
	}

	var description = descriptions[Math.floor(Math.random()*descriptions.length)];
	nextCard.find('.card-description').html(description);

	var winWidth = $(window).width();
	var tooltipElement = nextCard.find('.tooltiptext');
	
	if(winWidth < 768){
		var tooltipHeight = tooltipElement.height();
		if(tooltipHeight > 20){
			var bottomPosition = -1 * (tooltipHeight - 20);
			tooltipElement.css({'bottom': bottomPosition + "px"});
		}
	}else{
		tooltipElement.removeAttr('style');
	}

	thisCard.removeClass('active');
	nextCard.addClass('active');
}

function popitup(url) {
	newwindow=window.open(url,'name','height=380,width=480');
	if (window.focus) {newwindow.focus()}
	return false;
}

function fbshareCurrentPage(){
	window.open("https://www.facebook.com/sharer/sharer.php?u="+escape(window.location.href)+"&t="+document.title, '', 
    'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=380,width=480');
    return false; 
}

function filter(data, filter){
	
	var arr_filter = [filter]
	var filteredArray = data.filter(function(itm){
		return arr_filter.indexOf(itm.cat) > -1;
	});

	return filteredArray;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}