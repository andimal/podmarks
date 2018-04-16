import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),
  podcast: DS.attr('string'),
  times: DS.attr(),
  title: DS.attr('string'),
  url: DS.attr('string'),
});
