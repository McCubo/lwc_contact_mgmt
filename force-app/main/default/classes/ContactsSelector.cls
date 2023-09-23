/**
 * @description       : apex class holds all SOQL queries for standard `Contact` object
 * @author            : cubiascaceres
 * @last modified on  : 2023-09-23
 * @last modified by  : cubiascaceres
 **/

public with sharing class ContactsSelector {
  private static final Integer RECORDS_PER_PAGE = 5;

  /**
   * @description
   * @param pageNumber
   * @return List<Contact>
   **/
  public List<Contact> selectByPageNumber(Integer pageNumber) {
    Integer offset = RECORDS_PER_PAGE * (pageNumber - 1);
    return [
      SELECT Id, LastName, FirstName, Email, Phone
      FROM Contact
      WITH SECURITY_ENFORCED
      LIMIT :RECORDS_PER_PAGE
      OFFSET :offset
    ];
  }

  /**
   * @description
   * @param contactId
   * @return Contact
   **/
  public Contact selectById(Id contactId) {
    return [
      SELECT Id, LastName, FirstName, Email, Phone
      FROM Contact
      WHERE Id = :contactId
      WITH SECURITY_ENFORCED
    ];
  }

  /**
   * @description
   * @return Integer
   **/
  public Integer getTotalContacts() {
    AggregateResult[] groupedResults = [
      SELECT COUNT(Id) cc
      FROM Contact
      WITH SECURITY_ENFORCED
    ];
    return Integer.valueOf(groupedResults[0].get('cc'));
  }
}
