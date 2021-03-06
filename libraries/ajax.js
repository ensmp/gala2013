//Fichier gérant le chargement asynchrone du contenu en fonction des clics de l'utilisateur et affichant une jolie frame avec le contenu demandé

//Variable désignant le nom du contenu actuellement à l'écran
var content_name = '';

//Ajout des listeners qui vont bien au fichier HTML
$("#croix_contenu").click(function(){hideContent(); return false;});
$(window).click(function(e){
	if( e.which == 1 ){
		hideAll();
	} 
});
$("#fond_splayer").click(function(){return false;});
$("#content").click(function(){hideIpod(); return false; });

//Les liens des icônes
$('#lien_facebook').click(function(){ window.open("http://www.facebook.com/events/111682155685603/"); return false; });

//La sortie fatale
$('body').mouseleave(function(){manMec.jumpTo("costard_fermé");manMeuf.jumpTo("sage");});
$('#imeuf').mouseleave(function(){manMeuf.jumpTo("sage");});
$('#imec').mouseleave(function(){manMec.jumpTo("costard_fermé");});

//La barre d'espace pour play/pauser le iPod
$('*').keypress(function(event){ 
	if(event.which == 32){
		if(!isIpodShown() && !pIsPlaying())
			showIpod();
		pPlaypause();
		return false;
	}
});

//On affiche les explications sur la page d'accueil
showContent('explications.php');

function showContent(page){
	hideIpod();
	
	if(isThatContentShown(page)){
		hideContent();
	}else{
	
		//Mise à jour de la variable content_name
			content_name = page;
			
		//Chargement du contenu via XHR
			//Affichage du "sablier" et (éventuel) désaffichage du bloc de contenu déjà présent
			hideContent();
		
			//Lancement de la requete
		
			$('#content').queue(function (){
				
				$('#html_content').load('./contenus/' + page, function(){
					$("#content").queue(function(){
			
					//Remplissage du bloc... done ! 
					
					/* OBSOLETE
					 //Set de la width (cachée)
					$('#content').css({'visibility':'hidden', 'height':'auto', 'overflow':'scroll'}); 
					//Calcul automatique de la hauteur par le navigateur
					dynaCSS();
					var calculatedHeight = $('#content').height();
					
					//$('#content').css({'overflow':'hidden', 'visibility':'visible', 'height':0, 'width':0, 'left':$('body').width()/2}); //On rechache le truc
					
					*/
			
		
					/* //Vielle animation
				$('#content').animate({'height':calculatedHeight, 'width':calculatedWidth, 'padding':10}, {duration:'slow', easing:'linear', 
				step: function(now, fx){
						$('#content').css({'left': ($('body').width()-$('#content').width())/2});
					}
				}).animate({'height':calculatedHeight}, 'slow', 'linear').queue(function(){$(this).css('overflow','visible');$(this).dequeue();}); */
				
				dynaCSS();
				$('#content').css({'height':'auto', 'width':contenWidth(), 'display':'block', 'visibility':'visible', 'overflow':'visible', 'opacity':0, 'top':$(window).height() - 100});
				
				//TODO : Désaffichage du sablier
				
				//Activation des liens du bloc de contenu
				$("a").click(function(){ window.open($(this).attr('href')); return false; });
				
				$(this).dequeue();
			
			}).animate({'top': 210, 'opacity':1}, 1000, 'swing');
					}); //Fin du callback de load
				
				//TODO : Affichage du sablier
				
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
	if(isIpodShown())
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
	$('#lien_teiffel').css({'width':0.12*$(window).width(),'height':0.15*$(window).height(),'left':0.4431*$(window).width(), 'top':0.5678*$(window).height()});
	
	//Les blocs de contenu	
	var cv = contenWidth();
	$('#content').css({'width':cv, 'left':($('body').width()-cv)/2});
	
}

//1er appel lors de la création de la fenêtre
dynaCSS();

//Appel à chaque redimensionnement de la fenêtre
$(window).resize(dynaCSS);


