import Ember from 'ember';

export default Ember.ObjectController.extend({
  fields: {},

  actions: {

    createShop: function() {
      var self = this;
      var fields = this.get('fields');

      // uncomment once there are more guards. don't want to so easily create shops in the server

      // var shop = this.store.createRecord('shop', fields);
      // shop.save().then(function(shop) {
      //   self.transitionToRoute('shop', shop);
      // });

    }

  }

});