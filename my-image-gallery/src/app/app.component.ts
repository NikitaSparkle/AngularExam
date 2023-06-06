import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface Image {
  id: number;
  webformatURL: string;
}

@Component({
  selector: 'app-root',
  template: `
    <h1>Image Gallery</h1>
    <button (click)="openSettings()">Settings</button>
    <button (click)="loadImages('motorcycles')">Motorcycles</button>
    <button (click)="loadImages('nature')">Nature</button>
    <button (click)="loadImages('space')">Space</button>
    <button (click)="loadImages('architecture')">Architecture</button>

    <div *ngIf="currentTab === 'settings'">
      <h2>API Key Settings</h2>
      <input [(ngModel)]="apiKey" placeholder="Enter your API Key"/>
      <button (click)="saveApiKey()">Save</button>
    </div>

    <div *ngIf="currentTab !== 'settings'">
      <h2>{{ currentTab | uppercase }}</h2>
      <div *ngFor="let image of images">
        <img [src]="image.webformatURL" alt="Image"/>
      </div>
    </div>
  `,
  styles: [`
    button {
      margin-right: 10px;
    }

    img {
      width: 200px;
      height: 200px;
      object-fit: cover;
      margin: 5px;
    }
  `]
})
export class AppComponent {
  currentTab: string = '';
  images: Image[] = [];
  apiKey: string = '';

  constructor(private http: HttpClient) {
  }

  openSettings() {
    this.currentTab = 'settings';
  }

  loadImages(category: string) {
    this.currentTab = category;
    console.log("Category: " + category);
    console.log("Current Tab: " + this.currentTab);
    const timestamp = new Date().getTime();
    const url = `https://pixabay.com/api/?key=${this.apiKey}&category=${category}`;
    console.log("UR: " + url);
    this.http.get<any>(url).subscribe(response => {
      this.images = response.hits;
      console.log("Response: " + response.hits);
    });
  }

  saveApiKey() {
    localStorage.setItem('apiKey', this.apiKey);
    console.log("API Key: " + this.apiKey);
  }

  ngOnInit() {
    const savedApiKey = localStorage.getItem('apiKey');
    if (savedApiKey) {
      this.apiKey = savedApiKey;
    }
  }
}
