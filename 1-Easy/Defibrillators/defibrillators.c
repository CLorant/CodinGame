#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <math.h>

double formatLonLat(char *s);

int main()
{
    char userLonStr[51];
    scanf("%s", userLonStr);
    char userLatStr[51];
    scanf("%s", userLatStr);
    double userLon = formatLonLat(userLonStr);
    double userLat = formatLonLat(userLatStr);
    
    int n;
    scanf("%d", &n); fgetc(stdin);
    
    char closestDefibName[257];
    double minDistance = __DBL_MAX__;
    
    for (int i = 0; i < n; i++) {
        char currentDef[257];
        scanf("%[^\n]", currentDef); fgetc(stdin);
        
        char* c = strrchr(currentDef, ';');
        double defibLat = formatLonLat(c + 1);
        *c = ' ';
        c = strrchr(currentDef, ';');
        double defibLon = formatLonLat(c + 1);
        
        double x = (defibLon - userLon) * cos((userLat + defibLat) / 2);
        double y = defibLat - userLat;
        double distance = sqrt(pow(x, 2) + pow(y, 2)) * 6371;
        
        if (distance < minDistance) {
            minDistance = distance;
            char* defibName = strchr(currentDef, ';');
            *(strchr(++defibName, ';')) = 0;
            strcpy(closestDefibName, defibName);
        }
    }
    
    printf("%s\n", closestDefibName);
    
    return 0;
}

double formatLonLat(char *s){
    char* dot = strchr(s, ',');
    if (dot) {
        *dot = '.';
    }
    char *end;
    return strtod(s, &end);
}