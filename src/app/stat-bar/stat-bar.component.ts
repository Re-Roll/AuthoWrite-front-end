import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-bar',
  templateUrl: './stat-bar.component.html',
  styleUrls: ['./stat-bar.component.css']
})
export class StatBarComponent {
  @Input() stat_name!: string;
  @Input() stat_known: number | undefined;
  @Input() stat_unknown: number | undefined;
  @Input() stat_prop!: number;
  @Input() tooltipContent!: string;

  // when component is create make stat_known and stat_unknown 2 decimal places
  ngOnInit() {
    if (this.stat_known) {
      this.stat_known = Number(this.stat_known?.toFixed(2));
    }
    if (this.stat_unknown) {
      this.stat_unknown = Number(this.stat_unknown?.toFixed(2));
    }
  }
}
