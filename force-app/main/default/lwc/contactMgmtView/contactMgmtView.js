/**
 * @description       :
 * @author            : cubiascaceres
 * @last modified on  : 2023-09-24
 * @last modified by  : cubiascaceres
 **/
import { LightningElement, api } from "lwc";
import FULL_NAME from "@salesforce/schema/Contact.Name";
import EMAIL from "@salesforce/schema/Contact.Email";
import PHONE from "@salesforce/schema/Contact.Phone";

export default class ContactMgmtView extends LightningElement {
  @api
  contactId;
  cName = FULL_NAME;
  cPhone = PHONE;
  cEmail = EMAIL;
}
