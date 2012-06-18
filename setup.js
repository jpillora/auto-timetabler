//@project: Auto-Timetabler
//@author: jpillora
//@date: 15/6/2012
//
//Setup name space and utility functions
$(function(){
    
    
    window.guid = function(){return(((1+Math.random())*65536)|0).toString(16).substring(1)}
    
    window.App = {};
    window.App.Util = {};
    
    _.extend(Backbone.View.prototype, {
      //custom intialiser
      renderButtons: function() {
        return this.$("button").each(function(i,e) {
          
          var $e = $(e);
          var showText = $e.attr('data-hidetext') != "true";
          var settings = { text: showText }
          var icon = $e.attr('data-icon');
          if(icon) settings.icons = { secondary: "ui-icon-"+icon };
          $e.button(settings);
        });
      }
      
    });
    
    console.log("setup complete.");
});