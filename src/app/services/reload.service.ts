import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})


export class ReloadService {
    reload$ = new Subject<void>();

    triggerReload() {
        this.reload$.next();
    }
}