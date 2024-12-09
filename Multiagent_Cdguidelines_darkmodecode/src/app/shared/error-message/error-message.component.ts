import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {
  @Input() errorMessage: string;
  @Input() display: boolean;

  constructor() { }

  ngOnInit(): void {
    this.initializeErrorMessage();
  }

  initializeErrorMessage(): void {
    if (!this.errorMessage) {
      this.errorMessage = 'An unexpected error occurred. Please try again later.';
    }
  }

  closeErrorMessage(): void {
    this.display = false;
  }
}
