/**
 * @description       :
 * @author            : cubiascaceres
 * @last modified on  : 2023-09-25
 * @last modified by  : cubiascaceres
 **/
import { LightningElement, api } from "lwc";
import getContacts from "@salesforce/apex/ContactMgmtController.getContacts";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

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
    const event = new ShowToastEvent({
      title: "Record deleted.",
      message: "Contact has been successfully deleted.",
      variant: "success"
    });
    this.dispatchEvent(event);
  }

  @api
  addContactToTable(contact) {
    let _contacts = JSON.parse(JSON.stringify(this.contacts));
    _contacts.unshift(contact);
    this.contacts = _contacts;
    const event = new ShowToastEvent({
      title: "Record created.",
      message: "New contact record has been successfully created.",
      variant: "success"
    });
    this.dispatchEvent(event);
  }

  @api
  refreshContactRow(updatedContact) {
    this.contacts = this.contacts.filter(
      (contact) => contact.Id !== updatedContact.Id
    );
    this.contacts.unshift(updatedContact);
    const event = new ShowToastEvent({
      title: "Record updated.",
      message: "Record has been successfully updated.",
      variant: "success"
    });
    this.dispatchEvent(event);
  }
}
