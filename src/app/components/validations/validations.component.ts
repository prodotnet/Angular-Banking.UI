import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-validations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './validations.component.html',
  styleUrl: './validations.component.css'
})
export class ValidationsComponent {
  @Input() errorMessage: string[] | undefined;

}
