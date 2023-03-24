/***
 * Class Name: AccountController
 * Description: 'Fetching records'
 * Created Date: 02/03/2023
 * Created By: Asif Jamal
 */
public with sharing class AccountController {
    /**
     * Name: getAccountList
     * Description: Getting Account records
     * Created Date: 06?03/2023
     */
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        return [SELECT Id, Name FROM Account WITH SECURITY_ENFORCED LIMIT 10];
    }

    /**
     * Name: getSingleAccount
     * Description: Getting Account records
     * Created Date: 06?03/2023
     */
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
