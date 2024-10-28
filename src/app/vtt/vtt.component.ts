import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface VTTEntry {
  id: string;
  time: string;
  englishText: string;
  spanishText: string;
  newSpanishText: string;
}


@Component({
  selector: 'app-vtt',
  templateUrl: './vtt.component.html',
  styleUrl: './vtt.component.scss'
})
export class VttComponent implements OnInit {
  vttEntries: VTTEntry[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.loadVTTFiles();
    this.results = JSON.parse(localStorage.getItem("new_vtt") || '[]');
  }
  Browse() {
    document.getElementById('file')?.click();

  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const contents = e.target?.result;
      this.results = this.parseVTT(contents as string);
      console.log(this.results);
    };
    reader.readAsText(file);
  }
  // loadVTTFiles(): void {
  //   this.http.get('assets/Process Safety Simply Stated-20190502_062539-en-US.vtt', { responseType: 'text' }).subscribe(englishVTT => {
  //     this.http.get('assets/Process Safety Simply Stated-20190502_062539-es.vtt', { responseType: 'text' }).subscribe(spanishVTT => {
  //       this.parseVTTFiles(englishVTT, spanishVTT);
  //     });
  //   });
  // }
  results: any;
  // parseVTTFiles(englishVTT: string, spanishVTT: string): void {
  //   const englishEntries = this.parseVTT(englishVTT);
  //   let newEntries = [];
  //   if (localStorage.getItem("new_vtt")) {
  //     newEntries = localStorage.getItem("new_vtt") ? JSON.parse(localStorage.getItem("new_vtt") || '[]') : [];
  //   } else {
  //     for (let i = 0; i < englishEntries.length; i++) {
  //       const element = englishEntries[i];
  //       console.log(i, spanishEntries[i]);
  //       let text = spanishEntries[i] ? spanishEntries[i].text : "";
  //       newEntries.push({
  //         id: element.id,
  //         time: element.time,
  //         text: text
  //       });
  //     }
  //   }
  //   this.results = {
  //     englishEntries: englishEntries,
  //     spanishEntries: spanishEntries,
  //     newEntries: newEntries
  //   };
  // }

  parseVTT(vttText: string): { id: string; time: string; text: string }[] {
    // console.log(vttText);
    const entries: any = [];
    const lines = vttText.split('\r\n\r\n');
    // console.log(lines);
    lines.forEach(line => {
      const parts = line.split('\n');
      if (parts.length >= 3) {
        entries.push({
          id: parts[0].trim(),
          time: parts[1].trim(),
          text: parts.slice(2).join(' ')
        });
      }
    });
    return entries;
  }
  Save(): void {
    let result = "WEBVTT\n\n";
    const element = document.getElementById("result");
    if (element) {
      element.childNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          node.childNodes.forEach(childNode => {
            // if (childNode.nodeType === Node.TEXT_NODE) {
              console.log(element);
              result += childNode.textContent + "\n";
            // }
          });
          result += "\n";
        }
      });
    }
    console.log(result);
    localStorage.setItem("new_vtt", JSON.stringify(this.results));
    this.createVTTFile(result, "new_spanish.vtt");
  }
  Clear() {
    localStorage.removeItem("new_vtt");
    window.location.reload();
  }
  createVTTFile(text: string, filename: string): void {
    // Create a Blob from the result string
    const blob = new Blob([text], { type: 'text/vtt' });
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    // Clean up by revoking the URL and removing the temporary element
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
}
