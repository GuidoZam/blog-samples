"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var ProgressStepsIndicator_module_scss_1 = tslib_1.__importDefault(require("./ProgressStepsIndicator.module.scss"));
var ProgressStepsIndicator_1 = require("@pnp/spfx-controls-react/lib/ProgressStepsIndicator");
var Button_1 = require("@fluentui/react/lib/Button");
var strings = tslib_1.__importStar(require("ProgressStepsIndicatorWebPartStrings"));
var ProgressStepsIndicatorComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ProgressStepsIndicatorComponent, _super);
    function ProgressStepsIndicatorComponent(props) {
        var _this = _super.call(this, props) || this;
        _this._onPreviousStep = function () {
            _this.setState(function (prevState) { return ({
                currentStep3: Math.max(0, prevState.currentStep3 - 1)
            }); });
        };
        _this._onNextStep = function () {
            _this.setState(function (prevState) { return ({
                currentStep3: Math.min(5, prevState.currentStep3 + 1)
            }); });
        };
        _this._onResetSteps = function () {
            _this.setState({ currentStep3: 0 });
        };
        _this.state = {
            currentStep1: 0,
            currentStep2: 1,
            currentStep3: 0
        };
        return _this;
    }
    ProgressStepsIndicatorComponent.prototype.render = function () {
        var fiveSteps = [
            { id: 0, title: "Step 1", description: strings.Step1_Planning },
            { id: 1, title: "Step 2", description: strings.Step2_Design },
            { id: 2, title: "Step 3", description: strings.Step3_Development },
            { id: 3, title: "Step 4", description: strings.Step4_Deployment },
            { id: 4, title: "Step 5", description: strings.Step5_Monitoring }
        ];
        var threeSteps = [
            { id: 0, title: "Step 1", description: strings.Step1_GetStarted },
            { id: 1, title: "Step 2", description: strings.Step2_Configure },
            { id: 2, title: "Step 3", description: strings.Step3_Complete }
        ];
        var sixSteps = [
            { id: 0, title: "Step 1", description: strings.Step1_Start },
            { id: 1, title: "Step 2", description: strings.Step2_Requirements },
            { id: 2, title: "Step 3", description: strings.Step3_Build },
            { id: 3, title: "Step 4", description: strings.Step4_Validation },
            { id: 4, title: "Step 5", description: strings.Step5_Deploy },
            { id: 5, title: "Step 6", description: strings.Step6_Support }
        ];
        return (React.createElement("section", { className: "".concat(ProgressStepsIndicator_module_scss_1.default.progressStepsIndicator) },
            React.createElement("div", { className: ProgressStepsIndicator_module_scss_1.default.container },
                React.createElement("h1", { className: ProgressStepsIndicator_module_scss_1.default.title }, strings.Title),
                React.createElement("div", { className: ProgressStepsIndicator_module_scss_1.default.section },
                    React.createElement("h2", { className: ProgressStepsIndicator_module_scss_1.default.sectionTitle }, strings.BasicFiveSteps),
                    React.createElement("p", { className: ProgressStepsIndicator_module_scss_1.default.sectionDescription }, strings.BasicFiveStepsDescription),
                    React.createElement(ProgressStepsIndicator_1.ProgressStepsIndicator, { steps: fiveSteps, currentStep: this.state.currentStep1 }),
                    React.createElement("div", { className: ProgressStepsIndicator_module_scss_1.default.selection },
                        strings.CurrentStepLabel,
                        ": ",
                        React.createElement("strong", null, fiveSteps[this.state.currentStep1].description))),
                React.createElement("div", { className: ProgressStepsIndicator_module_scss_1.default.section },
                    React.createElement("h2", { className: ProgressStepsIndicator_module_scss_1.default.sectionTitle }, strings.ThreeStepProcess),
                    React.createElement("p", { className: ProgressStepsIndicator_module_scss_1.default.sectionDescription }, strings.ThreeStepProcessDescription),
                    React.createElement(ProgressStepsIndicator_1.ProgressStepsIndicator, { steps: threeSteps, currentStep: this.state.currentStep2 }),
                    React.createElement("div", { className: ProgressStepsIndicator_module_scss_1.default.selection },
                        strings.CurrentStepLabel,
                        ": ",
                        React.createElement("strong", null, threeSteps[this.state.currentStep2].description))),
                React.createElement("div", { className: ProgressStepsIndicator_module_scss_1.default.section },
                    React.createElement("h2", { className: ProgressStepsIndicator_module_scss_1.default.sectionTitle }, strings.DynamicNavigation),
                    React.createElement("p", { className: ProgressStepsIndicator_module_scss_1.default.sectionDescription }, strings.SelectStepLabel),
                    React.createElement(ProgressStepsIndicator_1.ProgressStepsIndicator, { steps: sixSteps, currentStep: this.state.currentStep3 }),
                    React.createElement("div", { className: ProgressStepsIndicator_module_scss_1.default.selection },
                        strings.CurrentStepLabel,
                        ": ",
                        React.createElement("strong", null, sixSteps[this.state.currentStep3].description)),
                    React.createElement("div", { className: ProgressStepsIndicator_module_scss_1.default.buttonGroup },
                        React.createElement(Button_1.DefaultButton, { text: strings.PreviousButton, onClick: this._onPreviousStep, disabled: this.state.currentStep3 === 0 }),
                        React.createElement(Button_1.PrimaryButton, { text: strings.NextButton, onClick: this._onNextStep, disabled: this.state.currentStep3 === sixSteps.length - 1 }),
                        React.createElement(Button_1.DefaultButton, { text: strings.ResetButton, onClick: this._onResetSteps }))))));
    };
    return ProgressStepsIndicatorComponent;
}(React.Component));
exports.default = ProgressStepsIndicatorComponent;
//# sourceMappingURL=ProgressStepsIndicator.js.map