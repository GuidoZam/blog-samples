import type { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { FlowStatusAcePropertyPane } from './FlowStatusAcePropertyPane';
import { PublicClientApplication } from "@azure/msal-browser";

export interface IFlowStatusAceAdaptiveCardExtensionProps {
  title: string;
}

export interface IFlowStatusAceAdaptiveCardExtensionState {
}

const CARD_VIEW_REGISTRY_ID: string = 'FlowStatusAce_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'FlowStatusAce_QUICK_VIEW';

export default class FlowStatusAceAdaptiveCardExtension extends BaseAdaptiveCardExtension<
	IFlowStatusAceAdaptiveCardExtensionProps,
	IFlowStatusAceAdaptiveCardExtensionState
> {
	private _deferredPropertyPane: FlowStatusAcePropertyPane;

	private msalConfig = {
		auth: {
			clientId: "f6a7a371-1a72-407f-950f-bd1892b26f02",
			authority: "https://login.microsoftonline.com/598de42c-da90-4511-8d33-7d86ee48937c",
		},
	};

	public async onInit(): Promise<void> {
		this.state = {};

		// registers the card view to be shown in a dashboard
		this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
		// registers the quick view to open via QuickView action
		this.quickViewNavigator.register(
			QUICK_VIEW_REGISTRY_ID,
			() => new QuickView()
		);

		const msalInstance = new PublicClientApplication(this.msalConfig);
		await msalInstance.initialize();

    console.log("msal initialized");
    await msalInstance.ssoSilent({
      scopes: [ "Flows.Read.All" ]
    });
    console.log("msal ssoSilent");
    

		return Promise.resolve();
	}

	protected loadPropertyPaneResources(): Promise<void> {
		return import(
			/* webpackChunkName: 'FlowStatusAce-property-pane'*/
			"./FlowStatusAcePropertyPane"
		).then((component) => {
			this._deferredPropertyPane = new component.FlowStatusAcePropertyPane();
		});
	}

	protected renderCard(): string | undefined {
		return CARD_VIEW_REGISTRY_ID;
	}

	protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
		return this._deferredPropertyPane?.getPropertyPaneConfiguration();
	}
}
