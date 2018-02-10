﻿import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";

import { AppService } from "../app.service";
import { Event } from "./event"

@Injectable()
export class EventsService extends AppService {

    constructor(private readonly http: HttpClient) {
        super();
    }

    getEvents(): Observable<Event[]> {

        return this.http
            .get<Event[]>("/events/index")
            .catch(this.handleError);
    }

    getEvent(id: string): Observable<Event> {
        
        return this.http
            .get<Event>(`/events/details/?id=${id}`)
            .catch(this.handleError);
    }

    createEvent(event: Event): Observable<Event> {

        const that = this,
            body = JSON.stringify(event),
            options = { headers: that.headers };
        
        return that.http
            .post<Event>("/events/create", body, options)
            .catch(that.handleError);
    }
}