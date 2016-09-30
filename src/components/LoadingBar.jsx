'use strict';

var React = require('react');
var reactDOM = require('react-dom');
var tsv = require('tsv');

var actions = require('../actions/AppActions.js');
var appStore = require('../stores/AppStore.js');


var LoadingBar = React.createClass({
  getInitialState: function(){
    return {
      progressbar: null,
      progress: "50%"
    };
  },

  componentDidMount: function () {
    appStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    appStore.removeChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState({
      progress: appStore.getGeocodeStatus() + "%"
    });

  },

  handleClick: function () {
    //trigger action and send message to get data
    actions.loadBigData([1,2,3,4,5,6,7,8,9,10]);
  },
  
  render: function(){


    return (

      <div style={{'marginTop':'100px'}}>

        <div className="progress">
          <div className="progress-bar progress-bar-success" 
            role="progressbar" 
            aria-valuenow={this.state.progress}
            aria-valuemin="0" 
            aria-valuemax="100" 
            style={{"width": this.state.progress}}>
            {this.state.progress}
          </div>
        </div>

        <div className="text-center">
          <a href="#" className="btn btn-info" role="button" onClick={this.handleClick} >Click Me!</a>
        </div>

      </div>

    );
  }
})

module.exports = LoadingBar;