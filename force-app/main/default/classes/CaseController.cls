/**
 * Name: CaseController
 * Description: Case Controller class
 * CreatedDate: 02/02/2023
 * Modified Date: 04/10/2023
 * Modified By: Asif Jamal
 */
public with sharing class CaseController {

    /**
     * Method Name: getCases
     * Description: Fetch Case Records
    */
    @AuraEnabled(cacheable=true)
    public static List<Case> getCases(){
        try {
            return [SELECT Id, CaseNumber, Priority, Subject, Status FROM Case WITH SECURITY_ENFORCED Limit 1];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    /**
     * Method Name: getCasesFiltered
     * Description: Fetch Case Records with filter
    */
    @AuraEnabled(cacheable=true)
    public static List<Case> getCasesFiltered(String priority){
        try {
            return [SELECT Id, CaseNumber, Priority, Subject, Status FROM Case WHERE Priority=:priority WITH SECURITY_ENFORCED Limit 1];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}