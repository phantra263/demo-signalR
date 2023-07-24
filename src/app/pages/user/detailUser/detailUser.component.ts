import { Component, OnInit } from '@angular/core';
import { Dimensions, ImageCroppedEvent, ImageTransform } from '../image-cropper/interfaces/index';
import {base64ToFile} from '../image-cropper/utils/blob.utils';


@Component({
  selector: 'app-detailUser',
  templateUrl: './detailUser.component.html',
  styleUrls: ['./detailUser.component.scss']
})
export class DetailUserComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = true;
  transform: ImageTransform = {};

  itemDetailModel:any = {
    avatarThumb: 'https://picsum.photos/250/220',
    avatar: 'https://picsum.photos/250/220',
    maNhanVien: 'HS22323',
    hoTen: "Phan công trà",
    ngaySinh: "26-03-1998",
    gioiTinh: "Nam",
    queQuan: "Quảng nam",
    dienThoai: '09143598734',
    tonGiao: "Không",
    chucVu: "Cộng tác viên",
    phongBan: "ICT",
    congTy: 'ALESU',
    tinhTrang: 'Chính thức',
    groupMail: 'trapc@esuhai.com'
  }

  showForm: boolean = false;
  selectedImage: any;
  VisibleModalEdit: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  openForm() {
    this.showForm = true;
  }

  saveForm() {}

  closeForm() {
    this.showForm = false
  }

  handleCancelModal() {
    this.VisibleModalEdit = false;
  }

  fnSaveEditImage() {
  }

  openEditImage() {
    this.VisibleModalEdit = true;
  }
}
