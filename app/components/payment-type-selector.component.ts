import {Component, Input} from '@angular/core';
import {PluginConfig} from "../services/plugin.config";
import {DataManagerService} from "../services/data-manager.service";
import {toConsole} from "../modules/debug/to-console";
import {PaymentInvoice} from "../models/payment-invoice";

@Component({
    selector: 'payment-type-selector',
    templateUrl: PluginConfig.buildTemplateUrl('templates/payment-type-selector.html')
})
export class PaymentTypeSelectorComponent {
    @Input() invoice: PaymentInvoice;

    constructor(
        private config: PluginConfig,
        private dm: DataManagerService
    ) {

    }

    /**
     * If enable changing payment type
     * call method for save changes
     */
    public changeType() {
        if(!this.invoice.lock_payment_type){
            this.dm.changeInvoice(this.invoice);
        }
    }
}