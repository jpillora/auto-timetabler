###
//@project: Auto-Timetabler
//@author: jpillora
//@date: 15/6/2012
//Class classes
###
$ ->
  log = (cl, str) ->
    console.log "Class: " + cl.id + ": " + str

  class window.Class extends Backbone.Model
    initialize: ->
      @set name: @id
      @set location: "PLACE"
      @set start: "07:00"
      @set end: "11:00"
      log this, "New!"

    clear: (opts) ->
      @destroy opts
  
  class window.ClassList extends Backbone.Collection
    model: Class
    initialize: ->
  
  class window.ClassView extends Backbone.View
    tagName: "tr"
    template: _.template($("#class-template").html())
    events:
      "click .remove": "clear"

    initialize: ->
      _.bindAll this
      @model.bind "change", @render, this
      @model.bind "destroy", @animRemove, this

    render: ->
      @$el.html @template(@model.toJSON())
      @renderButtons()
      this

    clear: (e) ->
      e.stopImmediatePropagation()
      log @model, "Removed!"
      @model.clear()

    animRemove: ->
      @$el.find(">td>div").slideUp "slow", ->
        $(this).remove()
  