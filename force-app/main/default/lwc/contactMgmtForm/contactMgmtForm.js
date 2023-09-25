/**
 * @description       :
 * @author            : cubiascaceres
 * @last modified on  : 2023-09-25
 * @last modified by  : cubiascaceres
 **/
import { LightningElement, api } from "lwc";

export default class ContactMgmtForm extends LightningElement {
  @api
  mode;
  @api
  contact;
  _contact;

  @api
  get formData() {
    return this._contact;
  }

  renderedCallback() {
    this._contact = Object.assign({}, this.contact);
  }

  handleInputChange(event) {
    this._contact[event.target.name] = event.detail.value;
  }

  @api
  validate() {
    const inputElements = Array.from(
      this.template.querySelectorAll("lightning-input")
    );
    let isValid = inputElements.reduce((acc, inputField) => {
      inputField.reportValidity();
      return acc && inputField.checkValidity();
    }, true);
    return isValid;
  }
}
