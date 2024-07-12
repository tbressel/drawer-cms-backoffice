import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tool-bar',
  standalone: true,
  imports: [],
  templateUrl: './tool-bar.component.html',
  styleUrl: './tool-bar.component.scss'
})
export class ToolBarComponent {

@Input() activeTextAreaId: string | undefined;


  applyTag(color: string): void {
    if (!this.activeTextAreaId) return;

    const textArea = document.getElementById(this.activeTextAreaId) as HTMLTextAreaElement;

    if (textArea) {
      const start = textArea.selectionStart;
      const end = textArea.selectionEnd;
      const textSelected = textArea.value.substring(start, end);
      const beforeText = textArea.value.substring(0, start);
      const afterText = textArea.value.substring(end);
      const tagStart = color;
      let tagEnd = color.replace(/=""/g, '');
      tagEnd = tagEnd.replace(/!red!/g, '!!');
      tagEnd = tagEnd.replace(/!green!/g, '!!');
      tagEnd = tagEnd.replace(/!yellow!/g, '!!');
      
      const newText = `${beforeText}[${tagStart}]${textSelected}[/${tagEnd}]${afterText}`;

      textArea.value = newText;

      // Déclencher un événement 'input' pour informer le formulaire du changement
      const event = new Event('input', { bubbles: true, cancelable: true });
      textArea.dispatchEvent(event);

      textArea.selectionStart = textArea.selectionEnd = start + tagStart.length * 2 + textSelected.length + 5;
    }
  }





}
