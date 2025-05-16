import { Component, ViewChild, ElementRef } from '@angular/core';

// import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'HTML-To-PDF';
  base64Code: any = ""
  base64 = false
  windowWidth: number = 595
  width: number = 202
  pdfFileName = "htmlToPdf"
  fileNameForDownload = ""
  pdf = false
  pdfSrc: any;

  constructor() {
    
  }


  generatePDF() {

    let fileName = this.pdfFileName + ".pdf"
    var doc = new jsPDF();
    var elementHTML = document.querySelector("#content") as HTMLElement;

    doc.html(elementHTML, {
      callback: function (doc) {
        // doc.setFont("normal") 
        doc.save(fileName);
        // console.log(doc.output('datauri'));
        // console.log(doc.output('datauristring'));
        // localStorage.setItem('base64', doc.output('datauristring'))
        // doc.output('blob')

      },

      margin: [3, 3, 3, 3],
      autoPaging: 'text',
      x: 0,
      y: 0,
      width: this.width, // Target width in the PDF document
      windowWidth: this.windowWidth // Window width in CSS pixels 675
    });
  }

  generateBase64() {
    let fileName = this.pdfFileName + ".pdf"
    var doc = new jsPDF();
    var elementHTML = document.querySelector("#content") as HTMLElement;

    doc.html(elementHTML, {
      callback: (doc) => {
        this.base64 = true
        console.log(doc.output('datauristring'));
        this.base64Code = doc.output('datauristring')
        this.pdfViewer(this.base64Code)
      },
      margin: [3, 3, 3, 3],
      autoPaging: 'text',
      x: 0,
      y: 0,
      width: this.width,
      windowWidth: this.windowWidth
    });
  }

  pdfViewer(base64: any) {
    debugger
    this.fileNameForDownload = this.pdfFileName + ".pdf"
    this.pdfSrc = base64.replace('data:application/pdf;filename=generated.pdf;base64,', '');
    if (this.pdfSrc != "") {
      this.pdf = true
    }
  }

}
