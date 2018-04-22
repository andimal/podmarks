import { computed, get } from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({
  podcasts: computed.mapBy('model', 'podcast'),
  uniquePods: computed('podcasts', function() {
    return this.get('podcasts').uniq();
  }),

  searchProperties: ['description', 'podcast', 'title', 'times'],

  testValue(value, query) {
    value = String(value).toLowerCase();
    return value.indexOf(query) !== -1;
  },

  filteredEpisodes: computed('model', 'filter', 'query', function() {
    let results = []

    if(this.get('filter')) {
      results = this.get('model').filterBy('podcast', this.get('filter'));
    }

    if(this.get('query')) {
      let collectionLength = this.get('model').length;
      let propertiesLength = this.get('searchProperties.length');

      for (let i = 0; i < collectionLength; i++) {
        let item = this.get('model').objectAt(i);

        if (propertiesLength) {
          for (let x = 0; x < propertiesLength; x++) {

            // nested description search for times
            if(this.get('searchProperties').objectAt(x) === 'times') {
              let times = get(item, this.get('searchProperties').objectAt(x));
              for (let y = 0; y < times.length; y++) {
                if (this.testValue(times[y].description, this.get('query'))) {
                  results.pushObject(item);
                  break;
                }
              }
            } else {
              let value = get(item, this.get('searchProperties').objectAt(x));

              if (this.testValue(value, this.get('query'))) {
                results.pushObject(item);
                break;
              }
            }
          }
        }
      }

    }

    if(!this.get('filter') && !this.get('query')) {
      results = this.get('model');
    }

    return results;
  }),

  actions: {
    filterByPod(pod) {
      if(this.get('filter') === pod) {
        this.set('filter', null);
      } else {
        this.set('filter', pod);
      }
    }
  }
});
