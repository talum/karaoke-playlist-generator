const billboard = require('billboard-top-100');

const BillboardClient = {
  getSongsAroundYear: function getSongsAroundYear(year) {
    const promises = [];
    for(let i = 3; i >= 0; i--) {
      promises.push(this.getSongsByYear(parseInt(year, 10) - i));
    }
    for(let i = 1; i <= 2; i++) {
      promises.push(this.getSongsByYear(parseInt(year, 10) + i));
    }
    // Add last week
    // handle case if grad year is current year and date is not in past

    return Promise.all(promises)
  },

  getSongsByYear: function getSongsByYear(year) {
    return new Promise((resolve, reject) => {
      billboard.getChart('hot-100', `${year}-05-11`, (err, chart) => {
        if (err) { return reject(err); }
        if (!chart) { return reject('Try again'); }
        resolve(chart.songs);
      });
    });
  }
}

module.exports = BillboardClient;
