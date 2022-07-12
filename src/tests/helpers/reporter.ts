import { DisplayProcessor, SpecReporter, StacktraceOption }
    from 'jasmine-spec-reporter';
import SuiteInfo = jasmine.JasmineStartedInfo;

class CustomProcessor extends DisplayProcessor {
    public displayJasmineStarted(info: SuiteInfo, log: string): string {
        return `${log}`;
    }
}

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(new SpecReporter({
    spec: {
        displayStacktrace: StacktraceOption.NONE
    },
    customProcessors: [CustomProcessor],
}));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const myReporter = {
    jasmineStarted: function(suiteInfo: SuiteInfo): void {
        console.log('Running suite with ' + suiteInfo.totalSpecsDefined);
    },
  
    suiteStarted: function(result: jasmine.SuiteResult): void {
        console.log('Suite started: ' + result.description
        + ' whose full description is: ' + result.fullName);
    },
  
    specStarted: async (result: jasmine.SpecResult): Promise<void> => {
        console.log('Spec started: ' + result.description
        + ' whose full description is: ' + result.fullName);
    },
  
    specDone: function(result: jasmine.SpecResult): void {
        console.log('Spec: ' + result.description + ' was ' + result.status);
  
        for(let i = 0; i < result.failedExpectations.length; i++) {
            console.log('Failure: ' + result.failedExpectations[i].message);
            console.log(result.failedExpectations[i].stack);
        }
  
        console.log(result.passedExpectations.length);
    },
  
    suiteDone: function(result: jasmine.SuiteResult): void {
        console.log('Suite: ' + result.description + ' was ' + result.status);
        for(let i = 0; i < result.failedExpectations.length; i++) {
            console.log('Suite ' + result.failedExpectations[i].message);
            console.log(result.failedExpectations[i].stack);
        }
    },
  
    jasmineDone: function(result: jasmine.JasmineDoneInfo): void {
        console.log('Finished suite: ' + result.overallStatus);
        for(let i = 0; i < result.failedExpectations.length; i++) {
            console.log('Global ' + result.failedExpectations[i].message);
            console.log(result.failedExpectations[i].stack);
        }
    }
};
