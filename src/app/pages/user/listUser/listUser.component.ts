import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listUser',
  templateUrl: './listUser.component.html',
  styleUrls: ['./listUser.component.scss']
})
export class ListUserComponent implements OnInit {

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
      maNhanVien: 'HS22323',
      hoTen: "Phan công trà",
      ngaySinh: "26/03/1998",
      gioiTinh: "Nam",
      queQuan: "Quảng nam",
      tonGiao: "Không",
      chucVu: "Cộng tác viên",
      phongBan: "ICT"
    },
    {
      avatarThumb: 'https://picsum.photos/200/300',
      avatar: 'https://picsum.photos/200/300',
      maNhanVien: 'HS22323',
      hoTen: "Phan công trà",
      ngaySinh: "26/03/1998",
      gioiTinh: "Nam",
      queQuan: "Quảng nam",
      tonGiao: "Không",
      chucVu: "Cộng tác viên",
      phongBan: "ICT"
    },
    {
      avatarThumb: 'https://picsum.photos/200/300',
      avatar: 'https://picsum.photos/200/300',
      maNhanVien: 'HS22323',
      hoTen: "Phan công trà",
      ngaySinh: "26/03/1998",
      gioiTinh: "Nam",
      queQuan: "Quảng nam",
      tonGiao: "Không",
      chucVu: "Cộng tác viên",
      phongBan: "ICT"
    },
    {
      avatarThumb: 'https://picsum.photos/200/300',
      avatar: 'https://picsum.photos/200/300',
      maNhanVien: 'HS22323',
      hoTen: "Phan công trà",
      ngaySinh: "26/03/1998",
      gioiTinh: "Nam",
      queQuan: "Quảng nam",
      tonGiao: "Không",
      chucVu: "Cộng tác viên",
      phongBan: "ICT"
    },
    {
      avatarThumb: 'https://picsum.photos/200/300',
      avatar: 'https://picsum.photos/200/300',
      maNhanVien: 'HS22323',
      hoTen: "Phan công trà",
      ngaySinh: "26/03/1998",
      gioiTinh: "Nam",
      queQuan: "Quảng nam",
      tonGiao: "Không",
      chucVu: "Cộng tác viên",
      phongBan: "ICT"
    },
    {
      avatarThumb: 'https://picsum.photos/200/300',
      avatar: 'https://picsum.photos/200/300',
      maNhanVien: 'HS22323',
      hoTen: "Phan công trà",
      ngaySinh: "26/03/1998",
      gioiTinh: "Nam",
      queQuan: "Quảng nam",
      tonGiao: "Không",
      chucVu: "Cộng tác viên",
      phongBan: "ICT"
    }
  ]
  
  newNhanSu: any = {};
  
  showForm: boolean = false;
  previewImageSrc: string;
  constructor() { }

  ngOnInit() {
  }

  closeForm() {
    this.showForm = false
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
}
