//@project: Auto-Timetabler
//@author: jpillora
//@date: 15/6/2012
//
//Subject classes
$(function(){
  
  //Private helpers
  var log = function(sub, str) { console.log("Subject: " + sub.id + ": " + str); };
  var _view;
  
  window.Subject = Backbone.Model.extend({
    initialize: function() {
      if (!this.get("code")) this.set({"code": "****"});
      
      this.classes = new ClassList();
      this.classes.localStorage = new Store("class-backbone-from-"+this.get('name'));
    },
    clear: function() {
      this.destroy();
    }
  });

  window.SubjectList = Backbone.Collection.extend({
    model: Subject,
    initialize: function() {},
    localStorage: new Store("subject-backbone")
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
      _view = this;
      this.model.bind('change', this.render, this);
      this.model.bind('destroy', this.remove, this);
      
      this.model.classes.bind('add', this.addOne, this);
      this.model.classes.bind('reset', this.addAll, this);
      //this.model.classes.bind('all', this.render, this);
      
      this.classDiv = $("<div/>");
      this.model.classes.fetch();
    },
    
    render: function() {
      log(this.model,"Render View");
      
      this.$el.addClass("subject");
      this.$el.html(this.template(this.model.toJSON()));
      this.$(".list").append(this.classDiv);
      return this;
    },
    
    addOne: function(cl,d,e,f) {
      var classView = new ClassView({model: cl});
      _view.classDiv.append(classView.render().el);
    },

    addAll: function() {
      this.model.classes.each(this.addOne);
    },

    createOne: function() {
      log(this.model,"Create one Class");
      this.model.classes.create({  location: "class-from-"+this.model.get('name') });
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