import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { AddressesService } from "../addresses.service"
import { Address } from "../address"

@Component({
    selector: "addresses-details",
    templateUrl: "./details.component.html",
    styleUrls: ["./details.component.css"]
})
export class DetailsComponent {

    errors: string = "";
    address = new Address();

    constructor(
        private readonly addressesService: AddressesService,
        private readonly router: Router,
        private readonly route: ActivatedRoute) {
    }

    ngOnInit(): void {
        var that = this;
        const id = that.route.snapshot.paramMap.get("id");

        if (typeof id == "string" && id.length === 36) {
            that.addressesService.details(id)
                .subscribe(
                    (address: Address[] | Address | string) => {
                        if (that.addressesService.isAddress(address)) {
                            that.address.id = address.id;
                            that.address.street = address.street;
                            that.address.street2 = address.street2;
                            that.address.city = address.city;
                            that.address.state = address.state;
                            that.address.zipCode = address.zipCode;
                        }
                    },
                    (error: string) => that.errors = error);
        }
    }
}
