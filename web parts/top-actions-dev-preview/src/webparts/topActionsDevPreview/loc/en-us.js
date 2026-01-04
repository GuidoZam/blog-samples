define([], function() {
  return {
		Title: "Top Action Dev Preview Sample",
		Description:
			"This web part demonstrates how to use the Top Actions extensibility API to add custom actions to the top action bar. This sample includes a button, dropdown, toggle, combobox, and split button. Some of the actions are in dev preview and not recommended for production use.",
		TopActions: {
			ButtonTitle: "Click to like this web part!",
			ButtonText: "Like",
			DropdownTitle: "Select a logging level",
			DropdownOptionOff: "Off",
			DropdownOptionWarning: "Warning",
			DropdownOptionError: "Error",
			DropdownOptionVerbose: "Verbose",
			ToggleTitle: "Enable verbose logging",
			ToggleText: "Verbose Mode",
			ComboboxTitle: "Select or enter an option",
			ComboboxPlaceholder: "Select an option...",
			SplitTitle: "Share this web part",
			SplitText: "Share",
			SplitButtonAriaLabel: "Share options",
			SplitShare: "Share Link",
			SplitEmail: "Email Link",
			SplitCopy: "Copy Link",
		},
	};
});