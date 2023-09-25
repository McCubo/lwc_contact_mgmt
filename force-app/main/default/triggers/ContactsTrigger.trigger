/**
 * @description       :
 * @author            : cubiascaceres
 * @last modified on  : 2023-09-25
 * @last modified by  : cubiascaceres
 **/
trigger ContactsTrigger on Contact(before delete) {
  switch on Trigger.OperationType {
    when BEFORE_DELETE {
      new ContactsTriggerHandler().beforeDelete(Trigger.old, Trigger.oldMap);
    }
  }
}
