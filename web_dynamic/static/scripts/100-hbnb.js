$(document).ready(init);

const amenityObj = {};
const stateObj = {};
const cityObj = {};
let obj = {};


function checkObj (objects) {
  $('.amenities .popover input').change(() => {
    if ($(this).is(':checked')) {
      amenityObj[$(this).attr('data-name')] = $(this).attr('data-id');
    } else if ($(this).is(':not(:checked)')) {
      delete amenityObj[$(this).attr('data-name')];
    }
    const names = Object.keys(Obj);
    if (objects === 1) { 
      $('.amenities h4').text(names.sort().join(', '));
    } else if (objects === 2) {
      $('.locations h4').text(names.sort().join(', '));
    }
  });

function init () {
  $('.amenities .popover input').change(() => { obj = amenityObj; checkObjcall(this, 1); });
  $('.state_input').change(() =>{ obj = stateObj; checkObj.call(this, 2); });
  $('.city_input').change(() => { obj = cityObj; checkObj.call(this, 3); });
  apiStatus();
  fetchPlaces();
}


function apiStatus () {
  const API_URL = `http://0.0.0.0:5001/api/v1/status/`;
  $.get(API_URL, (data, textStatus) => {
    if (textStatus === 'success' && data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
}

function fetchPlaces () {
  const PLACES_URL = `http://0.0.0.0:5001/api/v1/places_search/`;
  $.ajax({
    url: PLACES_URL,
    type: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({
      amenities: Object.values(amenityObj),
      states: Object.values(stateObj),
      cities: Object.values(cityObj)}),
    success: function (response) {
      $('SECTION.places').empty();
      for (const r of response) {
        const article = ['<article>',
        '<div class="title_box">',
        `<h2>${r.name}</h2>`,
        `<div class="price_by_night">$${r.price_by_night}</div>`,
        '</div>',
        '<div class="information">',
        `<div class="max_guest">${r.max_guest} Guest(s)</div>`,
        `<div class="number_rooms">${r.number_rooms} Bedroom(s)</div>`,
        `<div class="number_bathrooms">${r.number_bathrooms} Bathroom(s)</div>`,
        '</div>',
        '<div class="description">',
        `${r.description}`,
        '</div>',
        '</article>'];
        $('SECTION.places').append(article.join(''));
      }
    },
    error: (error) => {
      console.log(error);
    }
  });
}
