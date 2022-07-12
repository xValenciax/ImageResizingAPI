"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jasmine_spec_reporter_1 = require("jasmine-spec-reporter");
class CustomProcessor extends jasmine_spec_reporter_1.DisplayProcessor {
    displayJasmineStarted(info, log) {
        return `${log}`;
    }
}
jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(new jasmine_spec_reporter_1.SpecReporter({
    spec: {
        displayStacktrace: jasmine_spec_reporter_1.StacktraceOption.NONE
    },
    customProcessors: [CustomProcessor],
}));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const myReporter = {
    jasmineStarted: function (suiteInfo) {
        console.log('Running suite with ' + suiteInfo.totalSpecsDefined);
    },
    suiteStarted: function (result) {
        console.log('Suite started: ' + result.description
            + ' whose full description is: ' + result.fullName);
    },
    specStarted: (result) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('Spec started: ' + result.description
            + ' whose full description is: ' + result.fullName);
    }),
    specDone: function (result) {
        console.log('Spec: ' + result.description + ' was ' + result.status);
        for (let i = 0; i < result.failedExpectations.length; i++) {
            console.log('Failure: ' + result.failedExpectations[i].message);
            console.log(result.failedExpectations[i].stack);
        }
        console.log(result.passedExpectations.length);
    },
    suiteDone: function (result) {
        console.log('Suite: ' + result.description + ' was ' + result.status);
        for (let i = 0; i < result.failedExpectations.length; i++) {
            console.log('Suite ' + result.failedExpectations[i].message);
            console.log(result.failedExpectations[i].stack);
        }
    },
    jasmineDone: function (result) {
        console.log('Finished suite: ' + result.overallStatus);
        for (let i = 0; i < result.failedExpectations.length; i++) {
            console.log('Global ' + result.failedExpectations[i].message);
            console.log(result.failedExpectations[i].stack);
        }
    }
};
