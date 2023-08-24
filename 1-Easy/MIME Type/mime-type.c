#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define MAX_EXT_LENGTH 10
#define MAX_MT_LENGTH 50
#define MAX_FILE_NAME_LENGTH 100
#define HASH_SIZE 10000

struct extMt {
    char ext[MAX_EXT_LENGTH];
    char mt[MAX_MT_LENGTH];
    struct extMt *next;
};

struct extMt *hashTable[HASH_SIZE];

// calculates the hash code of a string by summing the ASCII mt of it
unsigned int hash(char *str) {
    unsigned int hash = 0;
    while (*str) {
        hash = (hash * 31) + *str;
        str++;
    }
    return hash % HASH_SIZE;
}

void insertextMt(char *ext, char *mt) {
    struct extMt *newPair = (struct extMt *)malloc(sizeof(struct extMt));
    strcpy(newPair->ext, ext);
    strcpy(newPair->mt, mt);
    newPair->next = NULL;

    unsigned int h = hash(ext);

    // inserts it if it's not in the hash table, else it appends it to the end of the linked list
    if (!hashTable[h]) {
        hashTable[h] = newPair;
    }
    else {
        struct extMt *current = hashTable[h];
        while (current->next) {
            current = current->next;
        }
        current->next = newPair;
    }
}

// iterates through the hash table, returns the mt if the ext is found, otherwise it returns NULL
char* findmtByext(char *ext) {
    unsigned int h = hash(ext);
    struct extMt *current = hashTable[h];
    while (current) {
        if (strcmp(current->ext, ext) == 0) {
            return current->mt;
        }
        current = current->next;
    }
    return NULL;
}

int main() {
    int n, q;
    scanf("%d", &n);
    scanf("%d", &q);

    for (int i = 0; i < n; i++) {
        char ext[MAX_EXT_LENGTH];
        char mt[MAX_MT_LENGTH];
        scanf("%s %s", ext, mt);

        for (int j = 0; ext[j]; j++) {
            ext[j] = tolower(ext[j]);
        }

        insertextMt(ext, mt);
    }

    for (int i = 0; i < q; i++) {
        char fileName[MAX_FILE_NAME_LENGTH];
        scanf("%s", fileName);

        char *dotPosition = strrchr(fileName, '.');
        
        if (!dotPosition) {
            printf("UNKNOWN\n");
            continue;
        }

        char fileExtension[MAX_EXT_LENGTH];
        strcpy(fileExtension, dotPosition + 1);
        for (int j = 0; fileExtension[j]; j++) {
            fileExtension[j] = tolower(fileExtension[j]);
        }

        char *mt = findmtByext(fileExtension);
        if (mt) {
            printf("%s\n", mt);
        }
        else {
            printf("UNKNOWN\n");
        }
    }

    // Frees allocated memory
    for (int i = 0; i < HASH_SIZE; i++) {
        struct extMt *current = hashTable[i];
        while (current) {
            struct extMt *next = current->next;
            free(current);
            current = next;
        }
    }

    return 0;
}