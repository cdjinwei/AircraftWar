var BasePlane = require('BasePlane');
var config = require('config');
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
        blood:{
            default: 2,
            type: cc.Integer,
        },
        speed:{
            default:20,
            type: cc.Integer,
        },
        canMove: {
            default: false,
            type: cc.Boolean,
        },
        isAlive:{
            default: true,
            type: cc.Boolean,
        }
    },

    // use this for initialization
    // ctor: function (enemyType) {
    //     this.nodeBody = this.getCurrentNode();
    //     this.speed = config.EnemyConfig[enemyType].speed;
    //     this.canMove = true;
    // },
    onLoad: function () {
        // this.canMove = true;
        this.anim = this.getComponent(cc.Animation);
        this.anim.on('finished',this.onDestroyAnimStop,this);
    },
    onDestroyAnimStop: function () {
        if(cc.enemyPool){
            cc.EventHandler.sendEvent('KILL_ENEMY',1);
            cc.enemyPool.put(this.node);
        }else {
            cc.EventHandler.sendEvent('KILL_ENEMY',1);
            this.node.destroy();
        }
    },
    initPlane: function () {
        this.getComponent(cc.Sprite).spriteFrame = cc.textureRes.getSpriteFrame('enemy1');
        this.blood = 2;
        this.canMove = true;
        this.isAlive = true;
    },
    onCollisionEnter: function (other,self) {
        if(this.isAlive){
            this.getHit();
        }
    },
    onCollisionStay: function (other,self) {
        if(this.isAlive){
            this.getHit();
        }
    },
    getHit: function () {
        this.blood -= 1;
        if(this.blood <= 0){
            this.isAlive = false;
            this.playDestroyAnim();
        }
    },
    playDestroyAnim: function () {
        this.anim.play('enemy1_break');
    },
    setPosition: function (pos) {
        this.node.position = pos;
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this.canMove){
            this.node.y -= this.speed*dt*3;
        }
        if(this.node.y < 0){
            if(cc.enemyPool){
                cc.enemyPool.put(this.node);
            }else{
                this.node.destroy();
            }
        }
    },
});
