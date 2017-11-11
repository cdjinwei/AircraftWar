var HeroPlane = require('HeroPlane');
var EnemyPlane = require('EnemyPlane');
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        btn_pause:{
            default: null,
            type: cc.Button,
        },
        score_label:{
            default: null,
            type: cc.Label,
        }
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = false;
        cc.bulletPool = new cc.NodePool();
        cc.enemyPool = new cc.NodePool();

        var prefab_res = cc.loader.getRes('Prefab/hero');
        var plane_hero = cc.instantiate(prefab_res);
        plane_hero.addComponent(cc.BoxCollider);
        var frameSize = plane_hero.getComponent(cc.Sprite).spriteFrame.getRect();
        plane_hero.getComponent(cc.BoxCollider).size = frameSize;
        var scene = cc.director.getScene();
        scene.addChild(plane_hero);
        plane_hero.position = cc.v2(200,200);
        //
        plane_hero.addComponent(HeroPlane);
        cc.director.getScheduler().schedule(this.createEnemy, this, 0.3);
        // this.createEnemy();
        cc.EventHandler.registerEvent('UPDATE_SCORE',this.updateScore,this);
    },
    createEnemy: function () {
        var scene = cc.director.getScene();
        var plane_enemy
        if(cc.enemyPool.size() > 0){
            plane_enemy = cc.enemyPool.get();
        }else{
            var prefab_res = cc.loader.getRes('Prefab/enemy_1');
            var plane_enemy = cc.instantiate(prefab_res);
            plane_enemy.addComponent(cc.BoxCollider);
            var frameSize2 = plane_enemy.getComponent(cc.Sprite).spriteFrame.getRect();
            plane_enemy.getComponent(cc.BoxCollider).size = frameSize2;
            plane_enemy.addComponent(EnemyPlane);
        }
        plane_enemy.getComponent(EnemyPlane).initPlane();
        scene.addChild(plane_enemy);
        var pos_x = Math.random()*640;
        if(pos_x <20){
            pos_x = 20;
        }else if(pos_x > 620){
            pos_x = 620;
        }
        plane_enemy.position = cc.v2(pos_x,1136);

    },
    updateScore: function (score) {
        this.score_label.string = 'Score:'+score;
    },
    onClickPause: function () {

        // // this.btn_pause.node.spriteFrame
        var self = this;
        var btn_pressed_sprite_frame;
        var btn_nor_sprite_frame;
        if(cc.director.isPaused()){
            btn_pressed_sprite_frame = cc.textureRes.getSpriteFrame('game_resume_pressed');
            btn_nor_sprite_frame = cc.textureRes.getSpriteFrame('game_resume_nor');
        }else{
            btn_pressed_sprite_frame = cc.textureRes.getSpriteFrame('game_pause_pressed');
            btn_nor_sprite_frame = cc.textureRes.getSpriteFrame('game_pause_nor');
        }
        self.btn_pause.getComponent(cc.Button).normalSprite = btn_nor_sprite_frame;
        self.btn_pause.getComponent(cc.Button).hoverSprite = btn_nor_sprite_frame;
        self.btn_pause.getComponent(cc.Button).pressedSprite = btn_pressed_sprite_frame;
        self.btn_pause.getComponent(cc.Button).disabledSprite = btn_pressed_sprite_frame;

        if(cc.director.isPaused()){
            cc.director.resume();
        }else{
            cc.director.pause();
        }
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
