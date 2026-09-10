import { __awaiter, __extends, __generator } from "tslib";
import { BaseCopilotComponent } from '@microsoft/sp-copilot-component';
import { escape } from '@microsoft/sp-lodash-subset';
import styles from './DisplayModeDemoCopilotComponent.module.scss';
import welcomeDark from './assets/welcome-dark.png';
import welcomeLight from './assets/welcome-light.png';
import * as strings from 'DisplayModeDemoCopilotComponentStrings';
var FULLSCREEN_ICON = '⛶';
var INLINE_ICON = "⇲";
var DisplayModeDemoCopilotComponent = /** @class */ (function (_super) {
    __extends(DisplayModeDemoCopilotComponent, _super);
    function DisplayModeDemoCopilotComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._handleRequestToggleMode = function () { return __awaiter(_this, void 0, void 0, function () {
            var isFullscreen, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        isFullscreen = this.hostContext.displayMode === "fullscreen";
                        return [4 /*yield*/, this.requestDisplayModeAsync(isFullscreen ? 'inline' : 'fullscreen')];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    DisplayModeDemoCopilotComponent.prototype.render = function () {
        var _this = this;
        var userName = this.context.pageContext.user.displayName || 'there';
        var theme = this.hostContext.theme || strings.UnknownTheme;
        var displayMode = this.hostContext.displayMode || strings.UnknownTheme;
        var availableDisplayModes = (this.hostContext.availableDisplayModes || []).join(', ');
        var isDarkTheme = this.hostContext.theme === 'dark';
        var isFullscreen = this.hostContext.displayMode === 'fullscreen';
        var rootClass = "".concat(styles.displayModeDemo, " ").concat(isDarkTheme ? styles.dark : '');
        var toggleModeHtml = "<span \n      id=\"hc-toggle-mode\"\n      class=\"".concat(styles.toggleModeButton, "\"\n      role=\"button\"\n      tabindex=\"0\"\n      title=\"").concat(isFullscreen ? strings.ExpandToFullscreenTitle : strings.CollapseToInlineTitle, "\"\n      aria-label=\"").concat(isFullscreen ? strings.ExpandToFullscreenTitle : strings.CollapseToInlineTitle, "\">\n        ").concat(isFullscreen ? INLINE_ICON : FULLSCREEN_ICON, "\n      </span>");
        // Fullscreen gets an extra detail panel; there is no "collapse" button by design, that's the host's job.
        var fullscreenOnlyHtml = isFullscreen
            ? "<div class=\"".concat(styles.fullscreenPanel, "\">\n          <p class=\"").concat(styles.fullscreenNote, "\">").concat(strings.FullscreenOnlyNote, "</p>\n          <p class=\"").concat(styles.fullscreenHint, "\">").concat(strings.CollapseHint, "</p>\n        </div>")
            : '';
        this.context.domElement.innerHTML = "\n      <section class=\"".concat(rootClass, "\">\n        <div class=\"").concat(styles.header, "\">\n          <p class=\"").concat(styles.greeting, "\">").concat(strings.WelcomeGreeting, " ").concat(escape(userName), "</p>\n          ").concat(toggleModeHtml, "\n        </div>\n\n        <img class=\"").concat(styles.welcomeImage, "\" alt=\"\" src=\"").concat(isDarkTheme ? welcomeDark : welcomeLight, "\" />\n\n        <div class=\"").concat(styles.details, "\">\n          <div class=\"").concat(styles.row, "\">\n            <span class=\"").concat(styles.label, "\">").concat(strings.DisplayModeLabel, "</span>\n            <span class=\"").concat(styles.value, "\">").concat(escape(displayMode), "</span>\n          </div>\n          <div class=\"").concat(styles.row, "\">\n            <span class=\"").concat(styles.label, "\">").concat(strings.AvailableModesLabel, "</span>\n            <span class=\"").concat(styles.value, "\">").concat(escape(availableDisplayModes), "</span>\n          </div>\n          <div class=\"").concat(styles.row, "\">\n            <span class=\"").concat(styles.label, "\">").concat(strings.ThemeLabel, "</span>\n            <span class=\"").concat(styles.value, "\">").concat(escape(theme), "</span>\n          </div>\n          <div class=\"").concat(styles.row, "\">\n            <span class=\"").concat(styles.label, "\">").concat(strings.MessageLabel, "</span>\n            <span class=\"").concat(styles.value, "\">").concat(escape(this.properties.message), "</span>\n          </div>\n        </div>\n\n        ").concat(fullscreenOnlyHtml, "\n      </section>");
        var toggleModeButton = this.context.domElement.querySelector('#hc-toggle-mode');
        if (toggleModeButton) {
            toggleModeButton.addEventListener('click', this._handleRequestToggleMode);
            toggleModeButton.addEventListener('keydown', function (event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    _this._handleRequestToggleMode().catch(function () { return undefined; });
                }
            });
        }
    };
    return DisplayModeDemoCopilotComponent;
}(BaseCopilotComponent));
export default DisplayModeDemoCopilotComponent;
//# sourceMappingURL=DisplayModeDemoCopilotComponent.js.map