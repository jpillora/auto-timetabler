//@project: Auto-Timetabler
//@author: jpillora
//@date: 15/6/2012
//
//App classes
$(function(){
  
  var log = function(str) { console.log("App: " + str); };
  
  window.AppView = Backbone.View.extend({
    el: $("#app"),
    
    events: {
      "click #createSub":  "createOne",
      "click #removeSub":  "removeOne",
      "click #removeAllSubs":  "removeAll"
    },
    
    initialize: function() {

      this.subjectList = this.$("#subjects .list");

      window.subjects.bind('add', this.addOne, this);
      window.subjects.bind('remove', this.removeView, this);
      window.subjects.bind('all', this.render, this);
      
    },

    render: function() {
      log("Render View");
    },

    addOne: function(subject) {
      var view = new SubjectView({model: subject});
      this.subjectList.append(view.render().el);
    },

    createOne: function(e) {
      log("Create one Subject");
      window.subjects.add({ id:window.guid() });
    },
    
    removeView: function(sub) {
      log("Remove a Subject");
      sub.view.remove();
    },
    removeOne: function(obj) {
      if(window.subjects.length ==0) {
        log("cannot remove. no subjects left");
        return;
      }
      var s = window.subjects.pop();
      log("Remove one Subject: " + s.id);
    },

    removeAll: function() {
      
      window.subjects.each(function(s) { 
        log("Remove each Subjects: " + s.id);
        //s.clear({}); 
      
      });
    }
  });
  
  window.appView = new AppView();
});