const formatLonLat = (input: string): number => {
  return parseFloat(input.replace(',', '.'))
}

class Defibrillator {
  // the id, address and the phoneNumber fields are not needed to complete the task
  // but are still stored due to being present in the input

  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  lon: number;
  lat: number;

  calculateDistance(userLon, userLat) {
      const x = (this.lon - userLon) * Math.cos((this.lat + userLat) / 2);
      const y = this.lat - userLat;
      return Math.sqrt(x ** 2 + y ** 2) * 6371;
  }

  constructor(line: string) {
      const inputs: string[] = line.split(';');
      this.id = parseInt(inputs[0]);
      this.name = inputs[1];
      this.address = inputs[2];
      this.phoneNumber = inputs[3];
      this.lon = formatLonLat(inputs[4]);
      this.lat = formatLonLat(inputs[5]);
  }
}

const userLon: number = formatLonLat(readline());
const userLat: number = formatLonLat(readline());
const n: number = parseInt(readline());

let closestDef: Defibrillator = null;
let minDistance = Number.MAX_VALUE;

for (let i = 0; i < n; i++) {
  const currentDef: Defibrillator = new Defibrillator(readline());
  const distance: number = currentDef.calculateDistance(userLon, userLat);

  // minimum selection based on distance
  if (distance < minDistance) {
      minDistance = distance;
      closestDef = currentDef;
  }
}

console.log(closestDef.name);