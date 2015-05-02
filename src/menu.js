
var MainMenu = cc.Layer.extend({
	ctor:function(){
		this._super();
		this.init();
	},
	init:function(){
		cc.spriteFrameCache.addSpriteFrames(res.h_plist);
		
		winSize = cc.director.getWinSize();
		var sp = new cc.Sprite(res.mabbu9Splash_png);
		sp.x = winSize.width/2;
		sp.y = winSize.height/2;
		this.addChild(sp, 0, 1);

		var singleHeight = 40;
		var singleWidth = 180;
		var newTapperGameNormal = new cc.Sprite(res.menu_png, cc.rect(0, 0, singleWidth, singleHeight));
		var newTapperGameSelected = new cc.Sprite(res.menu_png, cc.rect(0, singleHeight, singleWidth, singleHeight));
		var newTapperGameDisabled = new cc.Sprite(res.menu_png, cc.rect(0, singleHeight * 2, singleWidth, singleHeight));
		var newTapperGame = new cc.MenuItemSprite(newTapperGameNormal, newTapperGameSelected, newTapperGameDisabled, function () {
			this.onNewTapperGame();
		}.bind(this));
		var tapperLabel = cc.LabelTTF("TAPPER");
		tapperLabel.x = singleWidth/2;
		tapperLabel.y = singleHeight/2;
		newTapperGame.addChild(tapperLabel, 10, 1);
		
		var newSliderGameNormal = new cc.Sprite(res.menu_png, cc.rect(singleWidth, 0, singleWidth, singleHeight));
		var newSliderGameSelected = new cc.Sprite(res.menu_png, cc.rect(singleWidth, singleHeight, singleWidth, singleHeight));
		var newSliderGameDisabled = new cc.Sprite(res.menu_png, cc.rect(singleWidth, singleHeight * 2, singleWidth, singleHeight));
		var newSliderGame = new cc.MenuItemSprite(newSliderGameNormal, newSliderGameSelected, newSliderGameDisabled, function () {
			this.onNewSliderGame();
		}.bind(this));
		var sliderLabel = cc.LabelTTF("SLIDER");
		sliderLabel.x = singleWidth/2;
		sliderLabel.y = singleHeight/2;
		newSliderGame.addChild(sliderLabel, 10, 1);
		
		var newWalkerGameNormal = new cc.Sprite(res.menu_png, cc.rect(0, 0, singleWidth, singleHeight));
		var newWalkerGameSelected = new cc.Sprite(res.menu_png, cc.rect(0, singleHeight, singleWidth, singleHeight));
		var newWalkerGameDisabled = new cc.Sprite(res.menu_png, cc.rect(0, singleHeight * 2, singleWidth, singleHeight));
		var newWalkerGame = new cc.MenuItemSprite(newWalkerGameNormal, newWalkerGameSelected, newWalkerGameDisabled, function () {
			this.onNewWalkerGame();
		}.bind(this));
		var walkerLabel = cc.LabelTTF("WALKER");
		walkerLabel.x = singleWidth/2;
		walkerLabel.y = singleHeight/2;
		newWalkerGame.addChild(walkerLabel, 10, 1);
		
		var newRunnerGameNormal = new cc.Sprite(res.menu_png, cc.rect(singleWidth, 0, singleWidth, singleHeight));
		var newRunnerGameSelected = new cc.Sprite(res.menu_png, cc.rect(singleWidth, singleHeight, singleWidth, singleHeight));
		var newRunnerGameDisabled = new cc.Sprite(res.menu_png, cc.rect(singleWidth, singleHeight * 2, singleWidth, singleHeight));
		var newRunnerGame = new cc.MenuItemSprite(newRunnerGameNormal, newRunnerGameSelected, newRunnerGameDisabled, function () {
			this.onNewWalkerGame();
		}.bind(this));
		
		var menu = new cc.Menu(newTapperGame,newSliderGame);
		menu.alignItemsVerticallyWithPadding(10);
		this.addChild(menu, 1, 2);
		menu.x = (winSize.width / 2 ) - (singleWidth/2) - 5
		menu.y = 70
		
		var menu2 = new cc.Menu(newWalkerGame);
		menu2.alignItemsVerticallyWithPadding(10);
		this.addChild(menu2, 1, 2);
		menu2.x = (winSize.width / 2 ) + (singleWidth/2) + 5
		menu2.y = 70
	},
	onNewTapperGame:function (pSender) {
		var scene = new cc.Scene();
		scene.addChild(new Tapper());
		cc.director.runScene(new cc.TransitionFade(1.2, scene));

	},
	onNewSliderGame:function (pSender) {
		var scene = new cc.Scene();
		scene.addChild(new Slider());
		cc.director.runScene(new cc.TransitionFade(1.2, scene));

	},
	onNewWalkerGame:function (pSender) {
		var scene = new cc.Scene();
		scene.addChild(new Walker());
		cc.director.runScene(new cc.TransitionFade(1.2, scene));

	}
});

MainMenu.scene = function () {
	var scene = new cc.Scene();
	var layer = new MainMenu();
	scene.addChild(layer);
	return scene;
};