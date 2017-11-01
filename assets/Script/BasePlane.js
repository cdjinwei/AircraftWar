var config = require('config');
cc.Class({
    extends: cc.Node,

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
        _target:cc.Node,
        _blood:{
            default:1,
            type:cc.Integer,
        },
        _level:{
            default:0,
            type: cc.Integer,
        }
    },
    ctor: function (type) {
        console.log('===============base ctor:'+type);
        var planeType = parseInt(type);

        var planeInfo = config.PlaneConfig[planeType];

        this.initPlane(planeInfo);
    },
    initPlane: function (planeInfo) {
        var self = this;
        self._blood = planeInfo.blood;
        console.log('================path:'+planeInfo.prefabPath);
        var pp = cc.loader.getRes(planeInfo.prefabPath);
        if(pp != null) {
            self._target = cc.instantiate(pp);
            self._target.addComponent(cc.BoxCollider);
            var frameSize = self._target.getComponent(cc.Sprite).spriteFrame.getRect();
            self._target.getComponent(cc.BoxCollider).size = new cc.size(frameSize.width,frameSize.height);
            self.addChild(self._target);
        }else{

        }
    },
    getHit: function () {
        // this._blood -= hit;
        // if(this._blood <= 0){
        //     this.destroySelf();
        // }
        console.log('=========================gethit');
    },
    getCurrentNode: function () {
        return this._target;
    },
    shoot: function () {
        console.log('==========base shoot');
    },
    moveLeft: function () {
        console.log('==============move left');
    },
    moveRight: function () {
        console.log('==============move right');
    },
    destroySelf:function () {
        this.removeFromParent();
    }
});
