//test paragraph
// let paragraph = "Given an arbitrary text document written in English, write a program that will generate a concordance, i.e. an alphabetical list of all word occurrences, labeled with word frequencies. Bonus: label each word with the sentence numbers in which each occurrence appeared.";



wordCounter = (paragraph) => {
	let result = [];
	let sentenceArr = [];
	let sentenceStart = 0;
	for(i=0; i<paragraph.length; i++) { //create array of sentences, each element will be a single  sentence
		if(i == paragraph.length-1 || (paragraph[i] == "." && paragraph[i+1] == " " && paragraph[i+2] == paragraph[i+2].toUpperCase())){
			//what will toUpperCase do with non-letters
			//will need to deal with other sentence-ending punctuation (regex)
			sentenceArr.push(paragraph.substring(sentenceStart, i))
			sentenceStart = i+2;
			// console.log(sentenceArr)

		}
	}

	for(i=0; i<sentenceArr.length; i++) { //removes in-sentence punctuation, so I'm left with words separated only by spaces
		let currentString = sentenceArr[i].replace(/[:,]/g,'');
		// console.log(currentString)
		let arrOfWords = currentString.split(' '); //separate the word in string into an array, using space as delimiter
		// console.log(arrOfWords) 
		for(j=0; j<arrOfWords.length; j++) { //loop through arrOfWords
			let foundInArr = false; //check words first so it doesn't keep adding to the array
			for(k=0; k<result.length; k++) { //check if word already exists in result
				if(result[k].word == arrOfWords[j]){ //uptick the counter
					foundInArr = true;
					break;
				}
			}

			if(foundInArr) {
				result[k].occurences.push(i+1);				

			} else { //create new object in result array, if word doesn't exist in the result
				result.push(
					{
						word: arrOfWords[j],
						occurences: [i+1]
					}
				)
			}
		}
	}
	result.sort((compare1, compare2) => { //alphabetize the words, has objects so have to tell sort() how to sort
		if (compare1.word == compare2.word) {
			return 0;
		} else if (compare1.word.toUpperCase() < compare2.word.toUpperCase()){
			return -1;
		} else {
			return 1;
		}
	})
	for (i=0; i<result.length; i++) { //final result

		console.log(result[i].word + " " + result[i].occurences.length + ":" + result[i].occurences.join(", "))
	}

	// console.log(result);

}

// wordCounter(paragraph);


submitBtn = () => {
	let userParagraph = document.getElementById("para").value.trim();
	document.getElementById("submitBtn").addEventListener("click", wordCounter(userParagraph));
}



//to do
//*add more puntuation








