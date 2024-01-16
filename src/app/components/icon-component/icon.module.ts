import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HamButtonComponent } from './ham-button/ham-button.component';
import { InstagramLinkComponent } from './instagram-link/instagram-link.component';
import { LinkedinLinkComponent } from './linkedin-link/linkedin-link.component';
import { TiktokLinkComponent } from './tiktok-link/tiktok-link.component';
import { YoutubeLinkComponent } from './youtube-link/youtube-link.component';

@NgModule({
  declarations: [
    HamButtonComponent,
    InstagramLinkComponent,
    LinkedinLinkComponent,
    TiktokLinkComponent,
    YoutubeLinkComponent,
  ],
  imports: [CommonModule],
  exports: [
    HamButtonComponent,
    InstagramLinkComponent,
    LinkedinLinkComponent,
    TiktokLinkComponent,
    YoutubeLinkComponent,
  ],
})
export class IconModule {}
