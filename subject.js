//@project: Auto-Timetabler
//@author: jpillora
//@date: 15/6/2012
//
//Subject classes
$(function(){
  
  var log = function(sub, str) { console.log("Subject: " + sub.id + ": " + str); };
  
  window.Subject = Backbone.Model.extend({
    initialize: function() {
      if (!this.get("name"))
        this.set({"name": this.id});
      if (!this.get("code"))
        this.set({"code": "1234"});
      
      this.set({"classes": new ClassList()});
    },
    clear: function() {
      window.subjects.remove(this);
    }
  });

  window.SubjectList = Backbone.Collection.extend({
    model: Subject,
    initialize: function() {}
  });
  
  //Singleton app-wide instance
  window.subjects = new SubjectList();
  
  window.SubjectView = Backbone.View.extend({
    tagName:  "div",

    // Cache the template function for a single item.
    template: _.template($('#subject-template').html()),
     
    events: {
      "click .removeThis":  "clear",
      "click .create":  "createOne",
      "click .removeAllClasses":  "removeAllClasses"
    },
    
    initialize: function () {
      this.model.view = this;
      this.model.bind('change', this.render, this);
    },
    
    render: function() {
      log(this.model,"Render View");
      this.$el.html(this.template(this.model.toJSON()));
      this.classList = this.$('.classes .list');
      return this;
    },
    
    addOne: function(cl) {
      var view = new ClassView({model: cl});
      this.classList.append(view.render().el);
    },

    addAll: function() {
      this.model.classes.each(this.addOne);
    },

    createOne: function(e) {
      log(this.model,"Create one Class");
      this.model.classes.add({  id:window.guid(), location: "Melbourne" });
    },
    
    // Remove the item, destroy the model.
    clear: function() {
      log(this.model,"Remove");
      this.model.clear();
    },
    
    removeAllClasses: function() {
      log(this.model,"Remove all Classes");
      window.model.classes.each(function(c){ c.clear(); });
    }
    
  });
  
  
});