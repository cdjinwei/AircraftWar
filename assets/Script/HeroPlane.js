// var BasePlane = require('BasePlane');

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
        _score: 0,
        nodeBody: {
            default: null,
            type: cc.Node,
        },
        canMove: {
            default: false,
            type: cc.Boolean,
        },
    },

    // ctor: function () {
    //     console.log('===================init HeroPlane:');
    //     this.nodeBody = this.getCurrentNode();
    //     this.registerControllEvent();
    //     // this.shoot();
    //     // this.schedule(this.shoot,1);
    //     cc.director.getScheduler().schedule(this.shoot, this, 0.5);
    // },
    onLoad: function () {
        this.registerControllEvent();
        cc.director.getScheduler().schedule(this.shoot, this, 0.5);
        cc.EventHandler.registerEvent('KILL_ENEMY',this.onKillEnemy,this);
    },
    onKillEnemy: function (score) {
        this._score = this._score + score;
        cc.EventHandler.sendEvent('UPDATE_SCORE',this._score);
    },
    onCollisionEnter: function (other,self) {

    },
    onCollisionStay: function (other,self) {

    },
    registerControllEvent: function () {
        var self = this;
        this.node.on(cc.Node.EventType.TOUCH_START,function (event) {
           self.canMove = true;
        });
        this.node.on(cc.Node.EventType.TOUCH_END,function (event) {
            self.canMove = false;
        });
        this.node.on(cc.Node.EventType.TOUCH_MOVE,function (event) {
            if(self.canMove){
                var pos = event.getDelta();
                self.adjustPlanePosition(pos);
                // self.shoot();
            }
        });
    },
    shoot:function () {
        var self = this;
        var bullet = null;
        if(cc.bulletPool.size() > 0){
            bullet = cc.bulletPool.get();
        }else{
            var bulletPrefab = cc.loader.getRes('Prefab/bullet_1');
            bullet = cc.instantiate(bulletPrefab);
        }
        var scene = cc.director.getScene();
        var planePos = cc.v2(self.node.x,self.node.y+50);
        var worldPos = scene.convertToWorldSpace(planePos);
        bullet.position = worldPos;
        scene.addChild(bullet);
    },
    setPosition: function (pos) {
        this.node.position = pos;
    },
    getHit: function () {
        // console.log('==================getHit hero');
    },
    adjustPlanePosition: function (deltaPos) {
        var self = this;
        if (self.node.x+deltaPos.x <=50){
            self.node.x = 50;
        }else if(self.node.x+deltaPos.x >=590){
            self.node.x = 590;
        }else{
            self.node.x = self.node.x+deltaPos.x;
        }
        if (self.node.y+deltaPos.y <=55){
            self.node.y = 55;
        }else if(self.node.y+deltaPos.y >=1080){
            self.node.y = 1080;
        }else{
            self.node.y = self.node.y+deltaPos.y;
        }
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {
    //
    // },
});
