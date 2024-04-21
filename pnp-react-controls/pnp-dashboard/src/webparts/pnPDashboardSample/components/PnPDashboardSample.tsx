import * as React from 'react';
import type { IPnPDashboardSampleProps } from './IPnPDashboardSampleProps';
import * as strings from 'PnPDashboardSampleWebPartStrings';
import { WidgetSize, Dashboard } from '@pnp/spfx-controls-react/lib/Dashboard';
import { Icon, Text } from '@fluentui/react';
import { IWidget } from '@pnp/spfx-controls-react/lib/Dashboard';

export default class PnPDashboardSample extends React.Component<IPnPDashboardSampleProps, {}> {
  linkExample = { href: "https://iamguidozam.blog/" };
  calloutItemsExample = [
    {
      id: "action_add",
      title: "Add",
      icon: <Icon iconName={'Add'} />,
      onClick: () => {
        alert("Add clicked");
      }
    },
    {
      id: "action_edit",
      title: "Edit",
      icon: <Icon iconName={'Edit'} />,
      onClick: () => {
        alert("Edit clicked");
      }
    }
  ];
  
  public render(): React.ReactElement<IPnPDashboardSampleProps> {
    return (
      <Dashboard
        widgets={[
          this._getFirstWidget(),
          this._getSecondWidget(),
          this._getThirdWidget()
        ]} />
    );
  }

  private _getFirstWidget(): IWidget {
    return {
      title: strings.FirstWidget.Title,
      desc: strings.FirstWidget.Description,
      size: WidgetSize.Triple,
      body: [
        {
          id: "principalTab",
          title: strings.FirstWidget.PrincipalTab,
          content: (
            <Text>
              {strings.FirstWidget.PrincipalTabContent}
            </Text>
          ),
        },
        {
          id: "secondaryTab",
          title: strings.FirstWidget.SecondaryTab,
          content: (
            <Text>
              {strings.FirstWidget.SecondaryTabContent}
            </Text>
          ),
        },
        {
          id: "lastTab",
          title: strings.FirstWidget.LastTab,
          content: (
            <Text>
              {strings.FirstWidget.LastTabContent}
            </Text>
          ),
        },
      ]
    };
  }

  private _getSecondWidget(): IWidget {
    return {
      title: strings.SecondWidget.Title,
      size: WidgetSize.Single,
      widgetActionGroup: this.calloutItemsExample,
      body: [
        {
          id: "content",
          title: strings.SecondWidget.ContentTitle,
          content: this._getSampleTable()
        }
      ]
    };
  }

  private _getThirdWidget(): IWidget {
    return {
      title: strings.ThirdWidget.Title,
      size: WidgetSize.Double,
      link: this.linkExample,
      body: [
        {
          id: "content",
          title: "Content",
          content: (
            <div>
              <h2>{strings.ThirdWidget.ContentTitle}</h2>
              <p>{strings.ThirdWidget.Description}</p>
            </div>
          ),
        }
      ]
    };
  }

  private _getSampleTable(): JSX.Element {
    return (
      <table>
        <tr>
          <th>Character</th>
          <th>Actor</th>
        </tr>
        <tr>
          <td>Neo</td>
          <td>Keanu Reeves</td>
        </tr>
        <tr>
          <td>Morpheus</td>
          <td>Laurence Fishburne</td>
        </tr>
        <tr>
          <td>Trinity</td>
          <td>Carrie-Anne Moss</td>
        </tr>
        <tr>
          <td>Agent Smith</td>
          <td>Hugo Weaving</td>
        </tr>
      </table>
    );
  }
}
