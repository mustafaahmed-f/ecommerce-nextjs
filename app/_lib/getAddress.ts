import { getAddress } from "./APIs/geocodingAPI";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export async function getFullAddress() {
  const positionObj: any = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const { locality, city, postcode, countryName, latitude, longitude } =
    addressObj;
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in.
  // Payload of the FULFILLED state
  return {
    city,
    countryName,
    latitude,
    longitude,
    address,
  };
}
