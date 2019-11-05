const billboard = require('billboard-top-100');

const BillboardClient = {
  getSongsAroundYear: function getSongsAroundYear(year) {
    const promises = [];
    for(let i = 4; i >= 0; i--) {
      promises.push(this.getSongsByYear(parseInt(year, 10) - i));
    }
    for(let i = 1; i <= 2; i++) {
      promises.push(this.getSongsByYear(parseInt(year, 10) + i));
    }

    return Promise.all(promises)
  },

  getSongsByYear: function getSongsByYear(year) {
    return new Promise((resolve, reject) => {
      billboard.getChart('hot-100', `${year}-05-11`, (err, chart) => {
        if (err) { reject(err); }
        resolve(chart.songs);
      });
    });
  }
}

module.exports = BillboardClient;
