import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Event } from "../event"

@Component({
    selector: "events-details",
    templateUrl: "./details.component.html",
    styleUrls: ["./details.component.css"]
})
export class DetailsComponent implements OnInit {

    model = new Event();

    constructor(private readonly route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.model = this.route.snapshot.data["event"];
    }
}
