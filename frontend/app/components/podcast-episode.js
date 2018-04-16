import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  coverArt: service(),
  classNames: ['podcast-episode card'],

  art: computed('episode.title', function() {
    const image = this.get('coverArt').find(this.get('episode.podcast'));
    if(image) return image;
    return 'https://picsum.photos/150/100/?blur';
  }),

  sortedTimes: computed('episode.times', function() {
    return this.get('episode.times').sortBy('time');
  }),
});
