
  module.exports = function(model, tie, detach) {
    return {
      create: function(instance, onSuccess) {
        var cId, client, error, success;
        cId = this.user.clientId;
        client = this.now.client;
        console.log("" + cId + ": create " + model.table + " instance " + instance.title);
        success = function(i) {
          var message;
          message = "" + cId + ": " + model.table + " instance " + i.id + " created";
          console.log(message);
          return onSuccess(message, detach(i));
        };
        error = function(error) {
          var message;
          message = "" + model.table + " instance creation failed: " + error;
          console.error("" + cId + ": " + message);
          return client.alert(message);
        };
        return model.create(tie(instance), success, error);
      },
      update: function(id, values, onSuccess) {
        var cId, client, error, success;
        cId = this.user.clientId;
        client = this.now.client;
        console.log("" + cId + ": update " + model.table + " instance " + id);
        success = function(i) {
          var message;
          message = "" + cId + ": " + model.table + " instance " + i.id + " updated";
          console.log(message);
          return onSuccess(message, detach(i));
        };
        error = function(error) {
          var message;
          message = "" + model.table + " instance " + id + " update failed: " + error;
          console.error("" + cId + ": " + message);
          return client.alert(message);
        };
        return model.update(id, tie(values), success, error);
      },
      "delete": function(id, onSuccess) {
        var cId, client, error, success;
        cId = this.user.clientId;
        client = this.now.client;
        console.log("" + cId + ": delete " + model.table + " instance " + id);
        success = function(i) {
          var message;
          message = "" + cId + ": " + model.table + " instance " + i.id + " deleted";
          console.log(message);
          return onSuccess(message, i.id);
        };
        error = function(error) {
          var message;
          message = "" + model.table + " instance " + id + " delete failed: " + error;
          console.error("" + cId + ": " + message);
          return client.alert(message);
        };
        return model["delete"](id, success, error);
      },
      list: function(showList) {
        var cId, client, error, success;
        cId = this.user.clientId;
        client = this.now.client;
        console.log("" + cId + " list " + model.table);
        success = function(list) {
          var i;
          return showList((function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = list.length; _i < _len; _i++) {
              i = list[_i];
              _results.push(detach(i));
            }
            return _results;
          })());
        };
        error = function(error) {
          var message;
          message = "" + model.table + " list failed: " + error;
          console.error("" + cId + ": " + message);
          return client.alert(message);
        };
        return model.all(success, error);
      }
    };
  };
