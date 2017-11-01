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
        // btn_pause:{
        //
        // },
        btn_pause: cc.Button,
        btn_state: Boolean,
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        cc.bulletPool = new cc.NodePool();
        this.btn_state = true;
        // cc.loader.loadRes("Texture/shoot",cc.SpriteAtlas,function (err,atlas) {
        //     if(err == null){
        //         console.log('occured some error when loadRes');
        //     }else{
        //         self.atlas = atlas;
        //     }
        // });
        var plane_hero = new HeroPlane("1");
        // this.node.addChild(plane_hero);
        plane_hero.setPosition(cc.v2(100,100));
        var scene = cc.director.getScene();
        scene.addChild(plane_hero);
        this.createEnemy("2");
    },
    createEnemy: function (enemyType) {
        var ene = new EnemyPlane(enemyType);
        ene.setPosition(cc.v2(300,800));
        var scene = cc.director.getScene();
        scene.addChild(ene);
    },
    onClickPause: function () {
        // // this.btn_pause.node.spriteFrame
        // var self = this;
        // console.log('====click pause in gamescene');
        // var btn_pressed_sprite_frame;
        // var btn_nor_sprite_frame;
        // if(self.btn_state){
        //     btn_pressed_sprite_frame = self.atlas.getSpriteFrame('game_pause_pressed');
        //     btn_nor_sprite_frame = self.atlas.getSpriteFrame('game_pause_nor');
        //     self.btn_state = false;
        // }else{
        //     btn_pressed_sprite_frame = self.atlas.getSpriteFrame('game_resume_pressed');
        //     btn_nor_sprite_frame = self.atlas.getSpriteFrame('game_resume_nor');
        //     self.btn_state = true;
        // }
        // self.btn_pause.getComponent(cc.Button).normalSprite = btn_nor_sprite_frame;
        // self.btn_pause.getComponent(cc.Button).hoverSprite = btn_nor_sprite_frame;
        // self.btn_pause.getComponent(cc.Button).pressedSprite = btn_pressed_sprite_frame;
        // self.btn_pause.getComponent(cc.Button).disabledSprite = btn_pressed_sprite_frame;
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
