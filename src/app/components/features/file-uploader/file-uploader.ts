import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FaIconComponent, } from "@fortawesome/angular-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { OrderDraftService } from '../../../services/order-draft';

interface UploadedPhoto {
  file: File;
  name: string;
  url: string;
}
@Component({
  selector: 'app-file-uploader',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './file-uploader.html',
  styleUrl: './file-uploader.css',
})
export class FileUploader implements OnInit {
  @Output() filesChanged = new EventEmitter<UploadedPhoto[]>();

  faImage = faImage;
  photos: UploadedPhoto[] = [];

  constructor(private draft: OrderDraftService) { }

  ngOnInit(): void {
    const files = this.draft.getFiles();
    this.photos = files.map(file => ({
      file: file,
      name: file.name,
      url: URL.createObjectURL(file)
    }));
  }


  // Triggered when files are selected
  onFileSelected(event: any) {
    const files = Array.from(event.target.files) as File[];

    this.draft.addFiles(files);

    const allFiles = this.draft.getFiles();

    this.photos = allFiles.map(file => ({
      file: file,
      name: file.name,
      url: URL.createObjectURL(file)
    }));

    this.filesChanged.emit(this.photos);
  }

  removePhoto(index: number) {
    this.draft.removeFile(index);

    const files = this.draft.getFiles();

    this.photos = files.map(file => ({
      file: file,
      name: file.name,
      url: URL.createObjectURL(file)
    }));

    this.filesChanged.emit(this.photos);
  }
}
