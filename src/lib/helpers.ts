import { writeFile } from "fs/promises";
import { words } from "./dictionary";

/**
 * Word matcher algorithm
 * 
 * Returns a list of words, which are possible to create based
 * on the characters passed through the function
 * 
 * @param characters    - String of characters to make words from 
 * @returns             - Returns an array of possible words
 */
export const executeAlgorithm = ( characters: string ) => {
    const possibleCombinations: string[] = [];
    const wordsFilteredByLength = words.filter(word => word.length >= 3 && word.length <= characters.length);
    
    const result = wordsFilteredByLength.find(word => word.toLowerCase() === 'echte');

    WORDS_LOOP:
    for( const word of wordsFilteredByLength ) {
        let currentCharSet = characters.split('');
        let currentWord = word.split('');

        for( let i = 0;i < currentCharSet.length;i++ ) {
            if( i >= word.length ) {
                /**
                 * Continue to next word in dictionary when we exceed current word length
                 */
                continue WORDS_LOOP;
            }
            
            for( let iw = 0;iw < word.length;iw++ ) {
                if( currentCharSet.includes( word[iw] ) ) {
                    const currentCharSetIndex = currentCharSet.indexOf( word[iw] );
                    const currentWordIndex = currentWord.indexOf( word[iw] );

                    // Remove char from both word lists
                    currentCharSet.splice( currentCharSetIndex, 1 );
                    currentWord.splice( currentWordIndex, 1 );
                } else {
                    /**
                     * Continue to next word in dictionary when we cant find next letter in word
                     */
                    continue WORDS_LOOP;
                }
                
                // If all chars matched, we should have an empty array
                // This means it is possible to make this word with the
                // input of `characters`
                if( currentWord.length === 0 ) {
                    if( ! possibleCombinations.includes( word ) ) {
                        possibleCombinations.push( word )
                    }
                }
            }
        }
    }

    return possibleCombinations;
}

/**
 * Alias for `executeAlgorithm`
 * 
 * @param string    - String of characters to make words from 
 * @returns         - Returns an array of possible words
 */
export function getWords( string: string ) {
    return executeAlgorithm( string );
}

/**
 * **! ! Only user this during development ! !**
 * 
 * This fetches the latest version of the *opentaal* dictionary
 * It creates an `array` of words and stores this inside
 * a TypeScript file at the root location of the project.
 * 
 * Make sure you run this function server side!
 * 
 * @private
 * @internal
 */
export const getLatestDictionary = async () => {
    const request = await fetch('https://raw.githubusercontent.com/OpenTaal/opentaal-wordlist/master/wordlist.txt');
    const response = await request.text();
    const words = response.split(/\n/);

    await writeFile('./src/lib/dictionary.ts', `export const words = ${JSON.stringify(words)}`);

    console.log(words);
}