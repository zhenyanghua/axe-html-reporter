import { AxeResults, Result } from 'axe-core';
export interface Options {
    reportFileName?: string;
    outputDir?: string;
    projectKey?: string;
    customSummary?: string;
    outputDirPath?: string;
    /**
     * A function to generate screenshot based on the selector
     * @param selector
     *  DOM selector
     * @return
     *  the generated screenshot image path.
     */
    screenshotFunction?: (selector: string) => Promise<string>;
}
export interface CreateReport {
    results: Partial<AxeResults>;
    options?: Options;
}
export interface PreparedResults {
    violations: Result[];
    passes?: Result[];
    incomplete?: Result[];
    inapplicable?: Result[];
}
export declare function createHtmlReport({ results, options }: CreateReport): Promise<void>;
