/**
 * @description       :
 * @author            : cubiascaceres
 * @last modified on  : 2023-09-25
 * @last modified by  : cubiascaceres
 **/
public with sharing class ContactsService {
  /**
   * @description
   * @param contactIds
   * @param allOrNone
   * @return List<Id>
   **/
  public List<Id> deleteByIds(List<Id> contactIds, Boolean allOrNone) {
    List<Id> deletedIds = new List<Id>();
    List<Database.DeleteResult> deleteResults = Database.delete(
      contactIds,
      allOrNone
    );
    for (Database.DeleteResult deleteResult : deleteResults) {
      if (deleteResult.isSuccess()) {
        deletedIds.add(deleteResult.getId());
      }
    }
    return deletedIds;
  }

  /**
   * @description
   * @param contacts
   * @return List<Contact>
   **/
  public List<Contact> upsertRecords(List<Contact> contacts) {
    Database.upsert(contacts, false);
    return contacts;
  }
}
