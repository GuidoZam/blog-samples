import * as React from 'react';
import type { IPnPDashboardSampleProps } from './IPnPDashboardSampleProps';
//import * as strings from 'PnPDashboardSampleWebPartStrings';
import { WidgetSize, Dashboard } from '@pnp/spfx-controls-react/lib/Dashboard';
// import { 
//   //Icon,
//   Text } from '@fluentui/react';
// import { IWidget } from '@pnp/spfx-controls-react/lib/Dashboard';

export default class PnPDashboardSample extends React.Component<IPnPDashboardSampleProps, {}> {
  linkExample = { href: "#" };
  // calloutItemsExample = [
  //   {
  //     id: "action_1",
  //     title: "Info",
  //     icon: "Info",
  //     //icon: <Icon iconName={'Edit'} />,
  //   },
  //   { 
  //     id: "action_2", 
  //     title: "Popup",
  //     icon: "Popup",
  //     //icon: <Icon iconName={'Add'} /> 
  //   },
  // ];
  
  public render(): React.ReactElement<IPnPDashboardSampleProps> {
    return (
      <Dashboard
        widgets={[
          {
            title: "Card 2",
            size: WidgetSize.Single
          }
          // this._getFirstWidget(),
          // this._getSecondWidget(),
          // this._getThirdWidget()
        ]} />
    );
  }

  // private _getFirstWidget(): IWidget {
  //   return {
  //     title: strings.FirstWidgetTitle,
  //     desc: "Last updated Monday, April 4 at 11:15 AM (PT)",
  //     //widgetActionGroup: this.calloutItemsExample,
  //     size: WidgetSize.Triple,
  //     body: [
  //       {
  //         id: "t1",
  //         title: "Tab 1",
  //         content: (
  //           <Text>
  //             Content #1
  //           </Text>
  //         ),
  //       },
  //       {
  //         id: "t2",
  //         title: "Tab 2",
  //         content: (
  //           <Text>
  //             Content #2
  //           </Text>
  //         ),
  //       },
  //       {
  //         id: "t3",
  //         title: "Tab 3",
  //         content: (
  //           <Text>
  //             Content #3
  //           </Text>
  //         ),
  //       },
  //     ],
  //     link: this.linkExample,
  //   };
  // }

  // private _getSecondWidget(): IWidget {
  //   return {
  //     title: "Card 2",
  //     size: WidgetSize.Single,
  //     link: this.linkExample,
  //   };
  // }

  // private _getThirdWidget(): IWidget {
  //   return {
  //     title: "Card 3",
  //     size: WidgetSize.Double,
  //     link: this.linkExample,
  //   };
  // }
}
