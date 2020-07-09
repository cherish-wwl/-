// Weather API sample javascript code
// Requires: jQuery and crypto-js (v3.1.9)
//
// Copyright 2019 Oath Inc. Licensed under the terms of the zLib license see https://opensource.org/licenses/Zlib for terms.

var url = "https://weather-ydn-yql.media.yahoo.com/forecastrss";
var method = "GET";
var app_id = "nSaZy954";
var consumer_key =
  "dj0yJmk9S2JFWHUyVUNheDlrJmQ9WVdrOWJsTmhXbms1TlRRbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWY0";
var consumer_secret = "694888415c6f1aef4fa1d72b253cfbabf861807f";
var concat = "&";
var query = { location: "sunnyvale,ca", format: "json" };
var oauth = {
  oauth_consumer_key: consumer_key,
  oauth_nonce: Math.random().toString(36).substring(2),
  oauth_signature_method: "HMAC-SHA1",
  oauth_timestamp: parseInt(new Date().getTime() / 1000).toString(),
  oauth_version: "1.0",
};


var merged = {};
$.extend(merged, query, oauth);
// Note the sorting here is required
var merged_arr = Object.keys(merged)
  .sort()
  .map(function (k) {
    return [k + "=" + encodeURIComponent(merged[k])];
  });
var signature_base_str =
  method +
  concat +
  encodeURIComponent(url) +
  concat +
  encodeURIComponent(merged_arr.join(concat));

var composite_key = encodeURIComponent(consumer_secret) + concat;
var hash = CryptoJS.HmacSHA1(signature_base_str, composite_key);
var signature = hash.toString(CryptoJS.enc.Base64);

oauth["oauth_signature"] = signature;
var auth_header =
  "OAuth " +
  Object.keys(oauth)
    .map(function (k) {
      return [k + '="' + oauth[k] + '"'];
    })
    .join(",");

$.ajax({
  url: url + "?" + $.param(query),
  headers: {
    Authorization: auth_header,
    "X-Yahoo-App-Id": app_id,
  },
  method: "GET",
  success: function (data) {
    // console.log(data);
    initSwiper(data.forecasts);
  },
});

function initSwiper(data) {
  var toHtml = function (item, index) {
    return (
      '<div class="swiper-slide">' +
      '<img class="s_bg" src="./images/s_bg_0' +
      index +
      '.jpg" />' +
      '<div class="mask">' +
      '<div class="icon"></div>' +
      '<div class="day">' +
      item.day +
      "</div>" +
      '<div class="text">' +
      item.text +
      "</div>" +
      '<div class="range">' +
      item.low +
      "~" +
      item.high +
      "</div>" +
      "</div>" +
      "</div>"
    );
  };
  var result = "";
  (data || []).forEach(function (item, index) {
    var count = (index + 1) % 6;
    result += toHtml(item, count);
  });

  $("#swiper-area").empty();
  $("#swiper-area").html(result);
  var swiper = new Swiper(".swiper-container", {
    slidesPerView: "auto",
    spaceBetween: 10,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
  });
}
$(document).ready(function () {
  $("#search").click(function(){
    alert("please waiting")
  })
});
