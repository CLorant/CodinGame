function permutate(arr, current = [], permutations = []) {
  // If the input array is empty, the base case for generating permutations has been reached
  if (arr.length === 0) {
      permutations.push([...current]);
  }
  else {
      for (let i = 0; i < arr.length; i++) {
          // Create a new array with the current element removed
          const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)];

          // Add the current element to the current permutation in progress
          const newCurrent = [...current, arr[i]];

          // Recursively generate permutations for the remaining elements
          permutate(remaining, newCurrent, permutations);
      }
  }
  return permutations;
}

function analyze(perm) {
  // Helper function to find the next substring to add to the current string
  const findNextSubstring = (str, target) => {
      let i;
      for (i = 0; i < str.length; i++) {
          // Check if the target substring is already in the current string
          if (str.indexOf(target) !== -1) {
              break;
          }

          // If not, check if a portion of the target can be appended to the current string
          else if (str.slice(i) === target.slice(0, str.length - i)) {
              str += target.slice(str.length - i);
              break;
          }
      }

      // If the target substring couldn't be added, append it to the current string
      return i === str.length ? str + target : str;
  }

  // Helper function to find the minimum length among all permutations
  const findMinLength = (arr) => {
      let minLen = Infinity;
      for (const current of arr) {
          let str = current[0];
          for (let i = 1; i < current.length; i++) {
              str = findNextSubstring(str, current[i]);
          }
          minLen = Math.min(str.length, minLen);
      }
      return minLen;
  }

  return findMinLength(perm);
}

const sequences = [];
const n = parseInt(readline());
for (let i = 0; i < n; i++) {
  sequences.push(readline());
}

console.log(analyze(permutate(sequences)));