(function () {
  angular.module('PollsApp')
  .factory('Chart', function () {
    return {
      gendata : function (data) {
        var reduced = [[], []];

        data.forEach(function (e) {
          reduced[0].push(e.count);
          reduced[1].push(e.option);
        });

        return {
          data   : reduced[0],
          labels : reduced[1]
        };
      }
    };
  });
})();
