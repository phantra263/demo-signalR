import { Component, OnInit, Input, EventEmitter, Output, ViewChild, NgZone } from '@angular/core';
import { Dimensions, ImageCroppedEvent, ImageTransform } from '../image-cropper/interfaces/index';
import {base64ToFile} from '../image-cropper/utils/blob.utils';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-detailHinhAnh',
  templateUrl: './detailHinhAnh.component.html',
  styleUrls: ['./detailHinhAnh.component.scss']
})
export class DetailHinhAnhComponent implements OnInit {
  @ViewChild('imageCropper') imageCropper: any;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  transform: ImageTransform = {};
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
  imagesPreview: any = [];

  itemDetailModel:any = {
    avatarThumb: 'https://picsum.photos/200/300',
    avatar: 'https://picsum.photos/200/300',
    maNhanVien: 'HS22323',
    maHinhAnh: 'HS22323',
    hoTen: 'Phan Công Tra',
    name: "hinhanh1",
    type: "jpg",
    size: "200x220",
    nguoiTao: 'Tra Phan',
    ngayUpdate: '2023-03-02'
  }
  showForm: boolean = false;
  selectedImage: any;
  VisibleModalEdit: boolean = false;


  constructor() { }

  ngOnInit() {
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
    this.isUploadImg = true;

    setTimeout(() => {
     this.imageCropper.crop();
     this.isUploadImg = false
    }, 10)

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
    if (this.itemDetailModel.avatar && !this.imageChangedEvent) {
      this.getImageSize(this.itemDetailModel.avatar);
    }
  }

  openEdit() {
    this.VisibleModalEdit = true;
  }

  closeForm() {
    this.VisibleModalEdit = false;
  }

  fnSaveEditImage() {
  }

  openEditImage() {
    this.VisibleModalEdit = true;
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
}
