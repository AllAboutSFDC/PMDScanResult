public with sharing class CaseController {
    @AuraEnabled(cacheable=true)
    public static List<Case> getCases(){  
        try {
            return [SELECT Id, CaseNumber, Priority, Subject, Status FROM Case];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled(cacheable=true)
    public static List<Case> getCasesFiltered(String priority){
        try {
            return [SELECT Id, CaseNumber, Priority, Subject, Status FROM Case WHERE Priority=:priority];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
