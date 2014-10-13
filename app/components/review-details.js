import Ember from 'ember';
import ObjectProxy from 'tapiokay-ember/mixins/proxy';

export default Ember.Component.extend(ObjectProxy, {
  model: Ember.computed.alias('content'),
  username: Ember.computed.alias('user.username'),

  bubbleRating: function() {
    return 'bubbles-' + this.get('rating');
  }.property('rating')
});