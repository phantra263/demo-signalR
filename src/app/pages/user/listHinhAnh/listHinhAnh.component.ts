import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-listhinhanh',
  templateUrl: './listHinhAnh.component.html',
  styleUrls: ['./listHinhAnh.component.scss']
})
export class ListHinhAnhComponent implements OnInit {

  filterParams = {
    Keyword: '',
    PageNumber: 1,
    PageSize: 10
  }
  totalItems = 10;
  listDataDisplay = [ 
    {
      avatarThumb: 'https://picsum.photos/200/300',
      avatar: 'https://picsum.photos/200/300',
      maHinhAnh: 'HS22323',
      hoTen: 'Phan Công Tra',
      name: "hinhanh1",
      type: "jpg",
      size: "200x220",
      nguoiTao: 'Tra Phan',
      ngayUpdate: '2023-03-02'
    },
    {
      avatarThumb: 'https://picsum.photos/200/300',
      avatar: 'https://picsum.photos/200/300',
      maHinhAnh: 'HS22323',
      hoTen: 'Phan Công Tra',
      name: "hinhanh1",
      type: "jpg",
      size: "200x220",
      nguoiTao: 'Tra Phan',
      ngayUpdate: '2023-03-02'
    },
    {
      avatarThumb: 'https://picsum.photos/200/300',
      avatar: 'https://picsum.photos/200/300',
      maHinhAnh: 'HS22323',
      hoTen: 'Phan Công Tra',
      name: "hinhanh1",
      type: "jpg",
      size: "200x220",
      nguoiTao: 'Tra Phan',
      ngayUpdate: '2023-03-02'
    },
    {
      avatarThumb: 'https://picsum.photos/200/300',
      avatar: 'https://picsum.photos/200/300',
      maHinhAnh: 'HS22323',
      hoTen: 'Phan Công Tra',
      name: "hinhanh1",
      type: "jpg",
      size: "200x220",
      nguoiTao: 'Tra Phan',
      ngayUpdate: '2023-03-02'
    },
    {
      avatarThumb: 'https://picsum.photos/200/300',
      avatar: 'https://picsum.photos/200/300',
      maHinhAnh: 'HS22323',
      hoTen: 'Phan Công Tra',
      name: "hinhanh1",
      type: "jpg",
      size: "200x220",
      nguoiTao: 'Tra Phan',
      ngayUpdate: '2023-03-02'
    }
  ]
  imagesPreview: any = [];
  newUser: any = {};
  maxWidthResize: number = 150;
  maxHeightResize: number = 150;
  showForm: boolean = false;
  previewImageSrc: string;

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
  }

  async previewAndUploadImages(event: any) {
    const files: File[] = event.target.files;
    const maxWidth = this.maxWidthResize; // Kích thước tối đa của ảnh
    const maxHeight = this.maxHeightResize; // Kích thước tối đa của ảnh
  
    try {
      for (const file of files) {
        const resizedFile = await this.resizeImage(file, maxWidth, maxHeight);
  
        // Get the image attributes (width and height) using the Image class
        const imagePreview = {
          dataUrl: this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(resizedFile)) as SafeUrl,
          name: file.name,
          type: file.type,
          size: file.size,
          width: 0,
          height: 0
        };

        // Get the image attributes (width and height) using the Image class
        const originalImage = new Image();
        originalImage.src = URL.createObjectURL(file);
        originalImage.onload = () => {
          imagePreview.width = originalImage.width;
          imagePreview.height = originalImage.height;
        };
        this.imagesPreview.push(imagePreview);
      }
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

  removeImage(index: number) {
    // Remove the image at the specified index from the images array
    this.imagesPreview.splice(index, 1);
  }

  getFileSize(size: number): string {
    const fileSizeKB = Math.round(size / 1024); // Convert bytes to kilobytes
    return `${fileSizeKB} KB`;
  }

  fncloseForm() {
    this.showForm = false;
    this.imagesPreview = [];
  }

  fnSaveForm() {}
}
