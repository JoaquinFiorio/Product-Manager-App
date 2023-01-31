import { Component, OnInit } from '@angular/core';
import { FormBuilder ,FormGroup, Validators } from "@angular/forms";
import { Producto } from 'src/app/models/producto';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  productoForm: FormGroup;
  titulo = "Crear Producto";
  id : string | null;

  constructor(private fb: FormBuilder,
    private router: Router,
    private productoService : ProductoService,
    private aRouter : ActivatedRoute) {

    this.productoForm = this.fb.group({
      producto :["", Validators.required],
      categoria :["", Validators.required],
      ubicacion :["", Validators.required],
      precio :["", Validators.required],
    })
      this.id = this.aRouter.snapshot.paramMap.get("id"); //para acceder al ID del URL
    }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarProducto(){
    console.log(this.productoForm);

    const producto : Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
    }

    if(this.id !== null){
      //Editamos el producto
      this.productoService.editarProducto(this.id, producto).subscribe({
        next : res => {
          this.router.navigate(["/"])
        },
        error: err => console.log(err)
      })

    }else{
      //Agregamos el producto
      console.log(producto);
    this.productoService.guardarProducto(producto).subscribe({
      next: res =>{
        this.router.navigate(["/"]);
      },
      error: err => {
        console.log(err);
        this.productoForm.reset();
    }
    })
    }



  }

  esEditar(){
    if(this.id !== null){
      this.titulo = "Editar Producto";
      this.productoService.obtenerProducto(this.id).subscribe({
        next: res =>{
          this.productoForm.setValue({
            producto: res.nombre,
            categoria: res.categoria,
            ubicacion: res.ubicacion,
            precio: res.precio,
          })
        },
        error: err => console.log(err)
      })
    }
  }

}
