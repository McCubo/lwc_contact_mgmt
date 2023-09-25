/**
 * @description       :
 * @author            : cubiascaceres
 * @last modified on  : 2023-09-25
 * @last modified by  : cubiascaceres
 **/
public with sharing class ContactsTriggerHandler {
  /**
   * @description
   * @param contacts
   * @param oldContactsMap
   **/
  public void beforeDelete(
    List<Contact> contacts,
    Map<Id, Contact> oldContactsMap
  ) {
    this.deleteRelatedCases(new List<Id>(oldContactsMap.keySet()));
  }

  private void deleteRelatedCases(List<Id> contactIds) {
    Database.delete(new CasesSelector().selectByContactId(contactIds));
  }
}
