import DS from 'ember-data';
import ENV from 'podmarks/config/environment';

export default DS.JSONAPIAdapter.extend({
  host: ENV.apiHost,
  namespace: 'api',
});
