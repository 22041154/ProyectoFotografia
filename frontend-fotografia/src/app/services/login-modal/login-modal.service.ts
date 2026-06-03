import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginModalService {
  private abierto$ = new BehaviorSubject<boolean>(false);
  estado$ = this.abierto$.asObservable();

  abrir() { this.abierto$.next(true); }
  cerrar() { this.abierto$.next(false); }
}