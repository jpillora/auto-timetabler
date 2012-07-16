//@project: Auto-Timetabler
//@author: jpillora
//@date: 15/6/2012
//
//Setup name space and utility functions
$(function(){
    
    if(window.console === undefined)
        window.console = { log: function(str){} }
    window.guid = function(){return(((1+Math.random())*65536)|0).toString(16).substring(1)}
    
    window.App = {};
    window.App.Util = {};
    
    //extra view methods
    _.extend(Backbone.View.prototype, {
      //custom button intialiser
      renderButtons: function() {
        this.$("button").each(function(i,html) {
          var e = $(html);
          var showText = e.attr('data-hidetext') != "true";
          var settings = { text: showText }
          var icon = e.attr('data-icon');
          if(icon) settings.icons = { secondary: "ui-icon-"+icon };
          e.button(settings);
        });
        //console.log("buttonsets: " + this.$(".buttonset").buttonset().length);
      },
      //custom editable field initialiser
      renderEditables: function(saveCallback) {
        
        var editMode = function(event) {
          var label = $(event.currentTarget);
          var input = label.next();
          input.val(label.hide().html()).show().select();
        };
        
        var viewModeKey = function(event) {
          if (event.keyCode == 13) viewMode(event); 
        }
        var viewMode = function(event) {
          var input = $(event.currentTarget);
          var label = input.prev();
          var newVal = input.hide().val();
          label.html(newVal).show();
          
          var obj = {};
          obj[label.attr('data-name')] = newVal;
          saveCallback(obj);
        };

        return this.$(".editable:not([data-editble])").each(function(i,html) {
          var label = $(html);
          label.attr('data-editble',1).click(editMode);
          
          var isInput = (label.attr("data-multiline") === undefined);
          var edits = $("<"+(isInput?"input":"textarea")+"/>").addClass("edits").blur(viewMode).hide();
          if(isInput) edits.keyup(viewModeKey);
          label.after(edits);
        });
      }
      
    });
    
    console.log("setup complete.");
});