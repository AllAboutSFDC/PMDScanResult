public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        return [SELECT Id, Name FROM Account ];
    }
     @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        Account[] aclist = [SELECT Id, Name FROM Account ];
        for(Account ac: aclist){
            ac.name = 'test';
            update ac;
        }
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
