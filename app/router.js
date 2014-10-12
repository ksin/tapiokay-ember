import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('shops', { path: '/'}, function() {
    this.resource('shop', { path: '/shops/:id'}, function() {
    });
  });
});

export default Router;
