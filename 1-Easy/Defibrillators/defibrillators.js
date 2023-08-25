const formatLonLat = (input) => {
  return parseFloat(input.replace(',', '.'))
}

const formatDefibrillator = (line) => {
  // the id, address and the phoneNumber fields are not needed to complete the task
  // but are still stored due to being present in the input

  const inputs = line.split(';');

  // returns an object with corresponding properties
  return {
      id: inputs[0],
      name: inputs[1],
      address: inputs[2],
      phoneNumber: inputs[3],
      lon: formatLonLat(inputs[4]),
      lat: formatLonLat(inputs[5])
  }
}

const calculateDistance = (userLon, userLat, lon, lat) => {
  const x = (lon - userLon) * Math.cos((lat + userLat) / 2);
  const y = lat - userLat;
  return Math.sqrt(x ** 2 + y ** 2) * 6371;
}

const userLon = formatLonLat(readline());
const userLat = formatLonLat(readline());
const n = parseInt(readline());

let closestDef = null;
let minDistance = Number.MAX_VALUE;

for (let i = 0; i < n; i++) {
  let currentDef = formatDefibrillator(readline());
  let distance = calculateDistance(userLon, userLat, currentDef.lon, currentDef.lat);

  // minimum selection based on distance
  if (distance < minDistance)
  {
      minDistance = distance;
      closestDef = currentDef;
  }
}

console.log(closestDef.name);