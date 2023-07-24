import { Component, OnInit, Input, EventEmitter, Output, ViewChild, NgZone } from '@angular/core';
import { Dimensions, ImageCroppedEvent, ImageTransform } from '../image-cropper/interfaces/index';
import {base64ToFile} from '../image-cropper/utils/blob.utils';

@Component({
  selector: 'app-formUser',
  templateUrl: './formUser.component.html',
  styleUrls: ['./formUser.component.scss']
})
export class FormUserComponent implements OnInit {
  @ViewChild('imageCropper') imageCropper: any;

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
  transform: ImageTransform = {};
  selectedImage: any;
  VisibleModalEdit: boolean = false;
  previewImageSrc: string;
  flagCropperReady: boolean = false;
  imageOriginWidth: number = 0;
  imageOriginHeight: number = 0;
  imageCutWidth: number = 0;
  imageCutHeight: number = 0;
  isUploadImg: boolean = true;
  isUploadImgCrop: boolean = false;
  aspectRatio: number = 1/1;
  maxWidthResize: number = 150;
  maxHeightResize: number = 150;
  constructor(
    private ngZone: NgZone,
  ) { }

  ngOnInit() {
    this.previewImageSrc = this.user ? this.user.avatar : '';
  }

  async previewAndUploadImage(event: any) {
    const file = event.target.files[0];
    const maxWidth = this.maxWidthResize; // Kích thước tối đa của ảnh
    const maxHeight = this.maxHeightResize; // Kích thước tối đa của ảnh
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

  fileChangeEvent(event: any): void {
    this.isUploadImgCrop = true;
    this.imageChangedEvent = event;

    // set kích thước gốc của img khi upload hình mới
    this.getImageDimensions(event.target.files[0]);
  }

  getImageDimensions(file: File) {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const img = new Image();
      img.src = e.target.result;

      img.onload = () => {
        this.imageOriginWidth = this.imageCutWidth = img.width;
        this.imageOriginHeight = this.imageCutHeight = img.height;
        // this.aspectRatio = this.imageOriginWidth / this.imageOriginHeight;

      };
    };
    reader.readAsDataURL(file);
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;

    // get kích thước khi cắt
    this.imageCutWidth = event.width;
    this.imageCutHeight = event.height;
    console.log(event, base64ToFile(event.base64));
  }

  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    // cắt ảnh ở lần đầu tiên
    this.startCrop();
    this.onImageDataChange();
    this.flagCropperReady = true;
    this.isUploadImg = false;
    this.isUploadImgCrop = false;
    console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
    console.log('Load failed');
  }

  startCrop() {
    this.imageCropper.crop();
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

  // Function to get the image size (dimensions) when it's loaded
  getImageSize(imageUrl: string) {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      this.imageOriginWidth = this.imageCutWidth = img.naturalWidth;
      this.imageOriginHeight = this.imageCutHeight = img.naturalHeight;
      // this.aspectRatio = this.imageOriginWidth / this.imageOriginHeight;
    };
  }

  onImageLoad(event: Event) {
    // This function will be called when the image is loaded or changed.
    // Access the image element to get its dimensions.
    const imageElement = event.target as HTMLImageElement;
    this.imageCutWidth = imageElement.naturalWidth;
    this.imageCutHeight = imageElement.naturalHeight;
  }

  onImageDataChange() {
    if (this.user.avatar && !this.imageChangedEvent) {
      this.getImageSize(this.user.avatar);
    }
  }

  fncloseForm() {
    this.closeDraw$.emit();
  }

  fnSaveInfo() {
    this.saveDraw$.emit();
  }

  handleCancelModal() {
    this.VisibleModalEdit = false;
    this.resetImage();
  }

  resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
    this.imageChangedEvent = '';
    this.isUploadImg = true;
    this.isUploadImgCrop = false;
    this.flagCropperReady = false;
}

  fnSaveEditImage() {}
}
