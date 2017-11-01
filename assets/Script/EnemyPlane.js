var BasePlane = require('BasePlane');
var config = require('config');
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
        nodeBody:{
            default: null,
            type: cc.Node,
        },
        speed:{
            default:300,
            type: cc.Integer,
        },
        canMove: {
            default: false,
            type: cc.Boolean,
        }
    },

    // use this for initialization
    ctor: function (enemyType) {
        this.nodeBody = this.getCurrentNode();
        this.speed = config.EnemyConfig[enemyType].speed;
        this.canMove = true;
    },
    onCollisionEnter: function (other,self) {
        console.log('=======================get hit enemy');
    },
    getHit: function () {
        console.log('=======================get hit enemy');
    },
    setPosition: function (pos) {
        this.nodeBody.position = pos;
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this.canMove){
            this.nodeBody.y -= this.speed*dt*5;
        }
    },
});
