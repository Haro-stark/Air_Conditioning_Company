import { Directive, OnInit, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Directive({
  selector: '[appUser]'
})
export class UserDirective implements OnInit {
  constructor(
    private templateRef: TemplateRef<any>,
    private authService: AuthenticationService,
    private viewContainer: ViewContainerRef
  ) { }

  ngOnInit() {
    const hasAccess = this.authService.isAuthorized();

    if (hasAccess) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
