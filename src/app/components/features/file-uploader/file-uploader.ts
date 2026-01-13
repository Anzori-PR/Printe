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
  @Output() filesChanged = new EventEmitter<UploadedPhoto[]>();

  faImage = faImage;
  photos: UploadedPhoto[] = [];

  constructor(private sanitizer: DomSanitizer) { }


  // Triggered when files are selected
  onFileSelected(event: any) {
    const files = Array.from(event.target.files) as File[];

    const mappedPhotos = files.map(file => ({
      name: file.name,
      file,
      url: this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(file)
      )
    }));

    this.photos = [...this.photos, ...mappedPhotos];
    this.filesChanged.emit(this.photos);
  }

}
