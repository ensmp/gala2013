/*
Bibliothèque JavaScript/jQuery permettant de gérer les interactions/animations/et tout le reste concernant les menus - ie le mec et la fille - sur le site du Gala même si ma description est pourrie
*/

$(function(){
	
	////////////////////////////////////////////////////////////////////////////
	//////////////// CHARGEMENT DES ITEMS //////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////
	
	//Chargement des images du mec et de la meuf par ajout au noeud principal (TODO : là on pourrait afficher des pseudo barres de progressions (il y'a quelques centaines de Mo à télécharger)
	for(i=1; i<=6; i++){
  $('<img id="imec'+i+'" alt="'+i+'" src="./animations/mec/'+i+'.png"/>').hide().appendTo($('#mec'));
  }
  
  for(i=1; i<=23; i++){
  $('<img id="imeuf'+i+'" alt="'+i+'" src="./animations/meuf/'+i+'.png"/>').hide().appendTo($('#meuf'));
  }
    
    	
	//Préquery de toutes les images dans un Array (ça évite de querier à chaque changement de source lors de l'animation parce qu'avec un chargement toutes les 50ms lors des animations mieux vaut s'épargner une query bien longue)
  tImagesMec = new Array();
  for(i=0; i<=6; i++){
   tImagesMec[i] = $('#imec'+i);
  }
  
  tImagesMeuf = new Array();
  for(i=0; i<=23; i++){
   tImagesMeuf[i] = $('#imeuf'+i);
  }
  
  //TODO : automatiser cette partie
  wImageMec = 286;
	hImageMec = 600;
	
	wImageMeuf = 385;
	hImageMeuf = 600;
	
	////////////////////////////////////////////////////////////////////////////
	//////////////// CREATION DES ETATS ET DES OVERLAYS ////////////////////////
	////////////////////////////////////////////////////////////////////////////
	
	////////////// MEC ///////////////
	
	//Objets de base
	
	//Création et ajout des états
  manMec = new ManagerMec(new Array());
    	
  costardFerme = 
 	new Etat("costard_fermé", 1, new Array(
 	
 		new OverlayMec("main",0.2483,0.23,0.3,0.3,true,"costard_ouvert", function(){$(this).dequeue();}, "mec"),
 			
 		new OverlayMec("iPoche", 0.4056, 0.5417, 0.0699, 0.07,true,"iPod_sorti", function(){$('#ipod_mec').animate({'top':'-='+0.0533*hImageMec}, 'fast', 'swing');$(this).dequeue();}, "mec")
 		
 	), new Array("ipod_mec", "poche_pantalon"));
 		
 	costardOuvert =
   	new Etat("costard_ouvert", 6, new Array(
    	new OverlayMec("out_veste", 0.034, 0.192, 0.560, 0.391, false, "costard_fermé", function(){$(this).dequeue();},"mec"),
    	
    	new OverlayMec("in_portable", 0.18, 0.15, 0.15, 0.10, true, "portable_sorti", function(){
    		$('#portable_mec').animate({'top':'-='+0.0367*hImageMec}, 'fast', 'swing');
    		$(this).dequeue();
    	},"overlay_mec_out_veste")
    	), new Array("portable_mec", "poche_basse_mec"));
    	
    	
  portableSorti = new Etat("portable_sorti", 6, new Array(
  
  	new OverlayMec("out_portable", 0.18, 0.30, 0.20, 0.14, false, "costard_ouvert", function(){$('#portable_mec').animate({'top':'+='+0.0367*hImageMec}, 'fast', 'swing');$(this).dequeue();},"mec")
  	
  ), new Array("portable_mec", "poche_basse_mec"));
  
  iPodSorti = new Etat("iPod_sorti", 1, new Array(
  
  	new OverlayMec("out_iPod", 0.39, 0.50, 0.09, 0.12, false, "costard_fermé", function(){$('#ipod_mec').animate({'top':'+='+0.0533*hImageMec}, 'fast', 'swing');$(this).dequeue();}, "mec")
  	
  ), new Array("ipod_mec", "poche_pantalon"));
  
  manMec.add(costardFerme);
  manMec.add(costardOuvert);
  manMec.add(portableSorti);
 	manMec.add(iPodSorti);
 	
 	//Positionnement (x, y, et z-index) des divers éléments interactifs
 	$('#portable_mec').css({'left':0.2517*wImageMec, 'top':0.3583*hImageMec, 'z-index':2, 'display':'none'});
 	$('#poche_basse_mec').css({'left':0.2028*wImageMec, 'top':0.376*hImageMec, 'z-index':3, 'display':'none'});
 	
 	$('#ipod_mec').css({'left':0.4161*wImageMec, 'top':0.5533*hImageMec, 'z-index':2, 'display':'block'});
 	$('#poche_pantalon').css({'left':0.4056*wImageMec, 'top':0.542*hImageMec, 'z-index':3, 'display':'block'});
 	
 	//Lien du téléphone portable et du iPod
 	$('<div id="lien_portable"></div>').appendTo($('#overlay_mec_out_portable')).css({'display':'block', 'position':'absolute','width':0.0699*wImageMec,'height':0.065*hImageMec,'top':0.0454*wImageMec, 'left':0.035*hImageMec}).click(function(){showContent('portable.php');});
 	
 	$('<div id="lien_ipod"></div>').appendTo($('#overlay_mec_out_iPod')).css({'display':'block', 'position':'absolute','width':0.0525*wImageMec,'height':0.052*hImageMec,'left':0.027*wImageMec, 'top':0.00*hImageMec}).click(function(){if(isIpodShown()){hideIpod();}else{showIpod();} return false;});
 	
 	
 	//Et c'est parti
 	//Set de l'état courant
 	manMec.jumpTo("costard_fermé");
 	
 	///////////// MEUF /////////////
 	manMeuf = new ManagerMeuf(new Array());
	
	//Etats
	sage = new Etat("sage", 1, new Array(
		new OverlayMeuf("main",0.5792,0.5067,0.0909,0.1033,true,"cocotte_sortie", function(){$(this).dequeue();}, "meuf"),
		
		new OverlayMeuf("sac_init",0.2701,0.4633,0.1091,0.14,true,"sac_devant", function(){$(this).dequeue();}, "meuf")
		
	), new Array());
	
	cocotteSortie = new Etat("cocotte_sortie", 12, new Array(
		new OverlayMeuf("out_zone_cocotte",0,0,1,1,false,"sage", function(){$(this).dequeue();}, "meuf"),
		
		new OverlayMeuf("in_sac",0.0494,0.4133,0.2442,0.1267,true,"sac_devant", function(){$(this).dequeue();}, "overlay_meuf_out_zone_cocotte")
	
	), new Array());
	
	sacDevant = new Etat("sac_devant", 17, new Array(
		new OverlayMeuf("out_sac_devant",0.0004,0.1467,0.5,0.4533,false,"cocotte_sortie", function(){$(this).dequeue();}, "meuf"),
		
		new OverlayMeuf("in_ouverture_sac",0.05,0.07,0.3091,0.135,true,"sac_ouvert", function(){$(this).dequeue();}, "overlay_meuf_out_sac_devant")
	), new Array('lien_preventes_sac_devant'));
	
	sacOuvert = new Etat("sac_ouvert", 23, new Array(
		new OverlayMeuf("out_sac_sorti",0.08,0.18,0.3,0.22,false,"sac_devant", function(){$(this).dequeue();}, "meuf")
	), new Array("devant_sac", 'lien_preventes_sac_devant'));
	

	//Enregistrement des états dans le manager
	manMeuf.add(sage);
	manMeuf.add(cocotteSortie);
	manMeuf.add(sacDevant);
	manMeuf.add(sacOuvert);
	
	//Positionnement des divers éléments interactifs
	//$('#ipod_mec').css({'left':0.4161*wImageMec, 'top':0.5533*hImageMec, 'z-index':2, 'display':'block'});
 	$('#devant_sac').css({'left':0.0987*wImageMeuf, 'top':0.27*hImageMeuf, 'z-index':3, 'display':'none'});
	
	//Lien de la cocotte, de la caméra et du portefeuille
	$('<div  id="lien_preventes"></div>').appendTo($('#overlay_meuf_out_zone_cocotte')).css({'display':'block', 'position':'absolute','width':0.13*wImageMeuf,'height':0.065*hImageMeuf,'top':0.39*wImageMeuf, 'left':0.55*hImageMeuf}).click(function(){showContent('preventes.php');});
	
	$('#lien_preventes_sac_devant').css({'display':'none', 'position':'absolute','left':0.8078*wImageMeuf,'top':0.2583*hImageMeuf,'width':0.1403*wImageMeuf, 'height':0.0717*hImageMeuf}).click(function(){showContent('preventes.php');});
	
	//Let's go
	manMeuf.jumpTo("sage");
	
	////////////////////////////////////////////////////////////////////////////
	/////////////////////////// LA BIBLIOTHEQUE ////////////////////////////////
	////////////////////////////////////////////////////////////////////////////
	
	/////////////////////////// MEC ////////////////////////////////////////////
	
	//Objet décrivant un Overlay
  function OverlayMec(nom, x, y, w, h, mouseover, jte, endFunction, parent){
  	
  	this.target = 'mec';
  	this.nom = nom;
  	this.x = x*wImageMec;
  	this.y = y*hImageMec;
  	this.w = w*wImageMec;
  	this.h = h*hImageMec;
  	this.mouseover = mouseover;
  	this.jte = jte;
  	this.manager = manMec;
  	this.endFunction = endFunction;
  	this.parent = parent;
  	
  	$('<div id="overlay_'+this.target+'_'+this.nom+'" class="overlay"></div>').prependTo($('#'+this.parent)).width(this.w+'px').height(this.h+'px').css({'left':this.x+'px', 'top':this.y+'px'});  	
  	
  	this.enable = function(){
  		
  		if(this.mouseover)
				$("#overlay_"+this.target+'_'+this.nom).mouseenter(function(){manMec.jumpTo(jte).queue('fx', endFunction);});
			else
				$("#overlay_"+this.target+'_'+this.nom).mouseleave(function(){manMec.jumpTo(jte).queue('fx', endFunction);});
				
				$("#overlay_"+this.target+'_'+this.nom).css('z-index', 100);
  	}
  	
  	this.disable = function(){
  		$("#overlay_"+this.target+'_'+this.nom).unbind();
  		$("#overlay_"+this.target+'_'+this.nom).css('z-index', -1);
  	}
  	
  }
  
  function Etat(nnom, nimg, noverlays, ninteractions){
  	
  	this.nom = nnom;
  	this.img = nimg;
  	this.overlays = noverlays;
  	this.interactions = ninteractions;
  	
  	this.disableOverlays = function(){
  		for(var i=0; i<this.overlays.length; i++)
  			this.overlays[i].disable();
  		
  		for(var i=0; i<this.interactions.length; i++)
  			$('#'+this.interactions[i]).hide();
  	}
  	
  	this.enableOverlays = function(){
  		for(var i=0; i<this.overlays.length; i++)
  			this.overlays[i].enable();
  			
  		for(var i=0; i<this.interactions.length; i++)
  			$('#'+this.interactions[i]).show();
  	}
  	
  	this.getOverlay = function(nom){
  		for(var i=0; i<this.overlays.length; i++){
  			if(this.overlays[i].nom == nom)
  				return this.overlays[i];
  		}
  		return undefined;
  	}
  	
  }
  
  function ManagerMec(etats){
  	this.mEtats = etats;
  	
  	this.etatCourant = new Etat("default", 0, new Array(), new Array());
  	
  	this.currentImgNb = function(){
  		for(var i=1; i<tImagesMec.length; i++){
  			if(tImagesMec[0].attr("src") == tImagesMec[i].attr("src")){
  				return i;
  				}
  		}
  		return -1;
  	}
  	
  	this.jumpTo = function(nom_etat){
  	
  		//Recherche de l'état à afficher
  		var c = -1;
  		for(var i=0; i < this.mEtats.length; i++){
  			if(this.mEtats[i].nom == nom_etat)
  				c = i;
  		}
  		
  		if(c!=-1){
  			//Suppression des overlays relatifs à cet état
  			this.etatCourant.disableOverlays();
  			
  			//Création du parcours d'animation (TODO : utiliser des arbres pour calculer ledit chemin)
  			
  			//$('#bugs').text(this.currentImgNb() + ' bite ' + this.mEtats[c].img);
  			
  			return this.recAnim(
  			this.currentImgNb(), this.mEtats[c].img, this.mEtats[c].img).queue('fx', function(){manMec.mEtats[c].enableOverlays();manMec.etatCourant = manMec.mEtats[c];$(this).dequeue();});
  		}
  		
  	}
  	
  	this.recAnim = function(d,f,i){
		  	if(i==d)
		  		return tImagesMec[0];
		  	else
		  		return this.recAnim(d,f,i - (f-d)/Math.abs(f-d) ).queue('fx',function(){$(this).attr('src', tImagesMec[i].attr('src'));$(this).dequeue();}).delay(66, 'fx');
		  }
		  
  	this.add = function(etat){
  		this.mEtats.push(etat);
  	}
  	
  }
	
  
  
  /////////////////////////// MEUF ////////////////////////////////////////////
	
	//Objet décrivant un Overlay
  function OverlayMeuf(nom, x, y, w, h, mouseover, jte, endFunction, parent){
  	
  	this.target = 'meuf';
  	this.nom = nom;
  	this.x = x*wImageMeuf;
  	this.y = y*hImageMeuf;
  	this.w = w*wImageMeuf;
  	this.h = h*hImageMeuf;
  	this.mouseover = mouseover;
  	this.jte = jte;
  	this.manager = manMeuf;
  	this.endFunction = endFunction;
  	this.parent = parent;
  	
  	$('<div id="overlay_'+this.target+'_'+this.nom+'" class="overlay"></div>').prependTo($('#'+this.parent)).width(this.w+'px').height(this.h+'px').css({'left':this.x+'px', 'top':this.y+'px'});  	
  	
  	this.enable = function(){
  		
  		if(this.mouseover)
				$("#overlay_"+this.target+'_'+this.nom).mouseenter(function(){manMeuf.jumpTo(jte).queue('fx', endFunction);});
			else
				$("#overlay_"+this.target+'_'+this.nom).mouseleave(function(){manMeuf.jumpTo(jte).queue('fx', endFunction);});
				
				$("#overlay_"+this.target+'_'+this.nom).css('z-index', 100);
  	}
  	
  	this.disable = function(){
  		$("#overlay_"+this.target+'_'+this.nom).unbind();
  		$("#overlay_"+this.target+'_'+this.nom).css('z-index', -1);
  	}
  	
  }
  
  function ManagerMeuf(etats){
  	this.mEtats = etats;
  	
  	this.etatCourant = new Etat("default", 0, new Array(), new Array());
  	
  	this.currentImgNb = function(){
  		for(var i=1; i<tImagesMeuf.length; i++){
  			if(tImagesMeuf[0].attr("src") == tImagesMeuf[i].attr("src")){
  				return i;
  				}
  		}
  		return -1;
  	}
  	
  	this.jumpTo = function(nom_etat){
  	
  		//Recherche de l'état à afficher
  		var c = -1;
  		for(var i=0; i < this.mEtats.length; i++){
  			if(this.mEtats[i].nom == nom_etat)
  				c = i;
  		}
  		
  		if(c!=-1){
  			//Suppression des overlays relatifs à cet état
  			this.etatCourant.disableOverlays();
  			
  			//Création du parcours d'animation (TODO : utiliser des arbres pour calculer ledit chemin)
  			
  			return this.recAnim(
  			this.currentImgNb(), this.mEtats[c].img, this.mEtats[c].img).queue('fx', function(){manMeuf.mEtats[c].enableOverlays();manMeuf.etatCourant = manMeuf.mEtats[c];$(this).dequeue();});
  		}
  		
  	}
  	
  	this.recAnim = function(d,f,i){
		  	if(i==d)
		  		return tImagesMeuf[0];
		  	else
		  		return this.recAnim(d,f,i - (f-d)/Math.abs(f-d) ).queue('fx',function(){$(this).attr('src', tImagesMeuf[i].attr('src'));$(this).dequeue();}).delay(50, 'fx');
		  }
		  
  	this.add = function(etat){
  		this.mEtats.push(etat);
  	}
  	
  }
  
  
  
 }); //Fin du bloc jQuery
 
 
  
