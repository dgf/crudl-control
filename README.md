[![build status](https://secure.travis-ci.org/dgf/crudl-control.png)](http://travis-ci.org/dgf/crudl-control)
# CRUDL now express - a websocket CRUD delegate

lifts a [crudl-model](http://github.com/dgf/crudl-model) to the web

    map = (person) -> name: person.name

    personCrudl = crudl db.Person, map, (p) -> _.extend map(p), id: term.id

    everyone.now.yourApp =

      # use direct delegate to prevent scope
      persons: personCrudl.all

      # or apply nowjs scope manually
      savePerson: (values, onSuccess) ->
        personCrudl.update.apply @, [values.id, values, onSuccess]
