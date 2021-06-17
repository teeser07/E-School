import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utils } from '../utils';

@Injectable({
    providedIn: 'root'
})
export class DataLayerService {

    constructor(
        private http: HttpClient
    ) { }


    getInvoices() {
        return this.http.disableApiPrefix().get<any[]>('api/invoices');
    }
    getInvoice(id) {
        return this.http.disableApiPrefix().get<any[]>('api/invoices/'+id);
    }
    saveInvoice(invoice) {
        if(invoice.id) {
            return this.http.disableApiPrefix().put<any[]>('api/invoices/'+invoice.id, invoice);
        } else {
            invoice.id = Utils.genId();
            return this.http.disableApiPrefix().post<any[]>('api/invoices/', invoice);
        }
    }
    deleteInvoice(id) {
        return this.http.disableApiPrefix().delete<any[]>('api/invoices/'+id);
    }
    getMails() {
        return this.http.disableApiPrefix().get<any[]>('api/mails');
    }
    getCountries() {
        return this.http.disableApiPrefix().get<any[]>('api/countries');
    }
    getProducts() {
        return this.http.disableApiPrefix().get<any[]>('api/products');
    }
}
