
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
    },

    // use this for initialization
    onLoad: function () {
        console.log("=============");
        cc.director.preloadScene('GameScene');
        cc.prefabRes = null;
        this.loadGameRes();
    },
    loadGameRes: function () {
        // cc.loader.loadRes('Prefab/hero',cc.Prefab,function (err,assert) {
        //     if(err == null){
        //         cc.prefabRes = assert;
        //         console.log('==============load res succ');
        //     }else{
        //         console.log('==============load res error');
        //     }
        // });
        cc.loader.loadResDir('Prefab',function (err,asserts,urls) {
            if(err == null ) {
                console.log('===========load res succ:'+urls.length);
                cc.prefabRes = asserts;
                for (var i=0;i<urls.length;i++){
                    var name = urls[i];
                    console.log('=========name:'+name);
                }
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
