//@project: Auto-Timetabler
//@author: jpillora
//@date: 15/6/2012
//
//Subject classes
$(function(){
  
  window.Class = Backbone.Model.extend({
    // Defaults
    defaults: function() {
      return {
        location: "Sydney"
      };
    },
    initialize: function() {
      if (!this.get("location"))
        this.set({"location": this.defaults.location});
    }
  });

  window.ClassList = Backbone.Collection.extend({
    model: Class,
    initialize: function() {}
  });
  
  window.ClassView = Backbone.View.extend({
    tagName:  "div",

    // Cache the template function for a single item.
    template: _.template($('#class-template').html()),
    
    initialize: function () {
      this.model.bind('change', this.render, this);
      this.model.bind('clear', this.remove, this);
    },
    
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    
    // Remove the item, destroy the model.
    clear: function() {
      this.model.clear();
    }
    
  });
  
  
});