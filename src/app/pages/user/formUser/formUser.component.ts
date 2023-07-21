import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { ImageCroppedEvent, ImageCropperComponent, CropperPosition } from 'ngx-image-cropper';

@Component({
  selector: 'app-formUser',
  templateUrl: './formUser.component.html',
  styleUrls: ['./formUser.component.scss']
})
export class FormUserComponent implements OnInit {
  @ViewChild('imageCropper', { static: false })
  private imageCropperComponent!: ImageCropperComponent;

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
  // transform: ImageTransform = {};
  selectedImage: any;
  VisibleModalEdit: boolean = false;
  previewImageSrc: string;
  flagCropperReady: boolean = false;
  imageOriginWidth: number = 0;
  imageOriginHeight: number = 0;
  imageCutWidth: number = 0;
  imageCutHeight: number = 0;
  cropperWidth: number = 0;
  cropperHeight: number = 0;
  
  constructor(
  ) { }

  ngOnInit() {
    this.previewImageSrc = this.user ? this.user.avatar : '';
    if (this.user) {
      this.loadImageFromURL(this.user.avatar)
    }
  }

  // rotateLeft() {
  //   this.canvasRotation--;
  //   this.flipAfterRotate();
  // }

  // rotateRight() {
  //   this.canvasRotation++;
  //   this.flipAfterRotate();
  // }

  // private flipAfterRotate() {
  //   const flippedH = this.transform.flipH;
  //   const flippedV = this.transform.flipV;
  //   this.transform = {
  //       ...this.transform,
  //       flipH: flippedV,
  //       flipV: flippedH
  //   };
  // }


  // flipHorizontal() {
  //   this.transform = {
  //     ...this.transform,
  //     flipH: !this.transform.flipH
  //   };
  // }

  // flipVertical() {
  //   this.transform = {
  //   ...this.transform,
  //   flipV: !this.transform.flipV
  //   };
  // }

  // Function to get the image size (dimensions) when it's loaded
  getImageSize(imageUrl: string) {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      this.imageOriginWidth = img.naturalWidth;
      this.imageOriginHeight = img.naturalHeight;
    };
  }

  onImageDataChange() {
    if (this.user.avatar) {
      this.getImageSize(this.user.avatar);
    }
  }

  onImageLoad(event: Event) {
    // This function will be called when the image is loaded or changed.
    // Access the image element to get its dimensions.
    const imageElement = event.target as HTMLImageElement;
    this.imageCutWidth = imageElement.naturalWidth;
    this.imageCutHeight = imageElement.naturalHeight;
  }

  onCropMove(event) {
    console.log(event)
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

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded(image) {
    // show cropper
  }
  onCropperReady() {
    // cropper ready
    // cắt ảnh ở lần đầu tiên
    this.startCrop();
    this.onImageDataChange();

    this.flagCropperReady = true;
    console.log('Cropper ready');
  }
  loadImageFailed() {
    // show message
  }
  startCrop() {
    // Manually trigger the crop action
    if (this.imageCropperComponent) {
      this.imageCropperComponent.crop();
    }
  }
  loadImageFromURL(url) {
    const imageUrl = url; // Replace with your actual image URL

    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File([blob], 'image.jpg', { type: blob.type });
        this.imageChangedEvent = {
          target: {
            files: [file],
          },
        };

        console.log(this.imageChangedEvent.target.files)
      })
      .catch((error) => {
        console.error('Error fetching the image:', error);
      });
  }
  dataURLtoFile(dataURL: string) {
    // Implement the conversion from dataURL to File
    // You can use the code from my previous response that converts dataURL to a File object
  }
}
