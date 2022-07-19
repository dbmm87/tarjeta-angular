import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';

import { TarjetaCredito } from '../models/TarjetaCredito';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  private tarjetaS = new Subject<any>();

  constructor( private firebase: AngularFirestore) { }


  guardadTarjeta(tarjeta:TarjetaCredito):Promise<any> {
    return this.firebase.collection('tarjetas').add(tarjeta);
  }

  obtenerTarjetas():Observable<any>{
    return this.firebase.collection('tarjetas', ref => ref.orderBy('fechaCreacion','desc')).snapshotChanges();
  }
  eliminarTarjeta(id:string):Promise<any>{
    console.log(id);
    return this.firebase.collection('tarjetas').doc(id).delete();
  }
  editTarjetaC(id:string, tarjeta:any):Promise<any>{

    return this.firebase.collection('tarjetas').doc(id).update(tarjeta);
  }
  editTarjeta(tarjeta:TarjetaCredito){
    this.tarjetaS.next(tarjeta);
  }
  getTarjetaEdit():Observable<TarjetaCredito>{
    return this.tarjetaS.asObservable();
  }
}
