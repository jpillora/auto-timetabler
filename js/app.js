//@project: Auto-Timetabler
//@author: jpillora
//@date: 15/6/2012
//
//App classes 
$(function(){
  
  //Private helpers
  var log = function(str) { console.log("App: " + str); };
  
  window.AppView = Backbone.View.extend({
    el: $("#app"),
    
    events: {
      "click #createSub":  "createOne",
      "click #removeSubs":  "removeAll"
    },
    
    initialize: function() {
      window.subjects.bind('add', this.addOne, this);
      window.subjects.bind('reset', this.addAll, this);
      window.subjects.bind('all', this.render, this);
      window.subjects.fetch();
    },

    render: function() {
      log("Render View");
      this.renderButtons();
    },

    addOne: function(subject) {
      var view = new SubjectView({model: subject});
      var e = view.render().$el.hide().delay(100).slideDown('slow');
      this.$("#subject-list").append(e);
    },
    addAll: function() {
      window.subjects.each(this.addOne);
    },
    createOne: function() {
      log("Create one Subject");
      window.subjects.create({ name: "subject-"+window.guid() },{wait: true});
    },
    removeAll: function() {
      while(window.subjects.length) 
        window.subjects.first().clear(); 
      
    }

  });
  
  window.appView = new AppView();
});