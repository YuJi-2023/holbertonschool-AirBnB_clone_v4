$(function () {
  const amenityIdList = []
  $(".amenities input").change(function () {
    const amenityId = $(this).data("id")
    if (this.checked) {
      if (!amenityIdList.includes(amenityId)) {
        //store the Aminity ID in a variable
        amenityIdList.push(amenityId);
      }
    } else {
      //remove the Aminity ID from the varialbe
      if (amenityIdList.includes(amenityId)) {
        amenityIdList.splice(amenityIdList.indexOf(amenityId),1);
      }
    }
    //update h4 tag with the list of amenities checked
    const checkedAmenity = $(this).data("name")
    $(".amenities h4").text(checkedAmenity);
  });
});