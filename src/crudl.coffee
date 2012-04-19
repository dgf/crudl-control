class Crudl
#
  constructor: (@model, @tie, @detach) ->
    @table = @model.table

  # create and show an instance
  create: (client, cId, instance, onSuccess) ->
    console.log "#{cId}: create #{@table} instance #{instance.title}"
    success = (i) =>
      message = "#{cId}: #{@table} instance #{i.id} created"
      console.log message
      onSuccess message, @detach i
    error = (error) =>
      message = "#{@table} instance creation failed: #{error}"
      console.error "#{cId}: #{message}"
      client.alert message
    @model.create @tie(instance), success, error

  # update and show an instance
  update: (client, cId, id, values, onSuccess) ->
    console.log "#{cId}: update #{@table} instance #{id}"
    success = (i) =>
      message = "#{cId}: #{@table} instance #{i.id} updated"
      console.log message
      onSuccess message, @detach i
    error = (error) =>
      message = "#{@table} instance #{id} update failed: #{error}"
      console.error "#{cId}: #{message}"
      client.alert message
    @model.update id, @tie(values), success, error

  # delete an instance
  destroy: (client, cId, id, onSuccess) ->
    console.log "#{cId}: delete #{@table} instance #{id}"
    success = (i) =>
      message = "#{cId}: #{@table} instance #{i.id} deleted"
      console.log message
      onSuccess message, i.id
    error = (error) =>
      message = "#{@table} instance #{id} delete failed: #{error}"
      console.error "#{cId}: #{message}"
      client.alert message
    @model.destroy id, success, error

  # list all instances
  all: (client, cId, showList) ->
    console.log "#{cId} list #{@table}"
    success = (list) => showList (@detach i for i in list)
    error = (error) =>
      message = "#{@table} list failed: #{error}"
      console.error "#{cId}: #{message}"
      client.alert message
    @model.all success, error

  # list filtered instances
  #q = where: title: terms.API.title
  list: (client, cId, query, showList) ->
    console.log "#{cId} list #{@table}"
    success = (list) => showList (@detach i for i in list)
    error = (error) =>
      message = "#{@table} list failed: #{error}"
      console.error "#{cId}: #{message}"
      client.alert message
    @model.list query, success, error

module.exports = (model, tie, detach) ->
#
  crudl = new Crudl model, tie, detach

  create: (instance, onSuccess) ->
    crudl.create @now.client, @user.clientId, instance, onSuccess

  update: (id, values, onSuccess) ->
    crudl.update @now.client, @user.clientId, id, values, onSuccess

  destroy: (id, onSuccess) ->
    crudl.destroy @now.client, @user.clientId, id, onSuccess

  all: (showList) ->
    crudl.all @now.client, @user.clientId, showList

  list: (query, showList) ->
    crudl.list @now.client, @user.clientId, query, showList
