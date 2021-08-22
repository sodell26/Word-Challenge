//test paragraph
let paragraph = "Given an arbitrary text document written in English, write a program that will generate a concordance, i.e. an alphabetical list of all word occurrences, labeled with word frequencies. Bonus: label each word with the sentence numbers in which each occurrence appeared.";

wordCounter = (paragraph) => {
	let sentenceArr = [];
	let sentenceStart = 0;
	for(i=0; i<paragraph.length; i++) { //create array of sentences, each element will be a single  sentence
		if(i == paragraph.length-1 || (paragraph[i] == "." && paragraph[i+1] == " " && paragraph[i+2] == paragraph[i+2].toUpperCase())){
			//what will toUpperCase do with non-letters
			//will need to deal with other sentence-ending punctuation
			sentenceArr.push(paragraph.substring(sentenceStart, i))
			sentenceStart = i+2;
			console.log(sentenceArr)
			
		}
	}
}

wordCounter(paragraph);