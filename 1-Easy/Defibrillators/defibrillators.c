#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <math.h>
#define EARTH_RADIUS 6371 // Earth's radius in kilometers

double formatDouble(char *s);
char* getClosestDefib(double currentLon, double currentLat, int defibCount);
double calculateDistance(double currentLon, double currentLat, double lon, double lat);

int main() {
    char currentLonStr[51];
    scanf("%s", currentLonStr);
    char currentLatStr[51];
    scanf("%s", currentLatStr);
    double currentLon = formatDouble(currentLonStr);
    double currentLat = formatDouble(currentLatStr);
    
    int defibCount;
    scanf("%d", &defibCount);
    fgetc(stdin);
    
    char* closestDefibName = getClosestDefib(currentLon, currentLat, defibCount);
    printf("%s\n", closestDefibName);

    free(closestDefibName);
    
    return 0;
}

// Replaces the comma with a decimal point and converts the string to a double
double formatDouble(char *s)
{
    char* dot = strchr(s, ',');
    if (dot) {
        *dot = '.';
    }
    char *end;
    return strtod(s, &end);
}

// Finds the closest defibrillator based on the current location
char* getClosestDefib(double currentLon, double currentLat, int defibCount)
{
    char* closestDefibName = (char*)malloc(257 * sizeof(char));
    if (closestDefibName == NULL) {
        exit(EXIT_FAILURE);
    }
    double minDistance = __DBL_MAX__;
    
    for (int i = 0; i < defibCount; i++) {
        char currentDef[257];
        scanf("%[^\n]", currentDef); fgetc(stdin);
        
        char* c = strrchr(currentDef, ';');
        double lat = formatDouble(c + 1);
        *c = ' ';
        c = strrchr(currentDef, ';');
        double lon = formatDouble(c + 1);
        
        double distance = calculateDistance(currentLon, currentLat, lon, lat);
        
        if (distance < minDistance) {
            minDistance = distance;
            char* defibName = strchr(currentDef, ';');
            *(strchr(++defibName, ';')) = 0;
            strcpy(closestDefibName, defibName);
        }
    }
    
    return closestDefibName;
}

// Calculates the distance between the current location and the defibrillator
double calculateDistance(double currentLon, double currentLat, double lon, double lat)
{
    double lonDifference = lon - currentLon;
    double latAverage = (lat + currentLat) / 2;

    double x = lonDifference * cos(latAverage);
    double y = lat - currentLat;

    return hypot(x, y) * EARTH_RADIUS;
}