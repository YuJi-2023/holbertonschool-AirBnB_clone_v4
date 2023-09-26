$(function () {
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
      if (amenityList.includes(amenityName)) {
        amenityList.splice(amenityList.indexOf(amenityName),1);
      }
    }
    //update h4 tag with the list of amenities checked
    const amenityText = amenityList.join(', ');
    $(".amenities h4").text(amenityText);
  });
});