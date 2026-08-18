"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = tslib_1.__importStar(require("react"));
var ViewPicker_module_scss_1 = tslib_1.__importDefault(require("./ViewPicker.module.scss"));
var ViewPicker_1 = require("@pnp/spfx-controls-react/lib/ViewPicker");
var strings = tslib_1.__importStar(require("ViewPickerWebPartStrings"));
var Label_1 = require("@fluentui/react/lib/Label");
var ViewPickerComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ViewPickerComponent, _super);
    function ViewPickerComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            selectedView: undefined,
            selectedViews: [],
            orderBy: 'Title',
            listId: _this.props.listId || ''
        };
        return _this;
    }
    ViewPickerComponent.prototype.render = function () {
        var _this = this;
        var _a = this.props, context = _a.context, defaultSelectedView = _a.defaultSelectedView;
        return (React.createElement("section", { className: "".concat(ViewPicker_module_scss_1.default.viewPicker) },
            React.createElement("div", { className: ViewPicker_module_scss_1.default.container },
                React.createElement("h1", { className: ViewPicker_module_scss_1.default.title }, strings.MainTitle),
                React.createElement("p", { className: ViewPicker_module_scss_1.default.description }, strings.MainDescription),
                !this.state.listId && (React.createElement("div", { className: ViewPicker_module_scss_1.default.warning },
                    React.createElement("p", null, "Please configure a List ID in the web part properties to see the ViewPicker in action."),
                    React.createElement("p", null, "You can find a list GUID by going to List Settings and looking at the URL."))),
                this.state.listId && (React.createElement(React.Fragment, null,
                    React.createElement("div", { className: ViewPicker_module_scss_1.default.section },
                        React.createElement("h2", { className: ViewPicker_module_scss_1.default.sectionTitle }, strings.SingleSelectionSection),
                        React.createElement(ViewPicker_1.ViewPicker, { context: context, listId: this.state.listId, label: "Select a View", onSelectionChanged: function (view) {
                                console.log('Single view selected:', view);
                                _this.setState({ selectedView: view });
                            }, placeholder: "Choose a view..." }),
                        React.createElement("div", { className: ViewPicker_module_scss_1.default.selectedValue },
                            React.createElement(Label_1.Label, null, strings.SelectedViewLabel),
                            React.createElement("span", null, this.state.selectedView || strings.NoViewSelected))),
                    React.createElement("div", { className: ViewPicker_module_scss_1.default.section },
                        React.createElement("h2", { className: ViewPicker_module_scss_1.default.sectionTitle }, strings.MultiSelectionSection),
                        React.createElement(ViewPicker_1.ViewPicker, { context: context, listId: this.state.listId, label: "Select Multiple Views", multiSelect: true, onSelectionChanged: function (views) {
                                console.log('Multiple views selected:', views);
                                _this.setState({ selectedViews: Array.isArray(views) ? views : [views] });
                            }, placeholder: "Choose one or more views..." }),
                        React.createElement("div", { className: ViewPicker_module_scss_1.default.selectedValue },
                            React.createElement(Label_1.Label, null, strings.SelectedViewsLabel),
                            React.createElement("span", null, this.state.selectedViews.length > 0
                                ? this.state.selectedViews.join(', ')
                                : strings.NoViewSelected))),
                    React.createElement("div", { className: ViewPicker_module_scss_1.default.section },
                        React.createElement("h2", { className: ViewPicker_module_scss_1.default.sectionTitle }, strings.OrderedSection),
                        React.createElement(ViewPicker_1.ViewPicker, { context: context, listId: this.state.listId, label: "Views Ordered by Title", orderBy: ViewPicker_1.orderBy.Title, onSelectionChanged: function (view) {
                                console.log('Ordered view selected:', view);
                            }, placeholder: "Select a view (sorted)..." })),
                    React.createElement("div", { className: ViewPicker_module_scss_1.default.section },
                        React.createElement("h2", { className: ViewPicker_module_scss_1.default.sectionTitle }, strings.FilteredSection),
                        React.createElement(ViewPicker_1.ViewPicker, { context: context, listId: this.state.listId, label: "Filtered Views (Public Views Only)", filter: "PersonalView eq false", onSelectionChanged: function (view) {
                                console.log('Filtered view selected:', view);
                            }, placeholder: "Select a public view..." })),
                    React.createElement("div", { className: ViewPicker_module_scss_1.default.section },
                        React.createElement("h2", { className: ViewPicker_module_scss_1.default.sectionTitle }, strings.DefaultSection),
                        React.createElement(ViewPicker_1.ViewPicker, { context: context, listId: this.state.listId, label: "ViewPicker with Default", selectedView: defaultSelectedView, onSelectionChanged: function (view) {
                                console.log('Default view changed:', view);
                            }, placeholder: "Select a view..." })),
                    React.createElement("div", { className: ViewPicker_module_scss_1.default.section },
                        React.createElement("h2", { className: ViewPicker_module_scss_1.default.sectionTitle }, strings.DisabledSection),
                        React.createElement(ViewPicker_1.ViewPicker, { context: context, listId: this.state.listId, label: "Disabled ViewPicker", disabled: true, onSelectionChanged: function (view) {
                                console.log('Disabled view (should not fire):', view);
                            }, placeholder: "This picker is disabled..." })))))));
    };
    return ViewPickerComponent;
}(React.Component));
exports.default = ViewPickerComponent;
//# sourceMappingURL=ViewPicker.js.map