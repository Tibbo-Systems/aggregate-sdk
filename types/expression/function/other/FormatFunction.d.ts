import AbstractFunction from '../AbstractFunction';
import Evaluator from '../../Evaluator';
import EvaluationEnvironment from '../../EvaluationEnvironment';
export default class FormatFunction extends AbstractFunction {
    private FLAG_PLUS;
    private FLAG_MINUS;
    constructor();
    execute(evaluator: Evaluator, environment: EvaluationEnvironment, parameters: Array<any>): any;
    private modifierD;
    private modifierS;
    private modifierB;
    private modifierH;
    private modifierC;
    private modifierO;
    private modifierX;
    private modifierE;
    private modifierF;
    private modifierG;
    private modifierA;
    private formatHours;
    private formatMinutes;
    private formatSeconds;
    private formatMilliseconds;
    private formatNanoseconds;
    private ampm;
    private formatTimezone;
    private formatMonth;
    private formatDays;
    private formatYears;
    private formatDate;
    private addSpaces;
    private formatByFlags;
    private getFlags;
    private isDateFormatting;
}