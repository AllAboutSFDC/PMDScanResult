import { LightningElement,wire,track } from 'lwc';
import getCases from '@salesforce/apex/CaseController.getCases';
import getCasesFiltered from '@salesforce/apex/CaseController.getCasesFiltered';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import CASE_OBJECT from '@salesforce/schema/Case';
import PRIORITY_FIELD from '@salesforce/schema/Case.Priority'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const COLS=[
    {label:'Case Number',type:'Text',fieldName:'CaseNumber'},
    {label:'Subject',type:'Text',fieldName:'Subject'},
    {label:'Priority', type:'Text',fieldName:'Priority'},
    {label:'Status',type:'Text',fieldName:'Status'},

]
const FILTER_COLS=[
    {label:'Case Number',type:'Text',fieldName:'CaseNumber'},
    {label:'Subject',type:'Text',fieldName:'Subject'},
    {label:'Status',type:'Text',fieldName:'Status'},
    {label:'Priority', type:'Text',fieldName:'Priority'}
]
export default class JestSessionExample3 extends LightningElement {
    columns=COLS;
    filterColumns=FILTER_COLS;
    cases=[];
    casePriority=[];
    filterFlag;
    @track combobox;
    @track flag;
    greeting="World"; 
    @track displayCaseRecords='Display Case Records';
    @wire(getObjectInfo,{objectApiName:CASE_OBJECT})
    caseObjectMetadata;

    // @track greeting="World"
    // handleInputChange(event)
    // {
    //     this.greeting=event.target.value;
    // }
    ClickEvent()
    {
        this.flag=true;
        

    }
    handleClick(){
        const child=this.template.querySelector('c-jest-session-example3-child');
        this.greeting=child.inputText;
    }
    @wire(getCasesFiltered,{priority: '$combobox'})
    casesFiltered({data,error})
    {
        if(data)
        {
            //console.log('Filtered Dat',data);
            this.cases=data;
            console.log('Cases Filtered',JSON.stringify(this.cases));

        }
        else
        {
            console.log('Error',error);
        }
    }

    @wire(getPicklistValues,{recordTypeId:'$caseObjectMetadata.data.defaultRecordTypeId',fieldApiName:PRIORITY_FIELD})
    CasePriorityPicklist({error,data})
    {
        if(data)
        {
            console.log('Picklist  data',JSON.stringify(data));
            console.log('Picklist values priority',data.values);
            console.log('Picklist values priority string',JSON.stringify(data.values));
            this.casePriority=data.values;
            this.fetchCases();
        }
        else 
        {
            console.log(error);
        }
    }
    handleComboboxChange( event ) {
        this.combobox=event.detail.value;
        this.filterFlag=true;
        const event1 = new ShowToastEvent({
            title: 'Success!',
            message: 'Records displayed successfully based on priority '+this.combobox,
            variant:'Success',
            messageData: [
                'Salesforce',
                {
                    url: 'http://www.salesforce.com/',
                    label: 'here',
                },
            ],
        });
        this.dispatchEvent(event1);
        // const event2 = new ShowToastEvent({
        //     title: 'Success!',
        //     message: 'Records displayed successfully based on priority '+this.combobox,
        //     variant:'error',
        //     messageData: [
        //         'Salesforce',
        //         {
        //             url: 'http://www.salesforce.com/',
        //             label: 'here',
        //         },
        //     ],
        // });
        // this.dispatchEvent(event2);

        console.log('Combobox values',this.combobox);
    }

    fetchCases(){
        getCases().then((result)=>{
            //let options=[];
            console.log('All cases',JSON.stringify(result));
            console.log('Hello',this.casePriority);
            this.cases=result;
            console.log(this.cases);
            this.error=undefined;
        
        })
        .catch((error)=>{
            console.log(error);
            this.error=error;
            this.cases=undefined;
        })
    }
   
    
}