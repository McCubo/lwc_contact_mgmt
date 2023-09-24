/**
 * @description       :
 * @author            : cubiascaceres
 * @last modified on  : 2023-09-25
 * @last modified by  : cubiascaceres
 **/
import { LightningElement, api } from "lwc";
import getContacts from "@salesforce/apex/ContactMgmtController.getContacts";

const MGMT_ACTIONS = [
  { label: "View", name: "view" },
  { label: "Edit", name: "edit" },
  { label: "Delete", name: "delete" }
];

const COLUMNS = [
  { label: "First Name", fieldName: "FirstName" },
  { label: "Last Name", fieldName: "LastName" },
  { label: "Email", fieldName: "Email", type: "email" },
  { label: "Phone", fieldName: "Phone", type: "phone" },
  {
    type: "action",
    typeAttributes: { rowActions: MGMT_ACTIONS }
  }
];
export default class ContactMgmtTable extends LightningElement {
  columns = COLUMNS;
  contacts = [];
  pageNumber = 1;

  connectedCallback() {
    this.loadData();
  }

  loadData() {
    return getContacts({ pageNumber: this.pageNumber })
      .then((result) => {
        let updatedRecords = [...this.contacts, ...result];
        this.contacts = updatedRecords;
        this.error = undefined;
      })
      .catch((error) => {
        this.error = error;
        this.contacts = undefined;
      });
  }

  loadMoreData(event) {
    const { target } = event;
    target.isLoading = true;

    this.pageNumber += 1;
    this.loadData().then(() => {
      target.isLoading = false;
    });
  }

  handleRowAction(event) {
    const selectedAction = event.detail.action.name;
    const row = event.detail.row;
    const tableEvent = new CustomEvent("action", {
      detail: { id: row.Id, action: selectedAction }
    });
    this.dispatchEvent(tableEvent);
  }

  @api
  removeContactFromTable(deletedContactId) {
    this.contacts = this.contacts.filter(
      (contact) => contact.Id !== deletedContactId
    );
  }

  @api
  addContactToTable(contact) {
    this.contacts.unshift(contact);
  }
}
