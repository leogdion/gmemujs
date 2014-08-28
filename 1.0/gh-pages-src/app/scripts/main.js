'use strict';

require(['gmemujs', 'string', 'jquery', 'caolan/async', 'font!google,families:[Press+Start+2P]'], function (gmemujs, S, $, async) {
  var gameButtons = $('#games');
  $.get('games.csv', function (games) {
    async.map(S(games).lines(), function (line, cb) {
      cb(undefined, S(line).parseCSV(',', null, null));
    }, function (error, games) {
      async.each(games, function (game, cb) {
        gameButtons.append('<button type="button" data-href="nsf/' + game[1] + '" class="btn btn-default">' + game[0] + '</button>');
        cb();
      }, function () {
        var file;
        gameButtons.find('button').click(function () {
          var button = $(this);
          if (file) {
            gmemujs.play(file.track(11));
          } else {
            gmemujs.load($(this).data('href'), function (f) {
              file = f;
              button.css('background-color', '#FC0');
            });
          }
        });
      });
    });
  });
});