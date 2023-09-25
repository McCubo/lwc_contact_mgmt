/**
 * @description       :
 * @author            : cubiascaceres
 * @last modified on  : 2023-09-25
 * @last modified by  : cubiascaceres
 **/
import { LightningElement } from "lwc";
import LightningConfirm from "lightning/confirm";
import contactMgmtModal from "c/contactMgmtModal";
import deleteContactById from "@salesforce/apex/ContactMgmtController.deleteContactById";

export default class ContactMgmtApp extends LightningElement {
  contactId;
  modalMode;
  isLoading = false;

  async actionClicked(event) {
    const payload = event.detail;
    this.contactId = payload.id;
    this.modalMode = payload.action;
    if (payload.action === "delete") {
      const confirmation = await LightningConfirm.open({
        label: "Are you sure you want to delete this contact?",
        variant: "header",
        message:
          "This action will permanently delete the contact and its associated records from the database",
        theme: "warning"
      });
      if (confirmation) {
        this.isLoading = true;
        deleteContactById({ contactId: this.contactId })
          .then((result) => {
            if (result) {
              this.template
                .querySelector("c-contact-mgmt-table")
                .removeContactFromTable(this.contactId);
            }
            this.isLoading = false;
          })
          .catch((error) => console.log("error: %O", JSON.stringify(error)));
      }
    } else {
      const result = await contactMgmtModal.open({
        contactId: this.contactId,
        mode: this.modalMode
      });

      if (result !== "close" && result.mode === "edit") {
        this.template
          .querySelector("c-contact-mgmt-table")
          .refreshContactRow(result.contact);
      } else if (result !== "close") {
        this.template
          .querySelector("c-contact-mgmt-table")
          .addContactToTable(result.contact);
      }
    }
  }
}
