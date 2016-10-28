import { Injectable } from '@angular/core';
import { AuthGuard } from '../common/auth.guard';

@Injectable()
export class DashboardGuard extends AuthGuard {

}
