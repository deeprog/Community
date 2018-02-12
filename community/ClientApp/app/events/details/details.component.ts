import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { EventsService } from "../events.service"
import { Event } from "../event"

@Component({
    selector: "events-details",
    templateUrl: "./details.component.html",
    styleUrls: ["./details.component.css"]
})
export class DetailsComponent {

    errors: string = "";
    event = new Event();

    constructor(
        private readonly eventsService: EventsService,
        private readonly router: Router,
        private readonly route: ActivatedRoute) {
    }

    ngOnInit(): void {
        var that = this;
        const id = that.route.snapshot.paramMap.get("id");

        if (typeof id == "string" && id.length === 36) {
            that.eventsService.details(id)
                .subscribe(
                    (event: Event[] | Event | string) => {
                        if (that.eventsService.isEvent(event)) {
                            that.event.id = event.id;
                            that.event.name = event.name;
                            that.event.details = event.details;
                            that.event.date = event.date;
                        }
                    },
                    (error: string) => that.errors = error);
        }
    }
}
