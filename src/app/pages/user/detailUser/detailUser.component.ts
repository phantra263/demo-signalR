import { Component, OnInit } from '@angular/core';
import { Dimensions, ImageCroppedEvent, ImageTransform } from '../image-cropper/interfaces/index';
import {base64ToFile} from '../image-cropper/utils/blob.utils';


@Component({
  selector: 'app-detailUser',
  templateUrl: './detailUser.component.html',
  styleUrls: ['./detailUser.component.css']
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
