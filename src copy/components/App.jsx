var React = require('react');

var PasteBox = require('./PasteBox.jsx');

//change to what default you want
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


var APP = React.createClass({
  

  doFancyThingWithDataPastedByUser: function(stuff){
    console.log(stuff);
    // tableActions.sendUserDataToServer(stuff)
  },

  render: function(){
    return (
      <div className="container">
        <PasteBox
          sampleData={sampleInputString}
          cb={this.doFancyThingWithDataPastedByUser}
        />
      </div>
    );
  }
})

module.exports = APP;