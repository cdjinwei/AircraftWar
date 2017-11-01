var BasePlane = require('BasePlane');

cc.Class({
    extends: BasePlane,

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
        nodeBody: {
            default: null,
            type: cc.Node,
        },
        canMove: {
            default: false,
            type: cc.Boolean,
        },
    },

    ctor: function () {
        console.log('===================init HeroPlane:');
        this.nodeBody = this.getCurrentNode();
        this.registerControllEvent();
        // this.shoot();
        // this.schedule(this.shoot,1);
        cc.director.getScheduler().schedule(this.shoot, this, 0.5);
    },

    registerControllEvent: function () {
        var self = this;
        this.nodeBody.on(cc.Node.EventType.TOUCH_START,function (event) {
           self.canMove = true;
        });
        this.getCurrentNode().on(cc.Node.EventType.TOUCH_END,function (event) {
            self.canMove = false;
        });
        this.getCurrentNode().on(cc.Node.EventType.TOUCH_MOVE,function (event) {
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
            console.log('===============bullet pool get:'+cc.bulletPool.size());
        }else{
            var bulletPrefab = cc.loader.getRes('Prefab/bullet_1');
            bullet = cc.instantiate(bulletPrefab);
        }
        var scene = cc.director.getScene();
        var planePos = cc.v2(self.nodeBody.x,self.nodeBody.y+50);
        var worldPos = scene.convertToWorldSpace(planePos);
        bullet.position = worldPos;
        scene.addChild(bullet);
    },
    setPosition: function (pos) {
        this.nodeBody.position = pos;
    },
    getHit: function () {
        // console.log('==================getHit hero');
    },
    adjustPlanePosition: function (deltaPos) {
        var self = this;
        if (self.nodeBody.x+deltaPos.x <=50){
            self.nodeBody.x = 50;
        }else if(self.nodeBody.x+deltaPos.x >=590){
            self.nodeBody.x = 590;
        }else{
            self.nodeBody.x = self.nodeBody.x+deltaPos.x;
        }
        if (self.nodeBody.y+deltaPos.y <=55){
            self.nodeBody.y = 55;
        }else if(self.nodeBody.y+deltaPos.y >=1080){
            self.nodeBody.y = 1080;
        }else{
            self.nodeBody.y = self.nodeBody.y+deltaPos.y;
        }
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {
    //
    // },
});
