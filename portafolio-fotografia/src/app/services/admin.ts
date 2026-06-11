import { Injectable, inject, signal } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, authState } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private auth = inject(Auth);
  
  isAdmin = signal(false);

  constructor() {
    authState(this.auth).subscribe((user: any) => {
  this.isAdmin.set(!!user);
    });
  }

  async login(email: string, pass: string) {
    return await signInWithEmailAndPassword(this.auth, email, pass);
  }

  async logout() {
    await signOut(this.auth);
  }
}