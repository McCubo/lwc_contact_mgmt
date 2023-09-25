/**
 * @description       :
 * @author            : cubiascaceres
 * @last modified on  : 2023-09-25
 * @last modified by  : cubiascaceres
 **/
import { LightningElement } from "lwc";

export default class ContactMgmtHeader extends LightningElement {
  handleNewClick() {
    const headerEvent = new CustomEvent("action", {
      detail: { id: null, action: "insert" }
    });
    this.dispatchEvent(headerEvent);
  }
}
