import { Component, EventEmitter, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FaIconComponent, } from "@fortawesome/angular-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";

interface UploadedPhoto {
  name: string;
  url: SafeUrl; // Changed string to SafeUrl
}
@Component({
  selector: 'app-file-uploader',
  imports: [FaIconComponent],
  templateUrl: './file-uploader.html',
  styleUrl: './file-uploader.css',
})
export class FileUploader {
  @Output() filesChanged = new EventEmitter<any>();

  faImage = faImage;
  photos: UploadedPhoto[] = [];

  constructor(private sanitizer: DomSanitizer) { }

  // Triggered when files are selected
  onFileSelected(event: any) {
    const files = event.target.files;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Create a preview URL
        const objectUrl = URL.createObjectURL(file);
        // Sanitize the URL so Angular allows it
        const safeUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);

        this.photos.push({
          name: file.name,
          url: safeUrl
        });

        this.filesChanged.emit({
          name: file.name,
          url: safeUrl
        });
      }
    }
  }

}
