import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Dimensions, ImageCroppedEvent, ImageTransform } from '../image-cropper/interfaces/index';
import {base64ToFile} from '../image-cropper/utils/blob.utils';

@Component({
  selector: 'app-formUser',
  templateUrl: './formUser.component.html',
  styleUrls: ['./formUser.component.scss']
})
export class FormUserComponent implements OnInit {
  @Input() user: any;
  @Input() showForm: boolean;
  @Input() titleForm: string;
  @Output() closeDraw$:any = new EventEmitter();
  @Output() saveDraw$:any = new EventEmitter();

  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = true;
  transform: ImageTransform = {};
  selectedImage: any;
  VisibleModalEdit: boolean = false;
  previewImageSrc: string;
  constructor() { }

  ngOnInit() {
    this.previewImageSrc = this.user ? this.user.avatar : '';
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log(event, base64ToFile(event.base64));
  }

  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
    console.log('Load failed');
  }

  rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
        ...this.transform,
        flipH: flippedV,
        flipV: flippedH
    };
  }


  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH
    };
  }

  flipVertical() {
    this.transform = {
    ...this.transform,
    flipV: !this.transform.flipV
    };
  }

  fncloseForm() {
    this.closeDraw$.emit();
  }

  fnSaveInfo() {
    this.saveDraw$.emit();
  }

  handleCancelModal() {
    this.VisibleModalEdit = false;
  }

  async previewAndUploadImage(event: any) {
    const file = event.target.files[0];
    const maxWidth = 150; // Kích thước tối đa của ảnh
    const maxHeight = 150; // Kích thước tối đa của ảnh
    try {
      const resizedFile = await this.resizeImage(file, maxWidth, maxHeight);
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.previewImageSrc = e.target.result;
      };

      reader.readAsDataURL(resizedFile);

      // Gửi resizedFile lên API
    } catch (error) {
      console.error('Lỗi khi thay đổi kích thước ảnh:', error);
    }
  }

  resizeImage(file: File, maxWidth: number, maxHeight: number): Promise<File> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          const resizedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now(),
          });
          resolve(resizedFile);
        }, file.type);
      };
      img.onerror = (error) => reject(error);
    });
  }

  fnSaveEditImage() {}
}
