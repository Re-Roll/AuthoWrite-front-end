import { Component } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent {
  max_circle_size: number = 100;
  min_circle_size: number = 20;
  circles: { size: number; x: number; y: number }[] = [];

  constructor() {
    // Initialize an array of circles with initial sizes and positions
    for (let i = 0; i < 25; i++) {
      for (let j = 0; j < 15; j++) {
        this.circles.push({ size: this.min_circle_size, 
          x: (i*this.max_circle_size)+(this.max_circle_size/2), 
          y: (j*this.max_circle_size)+(this.max_circle_size) }); // Initial size and position
      }
    }
  }

  onMouseMove(event: MouseEvent): void {
    // Calculate the new size for each circle based on cursor distance
    this.circles.forEach((circle) => {
      const distance = this.getDistance(event, circle);
      // You can adjust the size change factor for your needs
      circle.size = Math.max((this.max_circle_size - distance / 10), 20); // Adjust the factor as needed
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
