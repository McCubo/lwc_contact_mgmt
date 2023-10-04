/**
 * @description       :
 * @author            : cubiascaceres
 * @last modified on  : 2023-09-25
 * @last modified by  : cubiascaceres
 **/
public with sharing class ContactsService {
  /**
   * @description first, case records associated to contacts are deleted (to avoid dependency errors while deleting contact) (trigger)
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
