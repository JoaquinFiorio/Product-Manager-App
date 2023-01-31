import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {

  listProductos : Producto[] = [];

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(){
    this.productoService.getProductos().subscribe({
      next: res => {
      console.log(res)
          this.listProductos = res
    },
    error: err => console.log(err)
  })
  }

  eliminarProducto(id:any){
    this.productoService.eliminarProducto(id).subscribe({
      next : res =>{
        console.log(res);
        this.obtenerProductos();
      },
      error: err =>console.log(err)
    })
  }


}


