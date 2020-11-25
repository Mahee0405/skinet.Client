import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/products';
import { IType } from '../shared/models/productType';
import { ShopService } from './shop.service';
import { ShopParams } from '../shared/models/shopParams'

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search') search: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  shopParam = new ShopParams();
  totalCount: number;
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Low to High', value: 'priceAsc' },
    { name: 'High to Low', value: 'PrcieDesc' }
  ];
  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts(): void {
    this.shopService.getProducts(this.shopParam).subscribe(response => {
      this.products = response.data;
      this.shopParam.pageNumber = response.pageIndex;
      this.shopParam.pageSize = response.pageSize;
      this.totalCount = response.count;
    }, error => {
      console.log(error);
    });
  }

  getBrands(): void {
    this.shopService.getBrands().subscribe(response => {
      this.brands = [{ id: 0, name: 'All' }, ...response];
    }, error => {
      console.log(error);
    });
  }

  getTypes(): void {
    this.shopService.getTypes().subscribe(response => {
      this.types = [{ id: 0, name: 'All' }, ...response];
    }, error => {
      console.log(error);
    });
  }

  onBrandSelected(brandid: number): void {
    this.shopParam.brandId = brandid;
    this.shopParam.pageNumber = 1;
    this.getProducts();
  }

  onTypeSeleted(typeid: number): void {
    this.shopParam.typeId = typeid;
    this.shopParam.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sort: string): void {
    this.shopParam.sort = sort;
    this.getProducts();
  }

  onPageChanged(event: any): void {
    if (this.shopParam.pageNumber !== event) {
      this.shopParam.pageNumber = event;
      this.getProducts();
    }

  }

  onSearch(): void {
    this.shopParam.search = this.search.nativeElement.value;
    this.shopParam.pageNumber = 1;
    this.getProducts();
  }

  onReset(): void {
    this.search.nativeElement.value = '';
    this.shopParam = new ShopParams();
    this.getProducts();
  }

}
