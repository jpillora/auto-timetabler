//@project: Auto-Timetabler
//@author: jpillora
//@date: 15/6/2012
//
//Subject classes
$(function(){
  //Private helpers
  var log = function(cl, str) { console.log("Class: " + cl.id + ": " + str); };
  
  window.Class = Backbone.Model.extend({
    initialize: function() {
      this.set({"name": this.id});
      this.set({"location": "PLACE"});
      this.set({"start": "07:00"});
      this.set({"end": "11:00"});
      log(this,"New!");
    },
    clear: function(opts) {
      this.destroy(opts);
    }
  });

  window.ClassList = Backbone.Collection.extend({
    model: Class,
    initialize: function() {}
  });
  
  window.ClassView = Backbone.View.extend({
    tagName:  "tr",

    // Cache the template function for a single item.
    template: _.template($('#class-template').html()),
    
    events: {
      "click .remove":  "clear"
    },
    
    initialize: function () {
      _.bindAll(this);
      this.model.bind('change', this.render, this);
      this.model.bind('destroy', this.animRemove, this);
    },
    
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.renderButtons();
      return this;
    },

    // Remove the item, destroy the model.
    clear: function(e) {
      e.stopImmediatePropagation();
      log(this.model, "Removed!");
      this.model.clear();
    },
    
    animRemove: function() {
      this.$el.find(">td>div").slideUp('slow', function() {
        $(this).remove();
      })
    }
    
  });
  
  
});