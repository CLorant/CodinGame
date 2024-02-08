// Replaces the comma with a decimal point and converts the string to a double
function formatDouble(input) {
  return parseFloat(input.replace(',', '.'))
}

// Constructor like approach to create an object with properties
function formatDefib(line) {
  const inputs = line.split(';');

  return {
      id: inputs[0],
      name: inputs[1],
      address: inputs[2],
      phoneNumber: inputs[3],
      lon: formatDouble(inputs[4]),
      lat: formatDouble(inputs[5])
  }
}

const EARTH_RADIUS = 6371; // Earth's radius in kilometers

// Calculates the distance between the current location and the defibrillator
function calculateDistance(currentLon, currentLat, lon, lat) {
  const lonDifference = lon - currentLon;
  const latAverage = (lat + currentLat) / 2;

  const x = lonDifference * Math.cos(latAverage);
  const y = lat - currentLat;

  return Math.hypot(x, y) * EARTH_RADIUS;
}

// Finds the closest defibrillator based on the current location
function getClosestDefib(currentLon, currentLat, defibCount) {
  let closestDefib = null;
  let minDistance = Number.MAX_VALUE;

  for (let i = 0; i < defibCount; i++) {
      const currentDefib = formatDefib(readline());
      const distance = calculateDistance(currentLon, currentLat, currentDefib.lon, currentDefib.lat);

      if (distance < minDistance) {
          minDistance = distance;
          closestDefib = currentDefib;
      }
  }

  return closestDefib;
}

const currentLon = formatDouble(readline());
const currentLat = formatDouble(readline());
const defibCount = parseInt(readline());

const closestDefib = getClosestDefib(currentLon, currentLat, defibCount);

console.log(closestDefib.name);