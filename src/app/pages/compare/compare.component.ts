import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";

type Score = {
  // initialise such that each stat is an array of length 
  w_sim: number[];
  punct_p: number[];
  avg_sent_l: number[];
  sent_over_avg: number[];
  sent_under_avg: number[];
  rare_word_p: number[];
  long_word_p: number[];
  words_over_avg: number[];
  words_under_avg: number[];
  ttr: number[];
  word_count: number[];
  score: number;
}

@Component({
  selector: "app-compare",
  templateUrl: "./compare.component.html",
  styleUrls: ["./compare.component.css"],
})
export class CompareComponent {
  STAT_NAMES: string[] = [
    "Word Similarity",
    "Punctuation Percentage",
    "Average Sentence Length",
    "Rare Word Percentage",
    "Long Word Percentage",
    "Type-Token Ratio",
    "Word Count",
  ];

  STAT_EXPLANATIONS: string[] = [
    `A score on how similar the distances between the words in the unknown text are to the distances of the known texts. 
    The closer the score is to 100, the more similar the words in the unknown text are to the words in the known texts.`,
    `The percentage of punctuations used per word compared between the unknown text and
    the average of the known texts`,
    `The average number of words in a sentence of the unknown text compared to the average of the known texts`,
    `Rare words are words used 2 or less times in a text. This stat is
    The percentage of rare words used in the unknown text compared to the average of the known texts`,
    `Long words are words with more than 6 characters. This stat is
    The percentage of long words used in the unknown text compared to the average of the known texts`,
    `Type-Token Ratio is the ratio of unique words in a text compared to the total number of words in the text.`,
    `The total number of words in the unknown text compared to the average total of the known texts`,
  ];

  knownTexts: string[] = [];
  unknownFile: File[] = [];
  knownFiles: File[] = [];
  result!: number | 0;
  resultText = "";
  stats: any;

  constructor(private http: HttpClient) {}

  onSingleFileChange(event: any) {
    for (const file of event.target.files) {
      this.unknownFile = [file];
    }
  }

  onMultipleFileChange(event: any) {
    // push all files to knownFiles FileList
    for (const file of event.target.files) {
      this.knownFiles.push(file);
    }
  }

  onDeleteKnownFile(index: number): void {
    const knownFilesArray = Array.from(this.knownFiles);
    knownFilesArray.splice(index, 1);
    this.knownFiles = knownFilesArray;
  }

  onDeleteUnknownFile(index: number): void {
    this.unknownFile = [];
  }

  onDeleteKnownText(index: number): void {
    const knownTextsArray = Array.from(this.knownTexts);
    knownTextsArray.splice(index, 1);
    this.knownTexts = knownTextsArray;
  }

  addKnownText(): void {
    const knownText:string = (<HTMLTextAreaElement>(
      document.getElementById("knownText")
    )).value;

    if (knownText) {
      this.knownTexts.push(knownText);
      (<HTMLTextAreaElement>document.getElementById("knownText")).value = "";
    }
  }

  sendPostRequest() {
    const URL = "http://3.27.45.50:5000/compare";
    const inputData = new FormData();

    // append files to inputData
    if (this.unknownFile) {
      inputData.append("unknown_file", this.unknownFile[0]);
    }

    for (const file of this.knownFiles) {
      inputData.append("known_files", file);
    }

    for (const knownText of this.knownTexts) {
      inputData.append("known_texts", knownText);
    }

    // get inputs from text areas into userInputs variables
    const knownText = (<HTMLTextAreaElement>(
      document.getElementById("knownText")
    )).value;
    const unknownText = (<HTMLTextAreaElement>(
      document.getElementById("unknownText")
    )).value;

    // append known text to known texts
    inputData.append("known_texts", knownText);
    inputData.append("unknown_text", unknownText);

    // Send post request to backend
    this.http.post<Score>(URL, inputData).subscribe(
        (response) => {
          this.result = response['score'];
          this.stats = Object.values(response);
          this.stats.pop();
          this.showResults();
        },
        (error) => {
          const error_message = error['error']['message'];
          // create popup box with error message
          alert(error_message);
        }
    );
  }

  showResults() {
    const results = (<HTMLDivElement> (document.getElementById("resultsDiv")))
    results.style.display = "block";
    results.scrollIntoView();
    document.documentElement.style.setProperty("--bar-value",  String((this.result/100) * 180) + "deg");
    this.setBarColour(this.result);
  }

  setBarColour(result: number) {
    if(result >= 70) {
      document.documentElement.style.setProperty("--bar-colour", "green");
      this.resultText = "The unknown text is very similar to the known texts in its writing style";
    }
    else if((result < 70) && (result > 40)) {
      document.documentElement.style.setProperty("--bar-colour", "orange");
      this.resultText = "The unknown text is somewhat similar to the known texts in its writing style";
    }
    else {
      document.documentElement.style.setProperty("--bar-colour", "red");
      this.resultText = "The unknown text is not similar to the known texts in its writing style";
    }
  }
}
