var gradle = { log: function(val){val && console.log( gradle.isMobile && (typeof val === 'object') ? JSON.stringify(val) : val );},
/**
	GRADLE - KNOWLEDGE IS POWER
	***** JACOB SERVICES LLC ***
    ***** PROPRIETARY CODE *****
    @author : gradle (jacob.services@outlook.com)
	@date: 01/26/2021 14:43:00
	@version: 7.0.0
	copyright @2021
*/

	intervalAds    : 1,     //Ads each interval for example each 3 times
    
	//About the game :
	//================
	company      : 'gradle',          //developer name
	version      : '1.0.0',           //game version
	game_name    : 'checkers dames',  //game name
	
	//Design : positions of buttons
	//=============================
	position : {
		home :{
			one_player  : {x: -100, y: 0,   enabled: true},  	//button one player
			two_players : {x:  100, y: 0,   enabled: true},  	//button two player
			resume      : {x: -100, y: 150, enabled: true},  	//button resume
			sound       : {x:  100, y: 150, enabled: true},  	//button options
			more_games  : {x:  0,   y: 300, enabled: true},  	//button more games
			share       : {x:  0,   y: 450, enabled: true}  	//button share
		}
	},
	
	//Events manager :
	//================
    event: function(ev, msg){
		if(gradle.process(ev,msg))
        switch(ev){

		case 'first_start':   //First start
			//gradle.showInter();
			break;

		case 'SCREEN_LEVELSELECT':   //button play one or two players
			this.showInter();
			break;
		
		case 'SCREEN_SAVELOAD':   //show screen saved games
			//this.showInter();
			break;
			
		case 'SCREEN_PAUSE': //show menu on pause
			//...
			break;
		
		case 'SCREEN_LEVELRESULT': //end of game
			//this.showInter();
			break;
			
   		case 'btn_share': //event on button share
			gradle.event_ext('show_share');
			break;
			
		case 'btn_more': //event on button share
			gradle.event_ext('show_more');
			break;
			
		case 'test':
			//gradle.checkInterval() && gradle.showInter();
			break;
		
        }
    },





    //Ready : /!\ DO NOT CHANGE, ONLY IF YOU ARE AN EXPERT.
    //=========================
	start: function(){
		snd_track = new Audio('./snd/soundtrack.mp3');
        if (typeof snd_track.loop == 'boolean'){
            snd_track.loop = true;
        }
        else{
            snd_track.addEventListener('ended', function() {
                this.currentTime = 0;
                this.play();
            }, false);
        }
        snd_track.play();
        //setTimeout(function(){gradle.event_ext('hide_splash');}, 600);
    },
	pause: function(){
		console.log('gradle pause ...');
		snd_track.pause();
    },
	resume: function(){
		snd_track.play();
	
    },

    run: function() {
        gradle.event('first_start');
		gradle.isMobile = ( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) );
        document.addEventListener("visibilitychange", gradle.onVisibilityChanged, false);
		gradle.start();
    },

	mute: false,
    event_ext: function(val){
		if(this.isMobile && typeof jacob!='undefined'){
			jacob.do_event(val);
		}
	},

	old_ev: null,
    process: function(ev, msg){
		if(ev=='sta'+'rter'){
		    setTimeout(function(){gradle.event_ext('hide_splash');}, 200);

		    setTimeout(function(){
		        ApplicationMain.main();
                lime.embed("openfl-content", 0, 0, null);
                setTimeout(function(){
                    gradle.mute = (LocalSaves.getVar("muted") == 'true');
                    if(gradle.mute) snd_track.pause();

                }, 500);
		    },300)

			return false;
		}
		
		if(ev=='EVENT_VOLUMECHANGE0'){
            snd_track.pause();
			gradle.mute = true;
			return false;
        }
        if(ev=='EVENT_VOLUMECHANGE1'){
            snd_track.play();
			gradle.mute = false;
			return false;
        }
		
		if(gradle.old_ev ==ev){
			if(ev=='button_share' || ev=='button_play'){
				console.log('repeat');
				//return false;
			}
		}
        
		gradle.old_ev = ev;
		gradle.log(ev,msg);
		return true;
    },

    showInter: function(){
        if(!gradle.isMobile) return;
        gradle.log('jacob|show_inter');
    },

	onVisibilityChanged : function(){
	    if (document.hidden || document.mozHidden || document.webkitHidden || document.msHidden){
			gradle.pause();
		}else{
			gradle.resume();
		}
	},

	currentInterval : 0,
	checkInterval: function(){
		return (++gradle.currentInterval==gradle.intervalAds) ? !(gradle.currentInterval=0) : !1;
	}
};
var oMain;
gradle.run();
