export type HammerStatic = new(element: HTMLElement | SVGElement, options?: any) => HammerManager;

/** @docs-private */
export interface HammerManager {
    on(arg0: string, arg1: any): unknown;
    get(eventName: string): HammerManager;

    set(options: any): HammerManager;
}
