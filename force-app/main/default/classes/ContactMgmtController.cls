/**
 * @description       :
 * @author            : cubiascaceres
 * @last modified on  : 2023-09-25
 * @last modified by  : cubiascaceres
 **/
public with sharing class ContactMgmtController {
  /**
   * @description
   * @param pageNumber
   * @return List<Contact>
   **/
  @AuraEnabled(cacheable=true)
  public static List<Contact> getContacts(Integer pageNumber) {
    try {
      return new ContactsSelector().selectByPageNumber(pageNumber);
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  /**
   * @description
   * @param contactId
   * @return Contact
   **/
  @AuraEnabled
  public static Contact getContactById(String contactId) {
    try {
      return new ContactsSelector().selectById(contactId);
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  /**
   * @description
   * @param contactId
   * @return String
   **/
  @AuraEnabled
  public static Boolean deleteContactById(Id contactId) {
    try {
      return new ContactsService()
        .deleteByIds(new List<Id>{ contactId }, true)
        .contains(contactId);
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  /**
   * @description
   * @param contact
   * @return Contact
   **/
  @AuraEnabled
  public static Contact upsertRecord(Contact contact) {
    try {
      return new ContactsService()
        .upsertRecords(new List<Contact>{ contact })
        .get(0);
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}
