'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var progress = 0;
var counter = 0;

var AppStore = Object.assign(new EventEmitter (), {
  
  getGeocodeStatus: function(){
    return progress;
  },

  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback){
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(payload){
  var action = payload.action;

  if(action.actionType === 'START_LOAD'){
    progress = 0;
    counter = 0;
    AppStore.emitChange();
  }

  if(action.actionType === 'EMIT_LOAD'){
    counter++;
    progress = (counter*100)/action.data;
    AppStore.emitChange();
  }

  if(action.actionType === 'END_LOAD'){
    //this would load the compleate data waiting for
    AppStore.emitChange();
  }

});

module.exports = AppStore;