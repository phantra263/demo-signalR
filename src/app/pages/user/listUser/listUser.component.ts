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
  
  newUser: any = {};
  
  showForm: boolean = false;
  previewImageSrc: string;
  constructor() { }

  ngOnInit() {
  }

  fnCloseForm() {
    this.showForm = false
  }

  fnSaveForm() {}
}
