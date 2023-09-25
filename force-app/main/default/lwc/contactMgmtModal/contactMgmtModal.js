/**
 * @description       :
 * @author            : cubiascaceres
 * @last modified on  : 2023-09-25
 * @last modified by  : cubiascaceres
 **/
import { api } from "lwc";
import LightningModal from "lightning/modal";
import getContactById from "@salesforce/apex/ContactMgmtController.getContactById";
import upsertRecord from "@salesforce/apex/ContactMgmtController.upsertRecord";

export default class ContactMgmtModal extends LightningModal {
  @api
  mode;
  @api
  contactId;
  contact = {};

  connectedCallback() {
    if (this.mode === "edit") {
      getContactById({ contactId: this.contactId })
        .then((result) => {
          this.contact = result;
        })
        .catch((error) => console.log("error: %O", JSON.stringify(error)));
    }
  }

  get isViewMode() {
    return this.mode === "view";
  }

  get isEditable() {
    return this.mode === "insert" || this.mode === "edit";
  }

  handleUpsert() {
    if (this.template.querySelector("c-contact-mgmt-form").validate()) {
      let contactData = this.template.querySelector(
        "c-contact-mgmt-form"
      ).formData;
      upsertRecord({ contact: contactData })
        .then((result) => {
          this.close({ mode: this.mode, contact: result });
        })
        .catch((error) => console.log("error: %O", JSON.stringify(error)));
    }
  }

  handleClose() {
    this.close("close");
  }
}
