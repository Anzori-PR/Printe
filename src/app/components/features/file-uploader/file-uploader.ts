import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FaIconComponent, } from "@fortawesome/angular-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";

interface UploadedPhoto {
  name: string;
  url: string;
}
@Component({
  selector: 'app-file-uploader',
  imports: [FaIconComponent],
  templateUrl: './file-uploader.html',
  styleUrl: './file-uploader.css',
})
export class FileUploader implements OnInit{
  @Output() filesChanged = new EventEmitter<UploadedPhoto[]>();

  faImage = faImage;
  photos: UploadedPhoto[] = [];

  constructor() { }

  ngOnInit(): void {
    const savedPhotos = localStorage.getItem('uploadedPhotos');
    if (savedPhotos) {
      this.photos = JSON.parse(savedPhotos);
    }
    console.log('Loaded photos from storage:', this.photos);
  }


  // Triggered when files are selected
  onFileSelected(event: any) {
    const files = Array.from(event.target.files) as File[];

    const mappedPhotos = files.map(file => ({
      file: file,
      name: file.name,
      url: URL.createObjectURL(file)
    }));

    this.photos = [...this.photos, ...mappedPhotos];
    this.filesChanged.emit(this.photos);
  }

}
