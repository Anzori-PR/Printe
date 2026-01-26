import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderDraftService {
  private files: File[] = [];

  getFiles(): File[] {
    return this.files;
  }

  addFiles(files: File[]) {
    this.files = [...this.files, ...files];
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
  }

  clear() {
    this.files = [];
  }
}
