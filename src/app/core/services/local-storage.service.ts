import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
    useClass: LocalStorageService
})
export class LocalStorageService {
    private storage = window.localStorage;
    
    setItem(key: any, value: any): void {
        this.storage.setItem(key, value);
    } 
    
    getItem(key: any): any {
        return this.storage[key];
    } 

   removeItem(key: any): void {
        this.storage.removeItem(key);
    }
}
