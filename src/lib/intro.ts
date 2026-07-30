/* The loadup intro belongs to a fresh page load, not to in-app navigation. This
   flag lives in module scope, which survives client-side route changes and
   resets on a real reload — exactly the lifetime we want. */
let navigatedInApp = false;

export function markInAppNavigation(): void {
	navigatedInApp = true;
}

export function hasNavigatedInApp(): boolean {
	return navigatedInApp;
}
