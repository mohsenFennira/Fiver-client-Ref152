import { trigger, transition, style, animate } from '@angular/animations';

export const routeTransitionAnimations = trigger('routeTransitionAnimations', [
  transition('* <=> *', [
    style({ opacity: 0 }),
    animate('0.2s', style({ opacity: 1 })),
  ]),
]);
