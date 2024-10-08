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
  })