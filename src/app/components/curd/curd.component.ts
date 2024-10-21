import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { AddEditComponent } from '../add-edit/add-edit.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { error } from 'console';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-curd',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatPaginator,
    MatPaginatorModule,
    MatSort,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
  ],
  templateUrl: './curd.component.html',
  styleUrl: './curd.component.scss',
})
export class CurdComponent implements OnInit {
  empListarr: any = [];
  displayedColumns: string[] = [
    'id',
    'Firstname',
    'Lastname',
    'Email',
    'Gender',
    'DOB',
    'Action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private _apiService: ApiService) {}

  ngOnInit() {
    this.getEmployeelist();
  }

  getEmployeelist() {
    this._apiService.getEmployeeList().subscribe({
      next: (res: any) => {
        this.empListarr = res;
        this.dataSource = this.empListarr;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddEditComponent, {
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe({
      next: (val:any) => {
        if(val){
          this.getEmployeelist();
        }
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: number) {
    this._apiService.deleteEmployee(id).subscribe({
      next: (res: any) => {
        alert('employee deleted');
        this.getEmployeelist();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  openEdit(data: any) {
 const dialogRef =   this.dialog.open(AddEditComponent, {
      height: '400px',
      width: '600px',
      data : data
    });
    dialogRef.afterClosed().subscribe({
      next: (val:any) => {
        if(val){
          this.getEmployeelist()
        }
      }
    })
  }
}
