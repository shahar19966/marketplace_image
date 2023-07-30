import { CanDeactivateFn } from '@angular/router';
import { NewItemComponent } from '../images/new-item/new-item.component';

export const deactivationGuard: CanDeactivateFn<NewItemComponent> = (
  component
) => {
  if (component.hasUnsavedChanges) {
    return window.confirm(
      'You have unsaved changes. Are you sure you want to leave this page?'
    );
  }
  return true;
};
