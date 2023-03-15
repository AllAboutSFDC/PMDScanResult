@isTest
public with sharing class TestContactController {
   

    @isTest
    static void getContactList() {
        TestContactController.createContacts(10);

        Test.startTest();
        List<Contact> conts = ContactController.getContactList();
        Test.stopTest();

        Assert.areEqual(10, conts.size(), 'The contact list size should be 10');
    }

   
}
