"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var ReactDom = tslib_1.__importStar(require("react-dom"));
var sp_core_library_1 = require("@microsoft/sp-core-library");
var sp_property_pane_1 = require("@microsoft/sp-property-pane");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var strings = tslib_1.__importStar(require("ProgressStepsIndicatorWebPartStrings"));
var ProgressStepsIndicator_1 = tslib_1.__importDefault(require("./components/ProgressStepsIndicator"));
var ProgressStepsIndicatorWebPart = /** @class */ (function (_super) {
    tslib_1.__extends(ProgressStepsIndicatorWebPart, _super);
    function ProgressStepsIndicatorWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProgressStepsIndicatorWebPart.prototype.render = function () {
        var element = React.createElement(ProgressStepsIndicator_1.default, {
            description: this.properties.description,
            context: this.context
        });
        ReactDom.render(element, this.domElement);
    };
    ProgressStepsIndicatorWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(ProgressStepsIndicatorWebPart.prototype, "dataVersion", {
        get: function () {
            return sp_core_library_1.Version.parse('1.0');
        },
        enumerable: false,
        configurable: true
    });
    ProgressStepsIndicatorWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                (0, sp_property_pane_1.PropertyPaneTextField)('description', {
                                    label: strings.DescriptionFieldLabel
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return ProgressStepsIndicatorWebPart;
}(sp_webpart_base_1.BaseClientSideWebPart));
exports.default = ProgressStepsIndicatorWebPart;
//# sourceMappingURL=ProgressStepsIndicatorWebPart.js.map