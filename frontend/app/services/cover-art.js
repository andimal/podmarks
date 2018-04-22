import Service from '@ember/service';

export default Service.extend({
  _covers: {
    'Do By Friday': 'https://overcast.fm/art?s=e889376c499829ced15403bf8b5631d5742fd0cc763198cd24583b00fd03d579&w=840&u=https%3A%2F%2Fmedia.simplecast.com%2Fpodcast%2Fimage%2F2389%2F1477090833-artwork.jpg',
    'Finely Tuned': 'https://overcast.fm/art?s=d073c76ffa3b3551a2e9d7dd423307412fe74efab5a3bcbf32743381cec2edbd&w=840&u=http%3A%2F%2Fi1.sndcdn.com%2Favatars-000318577763-eanoit-original.jpg',
    'Freakonomics Radio': 'https://overcast.fm/art?s=9997e8d65785c305a3966e92ae08f21384ad477d24580a447d20e4db3b01b3a4&w=840&u=https%3A%2F%2Fmedia2.wnyc.org%2Fi%2F1400%2F1400%2Fl%2F80%2F1%2FFreakonomics_WNYCStudios_1400_rsAKwzl.png',
    'Heavyweight': 'https://overcast.fm/art?s=0553f420e16fdff2a4ebbd5e23450fc1c71dca0026bca605ee1940c4a2802218&w=840&u=http%3A%2F%2Fstatic.megaphone.fm%2Fpodcasts%2F37595324-4dcc-11e6-8a94-1f35ab5d7e5c%2Fimage%2Fuploads_2F1517347279585-o4q7qicnkbk-e913d47f8e878d239c5364e4de1517b5_2F20171116_Heavyweight-ShowCover.png',
    'Lovett or Leave It': 'https://overcast.fm/art?s=4d883661c93c3bd89e01f7c030cb9a95b17ffaf4c9f3d31497849910ca5ddadb&w=840&u=https%3A%2F%2Fdfkfj8j276wwv.cloudfront.net%2Fimages%2F7d%2Fd3%2F42%2F05%2F7dd34205-80f1-4314-a6a0-bb6344571b75%2Fab8d54f67ad5958f1d81055cdae48e2b63743680294efc43a7baebbdb9f0ddca27dd7007b9b3188235ba17ff6aea5cdbbbb1ece1af4cd334d67c8dc53b011088.jpeg',
    'Outside Podcast': 'https://overcast.fm/art?s=cc52c9e1f53875ff8fbda008e29be750a08c532789e05ab7d14e7face369c240&w=840&u=https%3A%2F%2Fcdn-outside.prx.org%2Fwp-content%2Fuploads%2Foutside2000px.png',
    'Reconcilable Differences': 'https://overcast.fm/art?s=461b5072c1de9af098b2214a3a67533da052c784fca68a7dd6fb2fb3ba6391ba&w=840&u=http%3A%2F%2Frelayfm.s3.amazonaws.com%2Fuploads%2Fbroadcast%2Fimage%2F18%2Frd_artwork.png',
    'Reply All': 'https://overcast.fm/art?s=df8edeb30368711c8696c015ee03f1cc22bc7b0af21e6f1ebc335fb3ef25b82a&w=840&u=http%3A%2F%2Fstatic.megaphone.fm%2Fpodcasts%2F05f71746-a825-11e5-aeb5-a7a572df575e%2Fimage%2Fuploads_2F1516902193862-jqkml22bswo-cee641b4533ddb31a5a7ab656fe45116_2FCURRENT_Reply%252BAll%252BLogo.png',
    'Roderick on the Line': 'https://overcast.fm/art?s=ee83a45f85e500ec3cc7fbdc1cc0d3c015b87255dd8b5fbc85049b6e47463f39&w=840&u=http%3A%2F%2Fwww.merlinmann.com%2Fstorage%2Frotl%2Frotl-logo-300-sq.jpg',
    'The Dirtbag Diaries': 'https://overcast.fm/art?s=1e67541765d99c029f47fa9bcbf8d166bf79d68cc4141da65cd73fe09a0168b9&w=840&u=http%3A%2F%2Fstatic.libsyn.com%2Fp%2Fassets%2F6%2F1%2F5%2F2%2F6152910f7ac2a502%2F5point__flat.jpg',
    'The Itinerant Angler Podcast': 'https://overcast.fm/art?s=80fbc09127063f668130522a6f35464d455fc4f8ae21e959816e8abff0539890&w=840&u=http%3A%2F%2Fwww.itinerantangler.com%2Fpodcasts%2Fpodcastimage2.jpg',
    'The Orvis Fly Fishing Guide Podcast': 'https://overcast.fm/art?s=c22af83d121e883d6e175d542d336e27b5b3e99e15f467a6db7501b47c74917c&w=840&u=https%3A%2F%2Fassets.libsyn.com%2Fsecure%2Fshow%2F19754%2FFishing_itunes_cover_art.jpg',
    'Trail Runner Nation': 'https://overcast.fm/art?s=e3c8ab5f8e36d678744e15d852a961ca8a8a49f8715e1326ab635dbd8685bcda&w=840&u=http%3A%2F%2Fstatic.libsyn.com%2Fp%2Fassets%2F4%2F4%2Fa%2Ff%2F44af7fbe79e1e7ba%2Ftrn-logo-podcast-artwork.jpg',
    'You Look Nice Today': 'https://overcast.fm/art?s=c10bab50e652fac0bb9ef1f1fe4e3d5e6ca693742b65cb0a8b5eb3a5918171db&w=840&u=http%3A%2F%2Fwww.youlooknicetoday.com%2Ffiles%2Ffeed_media%2Fceph_300.jpg',
  },

  find(podcast) {
    return this._covers[podcast];
  }
});
