import {Component, Input} from '@angular/core';
import {PluginConfig} from "../services/plugin.config";
import {DataManagerService} from "../services/data-manager.service";
import {toConsole} from "../modules/debug/to-console";
import {PaymentInvoice} from "../models/payment-invoice";

@Component({
    selector: 'resources-invoice',
    templateUrl: PluginConfig.buildTemplateUrl('templates/resources-invoice.html')
})
export class ResourcesInvoiceComponent {
    @Input() invoice: PaymentInvoice;

    constructor(
        private config: PluginConfig,
        private dm: DataManagerService
    ) {

    }
}