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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHtmlReport = void 0;
const mustache_1 = __importDefault(require("mustache"));
const loadTemplate_1 = require("./util/loadTemplate");
const prepareReportData_1 = require("./util/prepareReportData");
const prepareAxeRules_1 = require("./util/prepareAxeRules");
const saveHtmlReport_1 = require("./util/saveHtmlReport");
function createHtmlReport({ results, options }) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (!results.violations) {
            throw new Error("'violations' is required for HTML accessibility report. Example: createHtmlReport({ results : { violations: Result[] } })");
        }
        try {
            const template = loadTemplate_1.loadTemplate();
            const preparedReportData = prepareReportData_1.prepareReportData({
                violations: results.violations,
                passes: results.passes,
                incomplete: results.incomplete,
                inapplicable: results.inapplicable,
            });
            if ((options === null || options === void 0 ? void 0 : options.screenshotFunction) && preparedReportData.violationsDetails) {
                for (let details of preparedReportData.violationsDetails) {
                    for (let node of details.nodes) {
                        if (options.screenshotFunction) {
                            node.screenshot = yield options.screenshotFunction(node.targetNodes);
                        }
                    }
                }
            }
            const htmlContent = mustache_1.default.render(template, {
                url: results.url,
                violationsSummary: preparedReportData.violationsSummary,
                violations: preparedReportData.violationsSummaryTable,
                violationDetails: preparedReportData.violationsDetails,
                checksPassed: preparedReportData.checksPassed,
                checksIncomplete: preparedReportData.checksIncomplete,
                checksInapplicable: preparedReportData.checksInapplicable,
                hasPassed: Boolean(results.passes),
                hasIncomplete: Boolean(results.incomplete),
                hasInapplicable: Boolean(results.inapplicable),
                incompleteTotal: preparedReportData.checksIncomplete
                    ? preparedReportData.checksIncomplete.length
                    : 0,
                projectKey: options === null || options === void 0 ? void 0 : options.projectKey,
                customSummary: options === null || options === void 0 ? void 0 : options.customSummary,
                hasAxeRawResults: Boolean(results === null || results === void 0 ? void 0 : results.timestamp),
                rules: prepareAxeRules_1.prepareAxeRules(((_a = results === null || results === void 0 ? void 0 : results.toolOptions) === null || _a === void 0 ? void 0 : _a.rules) || {}),
            });
            saveHtmlReport_1.saveHtmlReport({
                htmlContent,
                reportFileName: options === null || options === void 0 ? void 0 : options.reportFileName,
                outputDir: options === null || options === void 0 ? void 0 : options.outputDir,
                outputDirPath: options === null || options === void 0 ? void 0 : options.outputDirPath
            });
        }
        catch (e) {
            console.warn(`HTML report was not created due to the error ${e.message}`);
        }
    });
}
exports.createHtmlReport = createHtmlReport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0RBQWdDO0FBRWhDLHNEQUFtRDtBQUNuRCxnRUFBNkQ7QUFDN0QsNERBQXlEO0FBQ3pELDBEQUF1RDtBQThCdkQsU0FBc0IsZ0JBQWdCLENBQUMsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFnQjs7O1FBQ3JFLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFO1lBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQ1gsMkhBQTJILENBQzlILENBQUM7U0FDTDtRQUNELElBQUk7WUFDQSxNQUFNLFFBQVEsR0FBRywyQkFBWSxFQUFFLENBQUM7WUFDaEMsTUFBTSxrQkFBa0IsR0FBRyxxQ0FBaUIsQ0FBQztnQkFDekMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxVQUFVO2dCQUM5QixNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07Z0JBQ3RCLFVBQVUsRUFBRSxPQUFPLENBQUMsVUFBVTtnQkFDOUIsWUFBWSxFQUFFLE9BQU8sQ0FBQyxZQUFZO2FBQ3JDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsa0JBQWtCLEtBQUksa0JBQWtCLENBQUMsaUJBQWlCLEVBQUU7Z0JBQ3JFLEtBQUssSUFBSSxPQUFPLElBQUksa0JBQWtCLENBQUMsaUJBQWlCLEVBQUU7b0JBQ3RELEtBQUssSUFBSSxJQUFJLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTt3QkFDNUIsSUFBSSxPQUFPLENBQUMsa0JBQWtCLEVBQUU7NEJBQzVCLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxPQUFPLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3lCQUN4RTtxQkFDSjtpQkFDSjthQUNKO1lBQ0QsTUFBTSxXQUFXLEdBQUcsa0JBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO2dCQUMxQyxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUc7Z0JBQ2hCLGlCQUFpQixFQUFFLGtCQUFrQixDQUFDLGlCQUFpQjtnQkFDdkQsVUFBVSxFQUFFLGtCQUFrQixDQUFDLHNCQUFzQjtnQkFDckQsZ0JBQWdCLEVBQUUsa0JBQWtCLENBQUMsaUJBQWlCO2dCQUN0RCxZQUFZLEVBQUUsa0JBQWtCLENBQUMsWUFBWTtnQkFDN0MsZ0JBQWdCLEVBQUUsa0JBQWtCLENBQUMsZ0JBQWdCO2dCQUNyRCxrQkFBa0IsRUFBRSxrQkFBa0IsQ0FBQyxrQkFBa0I7Z0JBQ3pELFNBQVMsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztnQkFDbEMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO2dCQUMxQyxlQUFlLEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7Z0JBQzlDLGVBQWUsRUFBRSxrQkFBa0IsQ0FBQyxnQkFBZ0I7b0JBQ2hELENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNO29CQUM1QyxDQUFDLENBQUMsQ0FBQztnQkFDUCxVQUFVLEVBQUUsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFVBQVU7Z0JBQy9CLGFBQWEsRUFBRSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsYUFBYTtnQkFDckMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxTQUFTLENBQUM7Z0JBQzdDLEtBQUssRUFBRSxpQ0FBZSxDQUFDLE9BQUEsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFdBQVcsMENBQUUsS0FBSyxLQUFJLEVBQUUsQ0FBQzthQUM1RCxDQUFDLENBQUM7WUFDSCwrQkFBYyxDQUFDO2dCQUNYLFdBQVc7Z0JBQ1gsY0FBYyxFQUFFLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxjQUFjO2dCQUN2QyxTQUFTLEVBQUUsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFNBQVM7Z0JBQzdCLGFBQWEsRUFBRSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsYUFBYTthQUN4QyxDQUFDLENBQUM7U0FDTjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsT0FBTyxDQUFDLElBQUksQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7U0FDN0U7O0NBQ0o7QUFuREQsNENBbURDIn0=