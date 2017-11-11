
var config = require("config");
var HeroPlane = require('HeroPlane');
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
        testData: 111,
    },

    // use this for initialization
    onLoad: function () {
        cc.prefabRes = null;
        this.loadGameRes();
        cc.EventHandler = require("EventHandler");
    },
    testFunc: function () {

    },
    loadGameRes: function () {

        cc.loader.loadResDir('Prefab',function (err,asserts,urls) {
            if(err == null ) {
                cc.prefabRes = asserts;
                for (var i=0;i<urls.length;i++){
                    var name = urls[i];
                }
            }
        });
        cc.loader.loadRes('Texture/shoot',cc.SpriteAtlas,function (err,asserts) {
            if(err == null ) {
                cc.textureRes = asserts;
            }
        });
    },
    onClickStart: function(){
        cc.director.loadScene('GameScene',function () {
            console.log('load main scene success');
        });
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
