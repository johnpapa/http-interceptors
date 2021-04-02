import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div class="content-container">
      <div class="content-title-group">
        <h2 class="title">Tour of Movies</h2>
        <p>Manage your movies!</p>
        <p>Log in to start enjoying your benefits.</p>
        <br />

        <div class="button-group">
          <button class="button" aria-label="Heroes" tabindex="0">
            <a href="/heroes">
              <i class="fas fa-clipboard-list"></i>
              Heroes
            </a>
          </button>
          <button class="button" aria-label="My Movies">
            <a href="/movies">
              <i class="fas fa-money-bill-alt"></i>
              My Movies
            </a>
          </button>
          <button class="button" aria-label="My Movies">
            <a
              href="https://github.com/johnpapa/http-interceptors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="fab fa-github"></i>
              Code in GitHub
            </a>
          </button>
        </div>
      </div>
    </div>
  `,
})
export class HomeComponent {}
