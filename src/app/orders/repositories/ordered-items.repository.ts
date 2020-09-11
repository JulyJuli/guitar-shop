import { Injectable } from '@angular/core';

@Injectable()
export class OrderedItemsRepository {
    ordersIds: string[] = [];

    addId(id: string): void {
        this.ordersIds.push(id);
    }
}
