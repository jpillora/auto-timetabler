###
//@project: Auto-Timetabler
//@author: jpillora
//@date: 15/6/2012
//App classes
###
$ ->
  log = (str) ->
    console.log "App: " + str

  class window.AppView extends Backbone.View
    el: $("#app")
    events:
      "click #createSub": "createOne"
      "click #removeSubs": "removeAll"

    initialize: ->
      window.subjects.bind "add", @addOne, this
      window.subjects.bind "reset", @addAll, this
      window.subjects.bind "all", @render, this
      window.subjects.fetch()

    render: ->
      log "Render View"
      @renderButtons()

    addOne: (subject) ->
      view = new SubjectView(model: subject)
      e = view.render().$el.hide().delay(100).slideDown("slow")
      @$("#subject-list").append e

    addAll: ->
      window.subjects.each @addOne

    createOne: ->
      log "Create one Subject"
      window.subjects.create
        name: "subject-" + window.guid()
      ,
        wait: true

    removeAll: ->
      window.subjects.first().clear()  while window.subjects.length
  
  window.appView = new AppView()