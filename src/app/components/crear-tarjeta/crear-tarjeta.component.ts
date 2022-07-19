import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from '../../models/TarjetaCredito';
import { TarjetaService } from '../../services/tarjeta.service';

@Component({
  selector: 'app-crear-tarjeta',
  templateUrl: './crear-tarjeta.component.html',
  styleUrls: ['./crear-tarjeta.component.css']
})
export class CrearTarjetaComponent implements OnInit {

  form: FormGroup;
  loadig:boolean = false;
  titulo = "CREAR TARJETA";
  id:string | undefined;


  constructor( private fb:FormBuilder, private _tarjetaService:TarjetaService, private toastr: ToastrService) { 
    this.form = fb.group({
      titular:['', [Validators.required, Validators.minLength(4)]],
      numeroTarjeta:['', [Validators.required,Validators.minLength(16), Validators.maxLength(16)]],
      fechaExpiracion:['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      cvv:['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
    })
}
  ngOnInit(): void {

    this._tarjetaService.getTarjetaEdit().subscribe( data=>{
     
      this.titulo = 'Editar tarjeta';
      this.id = data.id,
      this.form.patchValue({
        titular:data.titular,
        numeroTarjeta:data.numeroTarjeta,
        fechaExpiracion:data.fechaExpiracion,
        cvv:data.cvv,
      })
    })
  }

  guaradarTarjeta(){
    if(this.id === undefined){
      this.crearTarjeta();
    } else{
      this.updateTarjeta(this.id);
    }
  }

  updateTarjeta(id:string){

    const TARJETA: any ={
      titular:this.form.value.titular,
      numeroTarjeta: this.form.value.numeroTarjeta,
      fechaExpiracion: this.form.value.fechaExpiracion,
      cvv: this.form.value.cvv,
      fechaActualizacion: new Date(),
    }
    this.loadig = true;
    this._tarjetaService.editTarjetaC(id, TARJETA).then(()=>{
      this.form.reset();
      this.titulo='Crear tarjeta';
      this.id= undefined;
      this.toastr.info('Tarjeta Actualizada', 'GUARDO CORRECTAMENTE');
      this.loadig = false;
    },error =>{
      this.toastr.error('ERROR', 'Opps ... Ocurrio un error');
      this.loadig = false;
    })

  }

  crearTarjeta(){
    const TARJETA: TarjetaCredito ={
      titular:this.form.value.titular,
      numeroTarjeta: this.form.value.numeroTarjeta,
      fechaExpiracion: this.form.value.fechaExpiracion,
      cvv: this.form.value.cvv,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    }
    this.loadig = true;
    this._tarjetaService.guardadTarjeta(TARJETA).then(()=>{
      this.form.reset();
      this.toastr.success('Tarjeta', 'GUARDO CORRECTAMENTE');
      this.loadig = false;
    },error =>{
      this.toastr.error('ERROR', 'Opps ... Ocurrio un error');
      this.loadig = false;
    })
  }
}
