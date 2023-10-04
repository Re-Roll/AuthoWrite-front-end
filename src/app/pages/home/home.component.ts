import { Component, HostListener } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  max_circle_size: number = 90;
  min_circle_size: number = 10;
  circles: { size: number; x: number; y: number }[] = [];

  constructor() {
    this.updateCircleGrid();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.updateCircleGrid();
  }

  private updateCircleGrid(): void {
    // Get the updated width and height of the window
    const width: number = window.innerWidth;
    const height: number = window.innerHeight;

    // Calculate the number of circles in rows and columns based on the window size
    const circles_row: number = Math.floor(width / this.max_circle_size);
    const circles_col: number = Math.floor(height / this.max_circle_size);

    // Clear the existing circles and create the new grid
    this.circles = [];

    for (let i = 0; i < circles_row; i++) {
      for (let j = 0; j < circles_col; j++) {
        this.circles.push({
          size: this.min_circle_size,
          x: (i * this.max_circle_size) + (this.max_circle_size / 2),
          y: (j * this.max_circle_size),
        });
      }
    }
  }

  onMouseMove(event: MouseEvent): void {
    // Calculate the new size for each circle based on cursor distance
    this.circles.forEach((circle) => {
      const distance = this.getDistance(event, circle);
      // You can adjust the size change factor for your needs
      circle.size = Math.max((this.max_circle_size - distance / 10), this.min_circle_size); // Adjust the factor as needed
    });
  }

  private getDistance(event: MouseEvent, circle: { size: number, x: number, y: number }): number {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const deltaX = mouseX - circle.x;
    const deltaY = mouseY - circle.y;

    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  }

}