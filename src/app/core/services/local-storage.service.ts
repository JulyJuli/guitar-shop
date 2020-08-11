import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
    private storage = window.localStorage;

    setItem(key: any, value: any): void {
        this.storage.setItem(JSON.stringify(key), JSON.stringify(value));
        console.log(key, ' is set.');
    }

    getItem(key: string): string {
        return JSON.parse(this.storage.getItem(JSON.stringify(key)));
    }

   removeItem(key: string): void {
        this.storage.removeItem(key);
        console.log(key, 'is removed.');
    }
}
