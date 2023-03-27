import { LightningElement,api } from 'lwc';

export default class JestSessionExample3Child extends LightningElement {
    @api  inputText;

    greeting="world";
    handleInputChange(event)
    {
        this.inputText=event.detail.value;
    }
}