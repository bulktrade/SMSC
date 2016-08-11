/*
 * These are globally available directives in any template
 */
// Angular 2
import { PLATFORM_DIRECTIVES } from "@angular/core";
import { REACTIVE_FORM_DIRECTIVES, FORM_DIRECTIVES } from "@angular/forms";
import { MdCard, MD_CARD_DIRECTIVES } from "@angular2-material/card/card";
import { CORE_DIRECTIVES } from "@angular/common";
import { MdButton } from "@angular2-material/button/button";
import { MD_INPUT_DIRECTIVES } from "@angular2-material/input/input";
import { MdToolbar } from "@angular2-material/toolbar/toolbar";
import { MdSlideToggle } from "@angular2-material/slide-toggle/slide-toggle";
import { MdIcon } from "@angular2-material/icon/icon";
import { MdProgressCircle, MdSpinner } from "@angular2-material/progress-circle/progress-circle";
import { ROUTER_DIRECTIVES } from "@angular/router";

// Angular 2 forms

// application_directives: directives that are global through out the application
export const APPLICATION_DIRECTIVES = [
    ...REACTIVE_FORM_DIRECTIVES,
    MdCard,
    CORE_DIRECTIVES,
    MdButton,
    MD_INPUT_DIRECTIVES,
    MdToolbar,
    FORM_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MdSlideToggle,
    MdIcon,
    MdProgressCircle,
    MdSpinner
];

export const DIRECTIVES = [
    { provide: PLATFORM_DIRECTIVES, multi: true, useValue: APPLICATION_DIRECTIVES }
];
