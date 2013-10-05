// ==UserScript==
// @name          darekagakakuPager
// @namespace     https://github.com/shikakun/darekagakakuPager.user.js
// @description   自分が書かなければおそらく誰かが書く日記のページャです
// @include       http://darekagakaku.herokuapp.com/v/*
// @require       http://code.jquery.com/jquery-1.10.2.min.js
// @grant         none
// ==/UserScript==
$(function() {
  var today = location.href.match(/(\d+)-(\d+)-(\d+)/);
  var day = time(today[1], today[2], today[3]);

  $('.content')
    .before("<nav class='nav'><a class='prev'></a><a class='next'></a></nav>");
  $('.nav')
    .css('height', '2em');
  $('.nav .prev')
    .attr('href', day.prevYear + '-' + day.prevMonth + '-' + day.prevDate)
    .html(day.prevYear + '年' + day.prevMonth + '月' + day.prevDate + '日')
    .css('float', 'left');
  $('.nav .next')
    .attr('href', day.nextYear + '-' + day.nextMonth + '-' + day.nextDate)
    .html(day.nextYear + '年' + day.nextMonth + '月' + day.nextDate + '日')
    .css('float', 'right');

  function time (year, month, date) {
    var todayTime = new Date(year, month - 1, date).getTime();
    var prevDateTime = todayTime - 60 * 60 * 24 * 1000;
    prevDateTime = new Date(prevDateTime);
    var nextDateTime = todayTime + 60 * 60 * 24 * 1000;
    nextDateTime = new Date(nextDateTime);
    return {
      prevYear: prevDateTime.getFullYear(),
      prevMonth: numSameLength(prevDateTime.getMonth() + 1, 2),
      prevDate: numSameLength(prevDateTime.getDate(), 2),
      nextYear: nextDateTime.getFullYear(),
      nextMonth: numSameLength(nextDateTime.getMonth() + 1, 2),
      nextDate: numSameLength(nextDateTime.getDate(), 2)
    }
  }

  function numSameLength (num, figures) {
    var num = String(num);
    while (num.length < figures) {
      num = "0" + num;
    }
    return num;
  }
});
