//Fichier gérant le chargement asynchrone du contenu en fonction des clics de l'utilisateur et affichant une jolie frame avec le contenu demandé

//Variable désignant le nom du contenu actuellement à l'écran
var content_name = '';

//Variable activée lorsqu'on est en train d'afficher un contenu
var content_going_out = false;

//Ajout des listeners qui vont bien au fichier HTML
$("#croix_contenu").click(function(){hideContent();});
$(window).click(function(){hideAll();});
$("#fond_splayer").click(function(){return false;});
$("#content").click(function(){hideIpod(); return false;});

function showContent(page){

	if(isThatContentShown(page)){
		hideContent();
		return;
	}else{

		//Chargement du contenu via XHR
			//Affichage du "sablier" et (éventuel) désaffichage du bloc de contenu déjà présent
			hideContent();
		
		
			//Lancement de la requete
		
			$('#content').queue(function (){
				
				$('#html_content').load('./contenus/' + page, function(){
					$("#content").queue(function(){
			
					//Remplissage du bloc
				
					dynaCSS(); //Set de la width (cachée)
					var calculatedHeight = $('#content').css({'visibility':'hidden', 'height':'auto', 'overflow':'visible'}).height(); //Calcul automatique de la hauteur par le navigateur
		
					$('#content').css({'overflow':'hidden', 'visibility':'visible', 'height':0, 'width':0, 'left':$('body').width()/2}); //On rechache le truc
			
		
					/* //Vielle animation
				$('#content').animate({'height':calculatedHeight, 'width':calculatedWidth, 'padding':10}, {duration:'slow', easing:'linear', 
				step: function(now, fx){
						$('#content').css({'left': ($('body').width()-$('#content').width())/2});
					}
				}).animate({'height':calculatedHeight}, 'slow', 'linear').queue(function(){$(this).css('overflow','visible');$(this).dequeue();}); */
	
				$('#content').css({'height':calculatedHeight, 'width':contenWidth(), 'display':'block', 'overflow':'visible', 'opacity':0, 'top':$(window).height() - 100});
				dynaCSS();
				
				//TODO : Désaffichage du sablier
				
				
				$(this).dequeue();
			
			}).animate({'top': 160, 'opacity':1}, 1000, 'swing');
					}); //Fin du callback de load
				
				//TODO : Affichage du sablier
				
				//Mise à jour de la variable content_name
				content_name = page;
				
				$(this).dequeue();
			});
				
	}
	return false;
}

function isContentShown(){
	return $('#content').css('display') == "block";
}

function isThatContentShown(page){
	return isContentShown() && page == content_name ;
}

function hideContent(){

	//Si le contenu est affiché et qu'il est pas en train de se barrer
	if(isContentShown()){
		
		
		//Vielle animation
		/*
		$('#content').css({'overflow':'hidden'}).animate({'height':60}, 'slow', 'linear').animate({'height':0, 'width':0, 'padding':0}, {duration:'slow', easing:'linear', 
	step: function(now, fx){
			$('#content').css({'left': ($('body').width()-$('#content').width())/2});
		}
	});
	*/
	$('#content').animate({'top': $(window).height() - 100, 'opacity':0},1000,'swing')
	.queue(function(){$(this).css({'display':'none'}); $(this).dequeue();} );
		
	}
}


function hideAll(){
	hideIpod();
	hideContent();
}

//Fonction relatives au Player
function isIpodShown(){
	return $('#fond_splayer').css('display') == 'block';
};

function showIpod(){	
	//Affichage tranquillou de l'iPod seulement si il n'est pas déjà affiché/en cours d'affichage
	if(!isIpodShown())
		$('#fond_splayer').css({'left':($('body').width()-236)/2, 'display':'block', 'bottom':0}).animate({'bottom':($(window).height() - 560)/2}, 1000, 'swing');
		$('#fond_splayer').animate({'opacity':1},{duration:700,easing:'swing',queue:false});
}

function hideIpod(){
	$('#fond_splayer').animate({'bottom':'0px','opacity':0}, 'slow', 'swing').queue(function(){$(this).css('display','none'); $(this).dequeue();});
};

//Positionnement des éléments via jQuery (voir ça comme du css "dynamique") --> Size independance des éléments positionnés de façon absolue
function contenWidth(){
	var cv = 450;
	if($('body').width() > 1200)
		cv = $('body').width() - 760;
	return cv;
}

function dynaCSS(){
	
	//Le fond
	$('body').css({'background-size':$(window).width() + 'px ' + $(window).height() +'px'});
	
	//Le lecteur
	$('#fond_splayer').css({'left':($('body').width()-236)/2});
	if(isIpodShown())
		$('#fond_splayer').css({'bottom':($(window).height() - 560)/2});
	
	//Le lien de la tour eiffel
	$('#lien_teiffel').css({'width':0.0225*$(window).width(),'height':0.0245*$(window).height(),'left':0.4931*$(window).width(), 'top':0.5978*$(window).height()});
	
	//Les blocs de contenu	
	var cv = contenWidth();
	$('#content').css({'width':cv, 'left':($('body').width()-cv)/2});
	
}

//1er appel lors de la création de la fenêtre
dynaCSS();

//Appel à chaque redimensionnement de la fenêtre
$(window).resize(dynaCSS);


