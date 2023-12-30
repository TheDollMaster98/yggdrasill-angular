import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-wysiwyg-editor',
  templateUrl: './wysiwyg-editor.component.html',
  styleUrls: ['./wysiwyg-editor.component.scss'],
})
export class WysiwygEditorComponent implements OnInit {
  @ViewChild('editor') editor!: ElementRef;

  content: string = ''; // Contenuto dell'editor
  fontSize: number = 16; // Dimensione predefinita del testo

  updateContent(event: Event): void {
    const target = event.target as HTMLDivElement;
    this.content = target.innerHTML;
  }

  ngOnInit(): void {}
}
