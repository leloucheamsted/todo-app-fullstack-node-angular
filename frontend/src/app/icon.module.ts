import { NgModule } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
@NgModule({
    imports: []
})
export class IconModule {
    private path = "./assets/icons";
    constructor(private domSanitizer: DomSanitizer,
        public matIconRegistry: MatIconRegistry) {
        this.matIconRegistry.addSvgIcon("menu", this.setPath(`${this.path}/menu.svg`))
        this.matIconRegistry.addSvgIcon("huge", this.setPath(`${this.path}/huge.svg`))
        this.matIconRegistry.addSvgIcon("search", this.setPath(`${this.path}/search.svg`))
        this.matIconRegistry.addSvgIcon("calendar", this.setPath(`${this.path}/calendar.svg`))
        this.matIconRegistry.addSvgIcon("down", this.setPath(`${this.path}/down.svg`))
        this.matIconRegistry.addSvgIcon("next", this.setPath(`${this.path}/next.svg`))
        this.matIconRegistry.addSvgIcon("note", this.setPath(`${this.path}/note.svg`))
        this.matIconRegistry.addSvgIcon("plus", this.setPath(`${this.path}/plus.svg`))
        this.matIconRegistry.addSvgIcon("tasks", this.setPath(`${this.path}/tasks.svg`))
        this.matIconRegistry.addSvgIcon("upcoming", this.setPath(`${this.path}/upcoming.svg`))
        this.matIconRegistry.addSvgIcon("empty", this.setPath(`${this.path}/empty.svg`))


    }
    private setPath(url: string): SafeResourceUrl {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    }
}