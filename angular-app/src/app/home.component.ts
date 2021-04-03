import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div class="content-container">
      <div class="content-title-group">
        <h2 class="title">Tour of Movies</h2>
        <p>
          Manage your movies! Log in to manage the movies' heroes and villains.
        </p>
        <br />

        <div class="button-group">
          <button class="button" aria-label="My Movies">
            <a routerLink="/movies">
              <i class="fas fa-film"></i>
              My Movies
            </a>
          </button>
          <button class="button" aria-label="Heroes" tabindex="0">
            <a routerLink="/heroes">
              <i class="fas fa-mask"></i>
              Heroes
            </a>
          </button>
          <button class="button" aria-label="Villains" tabindex="0">
            <a routerLink="/villains">
              <i class="fas fa-user-ninja"></i>
              Villains
            </a>
          </button>
          <button class="button" aria-label="GitHub">
            <a
              href="https://github.com/johnpapa/http-interceptors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="fab fa-github"></i>
              Code in GitHub
            </a>
          </button>
          <button class="button" aria-label="Twitter">
            <a
              href="https://twitter.com/john_papa"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="fab fa-twitter"></i>
              John on Twitter
            </a>
          </button>
        </div>
      </div>
    </div>
  `,
})
export class HomeComponent {}
