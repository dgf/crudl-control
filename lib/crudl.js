(function() {
  var Crudl;

  Crudl = (function() {

    function Crudl(model, tie, detach) {
      this.model = model;
      this.tie = tie;
      this.detach = detach;
      this.table = this.model.table;
    }

    Crudl.prototype.create = function(client, cId, instance, onSuccess) {
      var error, success;
      var _this = this;
      console.log("" + cId + ": create " + this.table + " instance " + instance.title);
      success = function(i) {
        var message;
        message = "" + cId + ": " + _this.table + " instance " + i.id + " created";
        console.log(message);
        return onSuccess(message, _this.detach(i));
      };
      error = function(error) {
        var message;
        message = "" + _this.table + " instance creation failed: " + error;
        console.error("" + cId + ": " + message);
        return client.alert(message);
      };
      return this.model.create(this.tie(instance), success, error);
    };

    Crudl.prototype.update = function(client, cId, id, values, onSuccess) {
      var error, success;
      var _this = this;
      console.log("" + cId + ": update " + this.table + " instance " + id);
      success = function(i) {
        var message;
        message = "" + cId + ": " + _this.table + " instance " + i.id + " updated";
        console.log(message);
        return onSuccess(message, _this.detach(i));
      };
      error = function(error) {
        var message;
        message = "" + _this.table + " instance " + id + " update failed: " + error;
        console.error("" + cId + ": " + message);
        return client.alert(message);
      };
      return this.model.update(id, this.tie(values), success, error);
    };

    Crudl.prototype.destroy = function(client, cId, id, onSuccess) {
      var error, success;
      var _this = this;
      console.log("" + cId + ": delete " + this.table + " instance " + id);
      success = function(i) {
        var message;
        message = "" + cId + ": " + _this.table + " instance " + i.id + " deleted";
        console.log(message);
        return onSuccess(message, i.id);
      };
      error = function(error) {
        var message;
        message = "" + _this.table + " instance " + id + " delete failed: " + error;
        console.error("" + cId + ": " + message);
        return client.alert(message);
      };
      return this.model.destroy(id, success, error);
    };

    Crudl.prototype.all = function(client, cId, showList) {
      var error, success;
      var _this = this;
      console.log("" + cId + " list " + this.table);
      success = function(list) {
        var i;
        return showList((function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = list.length; _i < _len; _i++) {
            i = list[_i];
            _results.push(this.detach(i));
          }
          return _results;
        }).call(_this));
      };
      error = function(error) {
        var message;
        message = "" + _this.table + " list failed: " + error;
        console.error("" + cId + ": " + message);
        return client.alert(message);
      };
      return this.model.all(success, error);
    };

    Crudl.prototype.list = function(client, cId, query, showList) {
      var error, success;
      var _this = this;
      console.log("" + cId + " list " + this.table);
      success = function(list) {
        var i;
        return showList((function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = list.length; _i < _len; _i++) {
            i = list[_i];
            _results.push(this.detach(i));
          }
          return _results;
        }).call(_this));
      };
      error = function(error) {
        var message;
        message = "" + _this.table + " list failed: " + error;
        console.error("" + cId + ": " + message);
        return client.alert(message);
      };
      return this.model.list(query, success, error);
    };

    return Crudl;

  })();

  module.exports = function(model, tie, detach) {
    var crudl;
    crudl = new Crudl(model, tie, detach);
    return {
      create: function(instance, onSuccess) {
        return crudl.create(this.now.client, this.user.clientId, instance, onSuccess);
      },
      update: function(id, values, onSuccess) {
        return crudl.update(this.now.client, this.user.clientId, id, values, onSuccess);
      },
      destroy: function(id, onSuccess) {
        return crudl.destroy(this.now.client, this.user.clientId, id, onSuccess);
      },
      all: function(showList) {
        return crudl.all(this.now.client, this.user.clientId, showList);
      },
      list: function(query, showList) {
        return crudl.list(this.now.client, this.user.clientId, query, showList);
      }
    };
  };

}).call(this);
