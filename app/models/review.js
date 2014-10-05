import DS from 'ember-data';

export default DS.Model.extend({
  rating: DS.attr('number'),
  description: DS.attr('string'),
  user: DS.belongsTo('user'),
  shop: DS.belongsTo('shop')
});