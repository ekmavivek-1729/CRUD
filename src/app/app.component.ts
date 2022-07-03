import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// import { MatPaginator } from '@angular/material/paginator/public-api';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
// import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'crud';

  displayedColumns: string[] = ['productName', 'category', 'price', 'date', 'quality', 'comment','action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService){

  }
  ngOnInit(): void {
    this.getAllProducts();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
          }).afterClosed().subscribe(val=>{   // before we are using this line because whenever we are updating our data
                                                // updated data not showing on the table for showing data we need to refresh the page for every update.
                                                // same code is written in editproduct function as well.
      if(val=== 'save'){
        this.getAllProducts();
      }
    })
  }

  getAllProducts(){
    this.api.getProduct()
    .subscribe({
      next:(res)=>{
        // console.log(res);
        this.dataSource =new MatTableDataSource(res);
        this.dataSource.paginator=this.paginator;
        this.dataSource.sort=this.sort;

      },
      error:(err)=>{
        alert('Error while fetching the records')
      }
    })
  }

  editProduct(row: any){
    this.dialog.open(DialogComponent,{
      width: '50%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.getAllProducts();
      }
    })

  }

  deleteProduct(id: number){
    this.api.deleteProduct(id)
    .subscribe({
      next: (res)=>{
        alert("Product deleted succesfully");
        this.getAllProducts();
      },
      error: ()=>{
        alert("Error while deleting the product!!");
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

}
