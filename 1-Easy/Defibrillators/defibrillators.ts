class Defibrillator {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  lon: number;
  lat: number;

  // Earth's radius in kilometers
  private EARTH_RADIUS: number = 6371;

  // Replaces the comma with a decimal point and converts the string to a double
  static formatDouble(input: string): number {
      return parseFloat(input.replace(',', '.'))
  }

  // Finds the closest defibrillator based on the current location
  static getClosestDefib(currentLon: number, currentLat: number, defibCount: number): Defibrillator {
      let closestDefib: Defibrillator | null = null;
      let minDistance = Number.MAX_VALUE;

      for (let i = 0; i < defibCount; i++) {
          const currentDefib = new Defibrillator(readline());
          const distance = currentDefib.calculateDistance(currentLon, currentLat);

          if (distance < minDistance) {
              minDistance = distance;
              closestDefib = currentDefib;
          }
      }

      return closestDefib;
  }

  // Calculates the distance between the current location and the defibrillator
  private calculateDistance(currentLon: number, currentLat: number): number {
      const lonDifference = this.lon - currentLon;
      const latAverage = (this.lat + currentLat) / 2;

      const x = lonDifference * Math.cos(latAverage);
      const y = this.lat - currentLat;

      return Math.hypot(x, y) * this.EARTH_RADIUS;
  }

  constructor(line: string) {
      const inputs = line.split(';');
      this.id = parseInt(inputs[0]);
      this.name = inputs[1];
      this.address = inputs[2];
      this.phoneNumber = inputs[3];
      this.lon = Defibrillator.formatDouble(inputs[4]);
      this.lat = Defibrillator.formatDouble(inputs[5]);
  }
}

const currentLon = Defibrillator.formatDouble(readline());
const currentLat = Defibrillator.formatDouble(readline());
const defibCount = parseInt(readline());

const closestDefib = Defibrillator.getClosestDefib(currentLon, currentLat, defibCount);

console.log(closestDefib.name);