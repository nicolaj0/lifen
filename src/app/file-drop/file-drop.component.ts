import {Component, OnInit} from '@angular/core';
import {FileSystemDirectoryEntry, NgxFileDropEntry, FileSystemFileEntry} from 'ngx-file-drop';
import {ConfigService} from '../config.service';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';


@Component({
  selector: 'app-file-drop',
  templateUrl: './file-drop.component.html',
  styleUrls: ['./file-drop.component.sass']
})
export class FileDropComponent implements OnInit {
  error: any;
  total: number;

  constructor(private service: ConfigService) {

  }

  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
          var reader = new FileReader();

          reader.onload = e => {
            var rawData = reader.result;
            this.service.postFile(rawData)
              .pipe(mergeMap(() => this.service.getHiso()))
              .subscribe(
              data => {
                this.total = data.total
                console.log(data.total);
              })
          }

          reader.readAsDataURL(file);

          /**
           // You could upload it like this:
           const formData = new FormData()
           formData.append('logo', file, relativePath)

           // Headers
           const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

           this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
           .subscribe(data => {
            // Sanitized logo returned from backend
          })
           **/

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

  ngOnInit() {
  }

}
