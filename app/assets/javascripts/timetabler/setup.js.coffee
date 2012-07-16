$ ->

  if window.console is `undefined`
    window.console = log: (str) -> {}

  window.guid = ->
    (((1 + Math.random()) * 65536) | 0).toString(16).substring 1

  window.App = {}
  window.App.Util = {}

  _.extend Backbone.View::,
    renderButtons: ->
      @$("button").each (i, html) ->
        e = $(html)
        showText = e.attr("data-hidetext") isnt "true"
        settings = text: showText
        icon = e.attr("data-icon")
        settings.icons = secondary: "ui-icon-" + icon  if icon
        e.button settings

      @$(".buttonset").buttonset()

    renderEditables: (saveCallback) ->
      editMode = (event) ->
        label = $(event.currentTarget)
        input = label.next()
        input.val(label.hide().html()).show().select()

      viewModeKey = (event) ->
        viewMode event  if event.keyCode is 13

      viewMode = (event) ->
        input = $(event.currentTarget)
        label = input.prev()
        newVal = input.hide().val()
        label.html(newVal).show()
        obj = {}
        obj[label.attr("data-name")] = newVal
        saveCallback obj

      @$(".editable:not([data-editble])").each (i, html) ->
        label = $(html)
        label.attr("data-editble", 1).click editMode
        isInput = (label.attr("data-multiline") is `undefined`)
        edits = $("<" + (if isInput then "input" else "textarea") + "/>").addClass("edits").blur(viewMode).hide()
        edits.keyup viewModeKey  if isInput
        label.after edits

  console.log "setup complete."