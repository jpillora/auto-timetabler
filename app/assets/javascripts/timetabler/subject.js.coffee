###
//project: Auto-Timetabler
//@author: jpillora
//@date: 15/6/2012
//Subject classes
###
$ ->
  log = (sub, str) ->
    console.log "Subject: " + sub.id + ": " + str

  class window.Subject extends Backbone.Model
    initialize: ->
      @set summary: "COMP9321 Web Applications"  unless @get("summary")
      @set description: "An interesting course on the interwebs."  unless @get("description")
      @classes = new ClassList()
      @classes.localStorage = new Store("class-backbone-from-" + @get("name"))

    clear: (opts) ->
      @classes.first().clear silent: true  while @classes.length
      @destroy opts
  
  class window.SubjectList extends Backbone.Collection
    model: Subject
    initialize: -> {}
    localStorage: new Store("subject-backbone")
  
  window.subjects = new SubjectList
  
  class window.SubjectView extends Backbone.View
    tagName: "div"
    subjectTemplate: _.template($("#subject-template").html())
    classHeadingTemplate: _.template($("#class-heading-template").html())
    events:
      "click .remove": "clear"
      "click .create": "createOne"

    initialize: ->
      _.bindAll this
      @model.bind "change", @render, this
      @model.bind "destroy", @animRemove, this
      @model.classes.bind "add", @addOne, this
      @model.classes.bind "reset", @addAll, this
      @editor = @$(".edit").hide()
      @classTable = $("<table/>").append(@classHeadingTemplate())
      @model.classes.fetch()

    render: ->
      log @model, "Render View"
      @$el.addClass "subject"
      @$el.html @subjectTemplate(@model.toJSON())
      @$(".list").append @classTable
      @renderButtons()
      @renderEditables @saveEditables
      this

    addOne: (cl) ->
      v = new ClassView(model: cl)
      e = v.render().$el
      e.find(">td>div").hide()
      @classTable.append e
      e.find(">td>div").slideDown "slow"

    addAll: ->
      @model.classes.each @addOne

    createOne: ->
      log @model, "Create one Class"
      @model.classes.create
        location: "class-from-" + @model.get("name")
      ,
        wait: true

    saveEditables: (obj) ->
      log @model, "Save to model: " + JSON.stringify(obj)
      @model.save obj

    clear: (e) ->
      log @model, "Remove"
      e.stopImmediatePropagation()
      @model.clear()

    animRemove: ->
      @$el.slideUp "slow", ->
        $(this).remove()
  