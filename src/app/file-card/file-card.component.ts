import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-file-card',
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.css']
})
export class FileCardComponent {
  @Input() file!: File | string;
  @Input() name!: string;
  @Input() index!: number;
  @Output() delete = new EventEmitter<number>();

  deleteFile(): void {
    this.delete.emit(this.index);
  }
}