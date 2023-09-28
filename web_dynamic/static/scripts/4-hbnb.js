$(function () {
  makeRequest();
  const amenityDict = {};
  const amenityList = [];
  $(".amenities input").change(function () {
    const amenityId = $(this).attr("data-id");
    const amenityName = $(this).attr("data-name");
    if (this.checked) {
      if (!amenityList.includes(amenityId)) {
        //store the Aminity ID in a variable
        amenityDict[amenityId] = amenityName;
        amenityList.push(amenityName);
      }
    } else {
      //remove the Aminity ID from the varialbe
      if (amenityList.includes(amenityId)) {
        amenityList.splice(amenityList.indexOf(amenityName),1);
      }
    }
    //update h4 tag with the list of amenities checked
    const amenityText = amenityList.join(', ');
    $(".amenities h4").text(amenityText);
  });

  
  async function makeRequest() {
      const response = await fetch('http://localhost:5001/api/v1/status/');
      const code = response.status;
      if (code === 200) {
        const status = 'OK';
        $("div#api_status").prop("class", "available");
      } else {
          $("div#api_status").removeClass("available");
      }
    }
  
  $.ajax({
    url:'http://localhost:5001/api/v1/places_search/',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}),
    dataType: 'json',
    success: function(data) {
      // data is an array of place objects
      data.forEach(place => {
        const placeStr = `
        <article>
          <div class="title_box">
            <h2>${ place.name }</h2>
            <div class="price_by_night">$${ place.price_by_night }</div>
          </div>
          <div class="information">
            <div class="max_guest">${ place.max_guest } Guest${ place.max_guest !== 1 ? 's' : ''}</div>
            <div class="number_rooms">${ place.number_rooms } Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
            <div class="number_bathrooms">${ place.number_bathrooms } Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
          </div>
          <div class="description">
            ${ place.description }
          </div>
        </article>
        `
        $('.places').append(placeStr);
      });
    },
    })
    $.ajax({
      url: 'http://localhost:5001/api/v1/places_search/',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: Object.values(amenityDict) }),
      dataType: 'json',
      success: function (data) {
          const placesSection = $('.places');
          placesSection.empty();
          // data is an array of place objects
          data.forEach(place => {
              const placeStr = `
              <article>
                  <div class="title_box">
                      <h2>${place.name}</h2>
                      <div class="price_by_night">$${place.price_by_night}</div>
                  </div>
                  <div class="information">
                      <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                      <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                      <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                  </div>
                  <div class="description">
                      ${place.description}
                  </div>
              </article>
              `;
              $('.places').append(placeStr);
          });
      }
  });
})

