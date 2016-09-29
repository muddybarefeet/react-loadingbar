'use strict';

var React = require('react');
var reactDOM = require('react-dom');
var tsv = require('tsv');

//default if none passed in
var x = [
 ["Street Address","City","State","Post Code","Name","Phone Number","URL"],
 ["225 George St","Sydney","NSW","2000","Deloitte","(415) 547-0254","www.deloitte.com"],
 ["88 Phillip St","Sydney","NSW","2000","LEK Consulting","(844) 266-7486","www.lek.com"],
 ["1 Farrer Pl","Sydney","NSW","2000","Bain & Company","(310) 957-8814","www.bain.com"],
 ["201 Sussex St","Sydney","NSW","2000","PwC Australia","N/A","www.pwc.com"],
 ["10 Shelley","Sydney","NSW","2000","KPMG Australia","(415) 400-4355","www.kpmg.com"]
];

var sampleInputString = x.map(function (rowArray){
  return rowArray.join('\t');
}).join('\n');

var PasteBox = React.createClass({
  getInitialState: function(){
    return {
      isTableMode: true,
      inputValue: (this.props.sampleData || sampleInputString),
      hovering: false,
    };
  },

  handleClick: function(){
    this.setState({
      isTableMode: false,
      hovering: false
    });
    this.render();
  },

  handleMouseEnter: function(){
    this.setState({hovering: true});
  },

  handleMouseLeave: function(){
    this.setState({hovering: false});
  },

  handleFocus: function () {
    if (this.state.isTableMode === true) {
      this.setState({
        isTableMode: false
      }, function () {
        reactDOM.findDOMNode(this.refs["paste-box"]).select();
      });
    }
  },

  updateInputArea: function (event) {
    this.setState({
      inputValue: event.target.value
    });
  },

  getTableFromArrayData: function(inputData){
    var result = {};
    var content;
    var arrOfJson = tsv.parse(inputData);

    result.headers = Object.keys(arrOfJson[0]).map(function (header,i) {
      return (<td className="header-underline" key={i}>{header}</td>);
    });

    result.body = arrOfJson.map(function (rowObject, index) {
      var cells = [];
      for (var key in rowObject) {
        cells.push(<td key={key}>{rowObject[key]}</td>)
      }
      return (<tr key={index}>{cells}</tr>);
    });
    return result;
  },

  formatDataForParent: function(){
    var result = {header: [], data: []};
    var jsonPasted = tsv.parse(this.state.inputValue);
    result.header = Object.keys(jsonPasted[0]);
    result.data = jsonPasted
    return result;
  },

  offFocus: function () {
    var that = this;
    this.setState({
      isTableMode:true
    }, function(){
      if(this.props.cb){
        this.props.cb(that.formatDataForParent());
      }
    });
  },
  
  render: function(){

    var content;

    if (this.state.isTableMode) {
      //make a table and insert the json data
      var tableData = this.getTableFromArrayData(this.state.inputValue);
      var tag = this.state.hovering ? 
        (<span className="user-message">Click to paste your data</span>) : null;

      content = (
        <div className="example-data-table">
          <table className="add-opacity table-bordered table-width" onClick={this.handleClick}>
            <thead>
              <tr>
                {tableData.headers}
              </tr>
            </thead>
            <tbody>
              {tableData.body}
            </tbody>
          </table>
          {tag}
        </div>
      );
    } else {
      //show the string data in the textArea
      content = (
        <div>
          <textarea
          ref="paste-box"
          value={this.state.inputValue}
          className="paste-box"
          onChange={this.updateInputArea}>
          </textarea>
        </div>
      );
    }

    var hoverStyle = this.state.hovering ? {border:"3px solid green"} : {border:"none"};

    return (

      <div
        className="table-container"
        onClick={this.handleFocus}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        style={hoverStyle}
        onBlur={this.offFocus}
      >
        {content}
      </div>

    );
  }
})

module.exports = PasteBox;