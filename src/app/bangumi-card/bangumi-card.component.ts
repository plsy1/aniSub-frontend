import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item, Site } from '../../schema/card';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-bangumi-card',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
    <section class="listing-container">
      <section class="listing">
        <img class="listing-photo" [src]="imageUrl" alt="" />
        <h3 class="listing-heading">
          {{
            Item.titleTranslate['zh-Hans']?.length
              ? Item.titleTranslate['zh-Hans'][0]
              : Item.title
          }}
        </h3>
      </section>
    </section>
  `,
  styleUrls: ['./bangumi-card.component.css'],
})
export class bangumiCard implements OnInit {
  @Input() Item!: Item;
  imageUrl: string | null = null;
  private apiUrlGetCover =
    'http://127.0.0.1:8964/api/v1/bangumiData/getImageLinkByBangumiID';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const site: Site | undefined = this.Item.sites.find(
      (s) => s.site === 'bangumi'
    );
    if (site) {
      this.loadImage(site.id).then(() => {
        this.setImageUrl(site); // 在图片下载完成后重新设置图片 URL
      });
    } else {
      console.error('No "bangumi" site found for title:', this.Item.title);
    }
  }

  setImageUrl(site: Site) {
    if (site && site.id) {
      const localImageUrl = `http://localhost:8964/img/${site.id}.jpeg`;
      this.imageUrl = localImageUrl;
    } else {
      this.imageUrl = null;
    }
  }
  async loadImage(subjectID: string): Promise<void> {
    const url = `${this.apiUrlGetCover}?subjectID=${subjectID}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }

      // Handle the image data (e.g., cache it, process it on the server)
      // For example, if this is for server-side, you might save the image directly
      // Here we're just making sure it gets downloaded

      
    } catch (error) {
      console.error('Error loading image:', error);
    }
  }
}
