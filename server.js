wordCounter = (orgParagraph) => {
	let paragraph = orgParagraph.replace(/[\r\n]+/g," "); //remove line breaks first
	let result = [];
	let sentenceArr = [];
	let sentenceStart = 0;
	for(i=0; i<paragraph.length; i++) { //create array of sentences, each element will be a single  sentence
		if(i == paragraph.length-1 || ((paragraph[i] == "." || paragraph[i] == "?" || paragraph[i] == "!") && paragraph[i+1] == " " && paragraph[i+2] == paragraph[i+2].toUpperCase())){ //checks if i is either the string end or theres a combo of a sentence-ending punctuation, space, and capital letter
			sentenceArr.push(paragraph.substring(sentenceStart, i)) //if combo exists, put string from the start, to character before i (ending punctuation) as it's own element in sentenceArr
			sentenceStart = i+2; //sentence start will now be the capital letter from the combo
		}
	}

	for(i=0; i<sentenceArr.length; i++) { //removes in-sentence punctuation, so I'm left with words separated only by spaces
		let currentString = sentenceArr[i].replace(/[,:;@#$%&*()"']/gi,''); //regex to check for special characters, I didn't want to use the regex for all special characters as it removes the "." from "i.e."

		let arrOfWords = currentString.split(' '); //separate the word in string into an array, using space as delimiter

		for(j=0; j<arrOfWords.length; j++) { //loop through arrOfWords
			let foundInArr = false; //setting up boolean for checking if words first, so it doesn't keep adding to the array
			for(k=0; k<result.length; k++) { //loop to check if word already exists in result
				if(result[k].word == arrOfWords[j]){ //if word exists, add occurence, but don't add word to array
					foundInArr = true;
					break;
				}
			}

			if(foundInArr) { //word exists condition
				result[k].occurences.push(i+1);	//using i+1 since i could be 0			

			} else { //if word doesn't exist in the result, create new object in result array
				result.push(
					{
						word: arrOfWords[j],
						occurences: [i+1]
					}
				)
			}
		}
	}

	result.sort((compare1, compare2) => { //alphabetize the words, result has objects so have to tell sort() how to sort
		if (compare1.word == compare2.word) {
			return 0;
		} else if (compare1.word.toLowerCase() < compare2.word.toLowerCase()){
			return -1;
		} else {
			return 1;
		}
	})

	for (i=0; i<result.length; i++) { //final result that's sent to HTML

		let olList = document.getElementById("listOfWords"); //reference ol on HTML
		addListItem = document.createElement("li"); //create the li that will have the result info added to it

		newListItem = document.createTextNode(result[i].word.toLowerCase() + " {" + result[i].occurences.length + ":" + result[i].occurences.join(", ") + "}"); //creae the text for the li
		addListItem.appendChild(newListItem); //add the text to the li
		olList.appendChild(addListItem);// add the li to the ol
	}


}



submitBtn = () => { //function to run wordCounter() when user clicks "Organize!" button
	document.getElementById("listOfWords").innerHTML = "";
	let userParagraph = document.getElementById("para").value.trim();
	document.getElementById("submitBtn").addEventListener("click", wordCounter(userParagraph));
}

clearBtn = () => { //function to clear text box and ol when user clicks "clear" button
	document.getElementById("listOfWords").innerHTML = "";
	document.getElementById("para").value = "";
}










