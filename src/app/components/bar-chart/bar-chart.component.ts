import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnInit {
  data: { name: string; value: number }[] = [];
  
  view: [number, number] = [700, 400]; 
  colorScheme = 'vivid'; 
  
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadChartData();
  }

  loadChartData(): void {
    this.productService.getProducts().subscribe(
      (products: any[]) => {
        this.data = products.reduce((acc, curr) => {
          const existingCategory = acc.find((item: { name: any; }) => item.name === curr.category);
          if (existingCategory) {
            existingCategory.value += curr.price;
          } else {
            acc.push({ name: curr.category, value: curr.price });
          }
          return acc;
        }, []);
      },
      (error: any) => {
        console.error('Error fetching products:', error);
      }
    );
  }
}
