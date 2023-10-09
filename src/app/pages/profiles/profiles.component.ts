import { Component } from '@angular/core';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent {
  knownTexts: string[] = [];
  unknownFile: File[] = [];
  knownFiles: File[] = [];
  result!: number | 0;
  stats: any;

  onSingleFileChange(event: any) {
    for (const file of event.target.files) {
      this.unknownFile.push(file);
    }
  }

  onMultipleFileChange(event: any) {
    // push all files to knownFiles FileList
    for (const file of event.target.files) {
      this.knownFiles.push(file);
    }
  }

  onDeleteKnownFile(index: number): void {
    var knownFilesArray = Array.from(this.knownFiles);
    knownFilesArray.splice(index, 1);
    this.knownFiles = knownFilesArray;
  }

  onDeleteUnknownFile(index: number): void {
    this.unknownFile = [];
  }

  onDeleteKnownText(index: number): void {
    var knownTextsArray = Array.from(this.knownTexts);
    knownTextsArray.splice(index, 1);
    this.knownTexts = knownTextsArray;
  }

  addKnownText(): void {
    var knownText:string = (<HTMLTextAreaElement>(
      document.getElementById("knownText")
    )).value;

    if (knownText) {
      this.knownTexts.push(knownText);
      (<HTMLTextAreaElement>document.getElementById("knownText")).value = "";
    }
  }

  createProfile() {
    
  }
}
