import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SimplesidebarComponent } from '../simplesidebar/simplesidebar.component';
import { bangumiCard } from '../bangumi-card/bangumi-card.component';
import { CardService } from '../../schema/card-service';
import { Item } from '../../schema/card';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, SimplesidebarComponent, bangumiCard],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  Items: Item[] = [];
  CardsList: CardService = inject(CardService);

  constructor() {
    this.loadCards();
  }

  async loadCards() {
    try {
      const date = '20240701';
      this.Items = await this.CardsList.getThisSeason(date);
    } catch (error) {
      console.error('Error loading cards', error);
    }
  }
}
