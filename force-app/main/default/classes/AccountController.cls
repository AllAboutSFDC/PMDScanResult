public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        
         // FOR PMD CHECK adding below code
        for(Integer i=0; i=9; i++){

            List<Account> accList = [SELECT Id, Name FROM Account WITH SECURITY_ENFORCED LIMIT 10];

        }
        return [SELECT Id, Name FROM Account WITH SECURITY_ENFORCED LIMIT 10];
    }

    @AuraEnabled(cacheable=true)
    public static Account getSingleAccount() {
        return [
            SELECT Id, Name, Phone, Type
            FROM Account
            WITH SECURITY_ENFORCED
            LIMIT 1
        ];
    }
}
