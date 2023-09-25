/**
 * @description       :
 * @author            : cubiascaceres
 * @last modified on  : 2023-09-25
 * @last modified by  : cubiascaceres
 **/
public with sharing class CasesSelector {
  /**
   * @description
   * @param contactIds
   * @return List<Case>
   **/
  public List<Case> selectByContactId(List<Id> contactIds) {
    return [
      SELECT Id
      FROM Case
      WHERE ContactId IN :contactIds
      WITH SECURITY_ENFORCED
    ];
  }
}
