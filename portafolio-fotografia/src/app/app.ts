import { Component } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { About } from './components/about/about';
import { Portfolio } from './components/portfolio/portfolio';
import { Packages} from './components/packages/packages';
import { Contact } from './components/contact/contact';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Navbar,
    Hero,
    About,
    Portfolio,
    Packages,
    Contact
  ],
  templateUrl: './app.html',
  styleUrl: './app.css' 
})
export class App {
  title = 'portafolio-fotografia';
}