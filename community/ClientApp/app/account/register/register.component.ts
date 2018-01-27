import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AccountService } from "../account.service"
import { Register } from "./register"

@Component({
    selector: "app-registration-form",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.css"]
})
export class RegisterComponent {

    errors: string = "";
    isRequesting: boolean = false;
    submitted: boolean = false;

    constructor(private readonly accountService: AccountService, private readonly router: Router) {}

    register({ value, valid }: { value: Register, valid: boolean }) {

        var that = this;
        that.submitted = true;

        if (valid) {
            that.isRequesting = true;
            that.accountService
                .register(value)
                .finally(() => that.isRequesting = false)
                .subscribe(
                    result => {
                        if (result) {
                            if (typeof value.returnUrl !== "undefined") {
                                that.router.navigate([value.returnUrl]);
                            } else {
                                that.router.navigate(["/"]);
                            }
                        }
                    },
                    errors => that.errors = errors);
        }
    }
}