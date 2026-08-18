"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var ReactDom = tslib_1.__importStar(require("react-dom"));
var sp_core_library_1 = require("@microsoft/sp-core-library");
var sp_property_pane_1 = require("@microsoft/sp-property-pane");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var PropertyFieldListPicker_1 = require("@pnp/spfx-property-controls/lib/PropertyFieldListPicker");
var strings = tslib_1.__importStar(require("ViewPickerWebPartStrings"));
var ViewPicker_1 = tslib_1.__importDefault(require("./components/ViewPicker"));
var ViewPickerWebPart = /** @class */ (function (_super) {
    tslib_1.__extends(ViewPickerWebPart, _super);
    function ViewPickerWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ViewPickerWebPart.prototype.render = function () {
        var element = React.createElement(ViewPicker_1.default, {
            description: this.properties.description,
            context: this.context,
            listId: this.properties.listId,
            defaultSelectedView: this.properties.defaultSelectedView
        });
        ReactDom.render(element, this.domElement);
    };
    ViewPickerWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(ViewPickerWebPart.prototype, "dataVersion", {
        get: function () {
            return sp_core_library_1.Version.parse('1.0');
        },
        enumerable: false,
        configurable: true
    });
    ViewPickerWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription,
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                (0, sp_property_pane_1.PropertyPaneTextField)("description", {
                                    label: strings.DescriptionFieldLabel,
                                }),
                                (0, PropertyFieldListPicker_1.PropertyFieldListPicker)("listId", {
                                    label: strings.ListIdFieldLabel,
                                    selectedList: this.properties.listId,
                                    includeHidden: false,
                                    orderBy: PropertyFieldListPicker_1.PropertyFieldListPickerOrderBy.Title,
                                    onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                                    properties: this.properties,
                                    context: this.context,
                                    key: "listIdFieldId",
                                }),
                                (0, sp_property_pane_1.PropertyPaneTextField)("defaultSelectedView", {
                                    label: strings.DefaultSelectedViewFieldLabel,
                                }),
                            ],
                        },
                    ],
                },
            ],
        };
    };
    return ViewPickerWebPart;
}(sp_webpart_base_1.BaseClientSideWebPart));
exports.default = ViewPickerWebPart;
//# sourceMappingURL=ViewPickerWebPart.js.map