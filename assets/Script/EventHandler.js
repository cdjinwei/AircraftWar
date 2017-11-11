var EeventHandler = {
    _handlers: [],
    sendEvent: function (event_name,func_param) {
        var return_val = [];

        var event_not_registered = true;
        for(var e_name in this._handlers){
            if(e_name == event_name){
                event_not_registered = false;
                for (var i=0;i<this._handlers[e_name].length;i++){
                    var val = this._handlers[e_name][i](func_param);
                    return_val.push(val);
                }
            }
        }
        if(event_not_registered){
            console.log('===========event '+ event_name + ' not registered');
        }
        return return_val;
    },
    registerEvent: function (event_name,event_func,func_target) {
        this._handlers[event_name] = this._handlers[event_name] || [];
        if(func_target != null){
            this._handlers[event_name].push(event_func.bind(func_target));
        }else{
            this._handlers[event_name].push(event_func);
        }

    },
    unRegisterEvent: function (event_name) {
        this._handlers[event_name] = null;
    },
    unRegiserAllEvents: function () {
        this._handlers = [];
    }
};
module.exports = EeventHandler;