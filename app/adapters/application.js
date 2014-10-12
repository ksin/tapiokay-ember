import config from '../config/environment';
import DS from 'ember-data';

export default DS.ActiveModelAdapter.extend({
  host: config.APP.SERVER,
  namespace: "api"
});