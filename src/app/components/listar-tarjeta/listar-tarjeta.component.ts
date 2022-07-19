import { Component, OnInit } from '@angular/core';
import { TarjetaService } from '../../services/tarjeta.service';
import { TarjetaCredito } from '../../models/TarjetaCredito';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-listar-tarjeta',
  templateUrl: './listar-tarjeta.component.html',
  styleUrls: ['./listar-tarjeta.component.css']
})
export class ListarTarjetaComponent implements OnInit {

  arrayTarjetas:TarjetaCredito[] = [];

  constructor( private _listaTarjetService:TarjetaService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.listarTarjetas();
  }

  listarTarjetas(){ 
    this._listaTarjetService.obtenerTarjetas().subscribe(data=>{
      this.arrayTarjetas = [];
        data.forEach((element:any) => {
        this.arrayTarjetas.push({
          id:element.payload.doc.id,
          ...element.payload.doc.data()
        }
        )
      });
    })
  }
  eliminarID(id:any){
      this._listaTarjetService.eliminarTarjeta(id).then(()=>{
        this.toastr.success('Tarjeta', 'La tarjeta se elimino');
      },error => {
        this.toastr.success('Tarjeta', 'Error al eliminar');
      })
  }
  editarTarjeta(tarjeta: TarjetaCredito){
    this._listaTarjetService.editTarjeta(tarjeta);
  }

}
