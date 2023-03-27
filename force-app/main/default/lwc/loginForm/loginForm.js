import { LightningElement } from 'lwc';

export default class LoginForm extends LightningElement {
    
    email;
    password;
    message;
    handleEmailChange(event) {
        this.email = event.detail.value;
    }
    handlepasswordChange(event) {
        this.password = event.target.value;
    }

    handleLogin() {
        if (!this.email) {
            this.message = "Please enter email";
            return;
        }
        if (!this.password) {
            this.message = "Please enter password";
            return;
        }
        this.message = "Logged in as " + this.email;
    }
    handleForgetPassword() {
        this.message = "Your Password successfully reset";
    }
}