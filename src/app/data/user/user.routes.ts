import { LoginComponent } from "../login/login.component";
import { UserProfileComponent } from "../user-profile/user-profile.component";


export const userRoutes = [
  {path: 'profile', component: UserProfileComponent},
  {path: 'login', component: LoginComponent}
]
