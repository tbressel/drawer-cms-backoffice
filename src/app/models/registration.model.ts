export class RegistrationModel {
    firstName!: string;
    lastName!: string;
    username!: string;
    password!: string;
    email!: string;
    token!: string;
    refreshToken!: string;

}

export class LoginModel {
    username!: string;
    password!: string;
}
export class SigninModel {
    username!: string;
    password!: string;
    email!: string;
}