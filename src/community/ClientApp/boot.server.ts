import "reflect-metadata";
import "zone.js";
import { first, filter } from "rxjs/operators";
import { APP_BASE_HREF } from "@angular/common";
import { enableProdMode, ApplicationRef, NgZone } from "@angular/core";
import { platformDynamicServer, PlatformState, INITIAL_CONFIG } from "@angular/platform-server";
import { createServerRenderer, RenderResult } from "aspnet-prerendering";
import { AppModule } from "./app/app.module.server";

enableProdMode();

export default createServerRenderer(params => {
    const providers = [
        { provide: INITIAL_CONFIG, useValue: { document: "<app></app>", url: params.url } },
        { provide: APP_BASE_HREF, useValue: params.baseUrl },
        { provide: "BASE_URL", useValue: params.origin + params.baseUrl }
    ];

    return platformDynamicServer(providers).bootstrapModule(AppModule).then(moduleRef => {
        const appRef = moduleRef.injector.get(ApplicationRef);
        const state = moduleRef.injector.get(PlatformState);
        const zone = moduleRef.injector.get(NgZone);

        return new Promise<RenderResult>((resolve, reject) => {
            zone.onError.subscribe((errorInfo: any) => reject(errorInfo));
            appRef.isStable.pipe(
                filter((isStable: boolean) => isStable),
                first(), )
                .subscribe(() => {
                    // Because 'onStable' fires before 'onError', we have to delay slightly before
                    // completing the request in case there's an error to report
                    setImmediate(() => {
                        resolve({
                            html: state.renderToString()
                        });
                        moduleRef.destroy();
                    });
                });
        });
    });
});