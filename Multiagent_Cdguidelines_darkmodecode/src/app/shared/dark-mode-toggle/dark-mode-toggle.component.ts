import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-dark-mode-toggle',
  templateUrl: './dark-mode-toggle.component.html',
  styleUrls: ['./dark-mode-toggle.component.css']
})
export class DarkModeToggleComponent implements OnInit {
  isDarkMode: boolean;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.isDarkMode = this.getStoredThemePreference();
    this.applyTheme(this.isDarkMode);
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme(this.isDarkMode);
    this.storeThemePreference(this.isDarkMode);
  }

  private applyTheme(isDarkMode: boolean): void {
    if (isDarkMode) {
      this.renderer.addClass(document.body, 'dark-mode');
    } else {
      this.renderer.removeClass(document.body, 'dark-mode');
    }
  }

  private getStoredThemePreference(): boolean {
    const storedPreference = localStorage.getItem('darkMode');
    return storedPreference ? JSON.parse(storedPreference) : false;
  }

  private storeThemePreference(isDarkMode: boolean): void {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }
}
