import { Component } from "@angular/core";
import { Router } from "@angular/router"
import { AccountService } from "../account/account.service"

@Component({
    selector: "nav-menu",
    templateUrl: "./nav-menu.component.html",
    styleUrls: ["./nav-menu.component.css"]
})
export class NavMenuComponent {

    isLoggedIn: boolean = false;

    constructor(
        private readonly router: Router,
        private readonly accountService: AccountService) {
        this.isLoggedIn = accountService.hasToken();
        accountService
            .isLoggedIn
            .subscribe((res: boolean) => this.isLoggedIn = res);
    }

    logout(): void {
        this.accountService
            .logout()
            .subscribe(() => this.router.navigate(["/Home"]));
    }
}
