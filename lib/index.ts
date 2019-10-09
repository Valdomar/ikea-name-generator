import AlphabetSoup from "./utils/Alphabet";

//===== FUNCTIONS THAT GET THE NEXT LETTER
// Get any letter from alphabet
function grabAnyLetter(): string {
  let grabAlphabet: Array<string> = AlphabetSoup.wholeAlphabet();
  return grabAlphabet[Math.floor(Math.random() * grabAlphabet.length)]
}
// Get just a vowel
function grabAVowel(): string {
  let grabAlphabet: Array<string> = AlphabetSoup.justVowels();
  return grabAlphabet[Math.floor(Math.random() * grabAlphabet.length)]
}
// Get just a consonant
function grabAConsonant(): string {
  let grabAlphabet: Array<string> = AlphabetSoup.justConsonants();
  return grabAlphabet[Math.floor(Math.random() * grabAlphabet.length)]
}
// Get a letter than can follow the last letter
function grabNextGoodLetter(word: string): string {
  const lastLetter: string = word[word.length - 1];
  const methodName: string = 'after' + lastLetter;
  let grabAlphabet: Array<string> = AlphabetSoup[methodName]();
  return grabAlphabet[Math.floor(Math.random() * grabAlphabet.length)];
}
//===== END FUNCTIONS THAT GET NEXT LETTER

// Main function to get and return the next letter
function returnNextLetter(word: string): string {
  let nextLetter: string;
  let numVowels: number = 0;
  let numConsonants: number = 0;

  // If it's the first letter, grab any letter
  if (word.length === 0) {
    nextLetter = grabAnyLetter();
    // If it's not the first letter...
    // And there are too many consonants before it, grab a vowel
    // Or it's the second letter and the first wasn't a vowel (this makes sure there's a vowel in the first two letters for readability)
  } else if (numConsonants === 2 || (word.length === 1 && numConsonants === 1)) {
    nextLetter = grabAVowel();
    // Or if there are too many vowels grab a consonant
  } else if (numVowels === 2) {
    nextLetter = grabAConsonant();
    // Otherwise, grab the next acceptable letter
  } else {
    nextLetter = grabNextGoodLetter(word);
  }
  // Increase/reset consonant and vowel counters appropriately
  if (AlphabetSoup.justVowels().indexOf(nextLetter) != -1) {
    numConsonants = 0;
    numVowels += 1;
  } else {
    numConsonants += 1;
    numVowels = 0;
  }
  return nextLetter;
}

/**
* @Method: Return a ikea style name.
* @Param {boolean}
* @Return {string}
*/
export function getName(withSwedishCharacters: boolean = true): string {
  // Pick random word length between 3 and 9 characters
  const wordLength: number = Math.floor(Math.random() * 6) + 3;
  let word: string = '';

  // Generate each letter wordLength times
  for (let arrayIndex = 0; arrayIndex < wordLength; arrayIndex++) {
    word += returnNextLetter(word);
  }

  // Checks if word ended with two consonants. For readability, end with an extra vowel
  let lastLetters: string = word.slice(-2);
  if (!AlphabetSoup.justVowels().indexOf(lastLetters[0]) && !AlphabetSoup.justVowels().indexOf(lastLetters[1])) {
    word += grabAVowel();
  }

  if (withSwedishCharacters) {
    // Format name to add Swedish characters if possible
    // 50/50 chance of changing first a
    let coinToss = Math.random() < 0.5;
    if (coinToss) word = word.replace("a", "å")
    // 50/50 chance of changing first o
    coinToss = Math.random() < 0.5;
    if (coinToss) word = word.replace("o", "ö");
  }

  return word;
}