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
        _level:{
            default:0,
            type: cc.Integer,
        }
    },
    ctor: function () {

        this.initPlane();
    },
    initPlane: function () {
        var self = this;

        self._target = cc.instantiate(cc.prefabRes);
        self.addChild(self._target);
    },
    getCurrentNode: function () {
        return this._target;
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
