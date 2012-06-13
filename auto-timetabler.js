/** Google Calendar Auto Timetabler
 * @author jpillora
 * @date 13/06/2012
 * @version 0.1
 */
$(function(){
  "use strict";
  
  function log(str){ console.log(str); }
  
  
  //SUBJECT MODELS
  var Subject = Backbone.Model.extend({
    initialize: function() { 
      log("NEW Subject Model"); 
      this.view = new ClassView();
      this.classes = new Classes( null, { subView: this });
      
    },
    name: null,
    code: null,
    view: null
  });
  
  var Subjects = Backbone.Collection.extend({
    initialize: function (model, options) {
      log("NEW Subjects Collection");
      this.view = options.subView;
      this.bind("add", this.view.addSubject);
    },
    view: null
  });
  //SUBJECT VIEW
  var SubjectsView = Backbone.View.extend({
    el: $("#subjects"),
    initialize: function () {
      //subjects collection
      this.$list = this.$el.children(".list");
      this.subjects = new Subjects( null, { subView: this });
    },
    events: {
      "click #addSubjectBtn":  "showPrompt"
    },
    showPrompt: function () {
      var name = prompt("Subject Name ?");
      var code = prompt("Subject Code ?");
      var sub = new Subject({ name: name, code: code });
      this.subjects.add(sub);
    },
    
    addSubject: function (sub, subs) {
      var cont = $("<div></div>").css({'border-radius':5, 'background':'grey', width:400, 'color':'white','padding':30, 'margin':10});
      if(sub.get('code')) cont.append($("<h1></h1>").html(sub.get('code')).css('font-weight','bold'));
      if(sub.get('name')) cont.append($("<h3></h3>").html(sub.get('name')).css('text-decoration','underline'));
      subs.view.$el.append(cont);
    }
  });
  
  //CLASS CLASSES
  var Class = Backbone.Model.extend({
    initialize: function() { log("NEW Class Model"); },
    name: null
  });
  var Classes = Backbone.Collection.extend({
    
    initialize: function (model, options) {
      log("NEW Classes Collection");
    }
  });
  
  
  
  
  //THE APP
  var AppView = Backbone.View.extend({
    el: $("body"),
    initialize: function () {
      this.subjectView = new SubjectsView();
    }
  });
  
  window.app = new AppView;
  
});

$(document).ready(function() {
    $("#input").keyup(function() {
        buildClasses(parseClasses($(this).val()));
    })
});

function buildClasses(subjects, id) {
    var out = $("#output").html('');
    for(var s in subjects) {
        var sub = subjects[s];
        var cont = $("<div></div>").css({'border-radius':5, 'background':'grey', width:400, 'color':'white','padding':30, 'margin':10});
        
        if(sub.code) cont.append($("<h1></h1>").html(sub.code).css('font-weight','bold'));
        if(sub.name) cont.append($("<h3></h3>").html(sub.name).css('text-decoration','underline'));
        
        if(sub.classes) {
            var classCont = $("<div></div>");
            for(var c in sub.classes) {
                var cl = sub.classes[c];
                
                var span = $("<div></div>").html(
                    (cl.startTime ? cl.startTime + " - " : "") +
                    (cl.endTime ? cl.endTime + ". " : "") +
                    (cl.location ? " @ " +  cl.location + ". " : "")
                );
                
                classCont.append(span);
            }
            cont.append(classCont);
        } else {
            
        }
        
        out.append(cont);
        
    }
}

function parseClasses(str) {
    
    var currSub = null;
    var subjects = [];
    
    var lines = str.split("\n");
    
    for(var i in lines) {
        var l = lines[i].trim();
        
        if(l.match(/^$/)) continue;
        
        var m = null;
        //               COMP   3711    - Software Project Management
        m = l.match(/^([A-Z]{4}\d{4})\s*-\s*(.*)/);
        if(m) {
          currSub = new Object();
          subjects.push(currSub);
          currSub.code = m[1];
          currSub.name = m[2];
          currSub.classes = [];
          continue;
        }
        
        m = l.match(/^Teaching Period\s*(.*)/);
        if(m) currSub.period = m[1];
        
        m = l.match(/^Status\s*(.*)/);
        if(m)currSub.status = m[1];
        
        m = l.match(/^Units\s*(.*)/);
        if(m) currSub.units = m[1];
        
        m = l.match(/^Campus\s*(.*)/);
        if(m) currSub.campus = m[1];
        
        //          Lecture   1UGA     Thu             3:00    PM     -         6:00   PM         1-6,7-12    Central Lecture Block 1
        m = l.match(/^(\w+)\s+(\w+)\s+(\w{3})\s+(\d{1,2}:\d{2}[AP]M)\s-\s(\d{1,2}:\d{2}[AP]M)\s+([\d,-]+)\s+(.*)/);
        if(m) {
          var c = {};
          c.type = m[1];
          c.day = m[3];
          c.startTime = m[4];
          c.endTime = m[5];
          c.weeks = m[6];
          c.location = m[7];
          currSub.classes.push(c);
        }
    }
      
    return subjects;
}