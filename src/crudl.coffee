
module.exports = (model, tie, detach) ->

  # create and show an instance
  create: (instance, onSuccess) ->
    cId = @user.clientId
    client = @now.client
    console.log "#{cId}: create #{model.table} instance #{instance.title}"

    success = (i) ->
      message = "#{cId}: #{model.table} instance #{i.id} created"
      console.log message
      onSuccess message, detach i
    error = (error) ->
      message = "#{model.table} instance creation failed: #{error}"
      console.error "#{cId}: #{message}"
      client.alert message
    model.create tie(instance), success, error

  # update and show an instance
  update: (id, values, onSuccess) ->
    cId = @user.clientId
    client = @now.client
    console.log "#{cId}: update #{model.table} instance #{id}"

    success = (i) ->
      message = "#{cId}: #{model.table} instance #{i.id} updated"
      console.log message
      onSuccess message, detach i
    error = (error) ->
      message = "#{model.table} instance #{id} update failed: #{error}"
      console.error "#{cId}: #{message}"
      client.alert message
    model.update id, tie(values), success, error

  # delete an instance
  delete: (id, onSuccess) ->
    cId = @user.clientId
    client = @now.client
    console.log "#{cId}: delete #{model.table} instance #{id}"

    success = (i) ->
      message = "#{cId}: #{model.table} instance #{i.id} deleted"
      console.log message
      onSuccess message, i.id
    error = (error) ->
      message = "#{model.table} instance #{id} delete failed: #{error}"
      console.error "#{cId}: #{message}"
      client.alert message
    model.delete id, success, error

  # list all instances
  list: (showList) ->
    cId = @user.clientId
    client = @now.client
    console.log "#{cId} list #{model.table}"

    success = (list) -> showList (detach i for i in list)
    error = (error) ->
      message = "#{model.table} list failed: #{error}"
      console.error "#{cId}: #{message}"
      client.alert message

    model.all success, error
