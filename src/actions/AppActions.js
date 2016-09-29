'use strict';

var AppDispatcher = require('../dispatchers/AppDispatcher');
var Promise = require('bluebird');


var asyncFunction = function (time, index, dataLength) {
  setTimeout(function () {
    AppActions.emitLoaded(index, dataLength);
  },time);
}

var AppActions = {


  loadBigData: function(dataToGet){
    console.log('action')

    AppDispatcher.handleClientAction({
      actionType: 'START_LOAD',
      data: [0,dataToGet.length]
    });
    
    //promise map through the results
    //once each done update
    //once all done emit end
    Promise.try(function(){
      return dataToGet.slice(0);
    })
    .mapSeries(function (datum, index) {
      var randomTime = Math.floor( Math.random()*5000 );
      asyncFunction(randomTime, index, dataToGet.length);
    })

  },

  emitLoaded: function (index, dataLength) {
    AppDispatcher.handleClientAction({
      actionType: 'EMIT_LOAD',
      data: [index+1,dataLength]
    });
  },

  //trigger on all data complete
  emitFinished: function (dataCompleted) {
    AppDispatcher.handleClientAction({
      actionType: 'EMIT_FINISHED',
      data: dataCompleted
    });
  }

};

module.exports = AppActions;