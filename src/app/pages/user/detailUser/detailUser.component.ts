import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';


@Component({
  selector: 'app-detailUser',
  templateUrl: './detailUser.component.html',
  styleUrls: ['./detailUser.component.css']
})
export class DetailUserComponent implements OnInit {

  itemDetailModel:any = {
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

  showForm: boolean = false;
  selectedImage: any;
  croppedImage: any;

  constructor() { }

  ngOnInit() {
  }

  openForm() {
    this.showForm = true;
  }

  save() {}

  closeForm() {
    this.showForm = false
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.selectedImage = reader.result;
      };
    }
  }

  onImageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
}
