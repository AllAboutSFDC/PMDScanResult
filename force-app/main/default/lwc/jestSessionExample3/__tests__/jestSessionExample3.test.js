import { createElement } from 'lwc';
import JestSessionExample3 from 'c/jestSessionExample3';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import getCases from '@salesforce/apex/CaseController.getCases';
import getCasesFiltered from '@salesforce/apex/CaseController.getCasesFiltered';


async function flushPromises()
{
    return Promise.resolve();
}

jest.mock(
    '@salesforce/apex/CaseController.getCases',
    () => {
      return {
        default: jest.fn()
      };
    },
    { virtual: true }
  );
jest.mock(
    "@salesforce/apex/CaseController.getCasesFiltered",
    () => {
        const { createApexTestWireAdapter } = require("@salesforce/sfdx-lwc-jest");
        return {
            default: createApexTestWireAdapter(jest.fn()),
        };
    },
    { virtual: true }
);
const mockPicklistValues=require('./data/mockPicklistValues.json');
const mockGetCases=require('./data/mockGetCases.json');
const mockGetCasesFiltered=require('./data/mockGetCasesFiltered.json');
// // 
describe('c-jest-session-example3', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(()=>{
        const element= createElement('c-jest-session-example3',{
          is: JestSessionExample3
        });
        document.body.appendChild(element);
      });

    it('Child lightning input data binding',async () => {
        const element=document.body.querySelector('c-jest-session-example3');
        const child=element.shadowRoot.querySelector('c-jest-session-example3-child');
        const inputs=child.shadowRoot.querySelectorAll('lightning-input');
        inputs[0].value='Team';
        inputs[0].dispatchEvent(new CustomEvent('change',{
          detail:{value:inputs[0].value}
        }));
        
        const button=element.shadowRoot.querySelector('lightning-button');
        button.click();
        await flushPromises();
        const h1Tag=element.shadowRoot.querySelector('h1');
       
        expect(inputs[0].value).toBe('Team');
        expect(h1Tag.textContent).toBe('Hello Team!!');

        
        
    });
    it('Display case records button click check', async() => {
        const element=document.body.querySelector('c-jest-session-example3');
        const buttons=element.shadowRoot.querySelectorAll('lightning-button');
        const combobox=element.shadowRoot.querySelector('lightning-combobox');
        const datatable=element.shadowRoot.querySelector('lightning-datatable');
        expect(combobox).toBeNull();
        expect(datatable).toBeNull();
        buttons[1].click();
        await flushPromises();
        expect(combobox).toBeDefined();
        expect(datatable).toBeDefined();

        
    });
    it('wired method mocking',()=>{
        const element=document.body.querySelector('c-jest-session-example3');
        getCases.mockResolvedValue(mockGetCases);
        getPicklistValues.emit(mockPicklistValues);
        getCasesFiltered.emit(mockGetCasesFiltered);
        expect(element).toBeDefined();
    })
    it('wired method mocking error',()=>{
        const element=document.body.querySelector('c-jest-session-example3');
        getCases.mockRejectedValue(null);
        getPicklistValues.emit(mockPicklistValues);
        expect(element).toBeDefined();
    });
    it('Check data binding of combobox',async()=>{
      const element=document.body.querySelector('c-jest-session-example3');
      const buttons=element.shadowRoot.querySelectorAll('lightning-button');
      buttons[1].click();
      await flushPromises();
      const handler=jest.fn();
      element.addEventListener('lightning__showtoast',handler);

      const combobox=element.shadowRoot.querySelector('lightning-combobox');
      combobox.value='High';
      combobox.dispatchEvent(new CustomEvent('change',{
        detail:{
          value:combobox.value
        }
      }));
      expect(combobox.value).toBe('High');
      expect(handler).toHaveBeenCalled();
      console.log(handler.mock.calls[0][0]);
      expect(handler.mock.calls[0][0].detail.title).toBe('Success!');
      expect(handler.mock.calls[0][0].detail.message).toBe("Records displayed successfully based on priority High");
      expect(handler.mock.calls[0][0].detail.variant).toBe('Success');


    });
});