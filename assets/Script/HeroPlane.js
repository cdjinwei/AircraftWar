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
        console.log('===================init HeroPlane');
        this.nodeBody = this.getCurrentNode();
        this.registerControllEvent();

    },

    registerControllEvent: function () {
        var self = this;
        this.nodeBody.on(cc.Node.EventType.MOUSE_DOWN,function (event) {
           console.log('================xxx1');
           self.canMove = true;
        });
        this.getCurrentNode().on(cc.Node.EventType.MOUSE_UP,function (event) {
            console.log('================xxx2');
            self.canMove = false;
        });
        this.getCurrentNode().on(cc.Node.EventType.MOUSE_LEAVE,function (event) {
            console.log('================xxx2');
            self.canMove = false;
        });
        this.getCurrentNode().on(cc.Node.EventType.MOUSE_MOVE,function (event) {
            if(self.canMove){
                var pos = event.getDelta();
                self.nodeBody.x = self.nodeBody.x + pos.x;
                self.nodeBody.y = self.nodeBody.y + pos.y;
            }
        });
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
