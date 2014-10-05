import { default as JsonApiAdapter } from 'json_api_adapter';
import config from '../config/environment';

export default JsonApiAdapter.extend({
  host: config.APP.SERVER,
  namespace: "api"
});