import { OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

export type Constructor<T> = new (...args: any[]) => T;

export class Base { }

export function destroySubscribe<T extends Constructor<{}>>(base: T) {
    return class extends base implements OnDestroy {
        public readonly unSubscribe$ = new Subject<void>();

        constructor(...args: any[]) { super(...args); }

        ngOnDestroy() {
            console.log('destroy')
            this.unSubscribe$.next();
            this.unSubscribe$.complete();
        }
    }
}

export const unSubscribe = destroySubscribe(Base)