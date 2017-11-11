
var Bullet = cc.Class({
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
        speed: 800,
    },

    // use this for initialization
    onLoad: function () {

    },
    onCollisionEnter:function (other,self) {
        if(cc.bulletPool){
            cc.bulletPool.put(this.node);
        }else{
            this.node.destroy();
        }
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.node.y += this.speed*dt*5;
        if(this.node.y > 1130){
            if(cc.bulletPool){
                cc.bulletPool.put(this.node);
            }else{
                this.node.destroy();
            }
        }
    },
});
