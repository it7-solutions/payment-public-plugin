import {Component} from '@angular/core';
import {PluginConfig} from "../services/plugin.config";
import {DataManagerService} from "../services/data-manager.service";
import {toConsole} from "../modules/debug/to-console";
import {ImprintInfo} from "../models/imprint-info";
import {PaymentAggregateService} from "../services/payment-aggregate.service";
import {PopupService} from "../services/popup.service";
import {BusyPopup} from "./busy-popup.component";
import {PaymentAggregate} from "../models/payment-aggregate";

@Component({
    selector: 'imprint-block',
    templateUrl: PluginConfig.buildTemplateUrl('templates/imprint-block.html')
})
export class ImprintBlockComponent {
    public imprint: ImprintInfo;
    public iAgree: boolean = false;

    constructor(
        private config: PluginConfig,
        private pas: PaymentAggregateService,
        private popupService: PopupService,
        private dm: DataManagerService
    ) {
        pas.onUpdate.subscribe(pa => this.updateInfo(pa));
        this.updateInfo(pas.item);
    }

    /**
     * If customer agree to terms and conditions
     * get special options for datatrans
     * and call external JS-method (method must reload page anyway)
     */
    public doImprintValidation(){
        if(this.iAgree){
            this.dm.getImprintDTForm().then(d => {
                this.popupService.showPopup(new BusyPopup());
                this.config.do_imprint_validation(d);
            });
        }
    }

    private updateInfo(paymentAggregate: PaymentAggregate){
        this.imprint = paymentAggregate.imprint_info;
    }
}