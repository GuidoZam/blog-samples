import * as React from 'react';
import type { IPnPDashboardSampleProps } from './IPnPDashboardSampleProps';
import * as strings from 'PnPDashboardSampleWebPartStrings';
import { WidgetSize, IWidget, Dashboard } from '@pnp/spfx-controls-react/lib/Dashboard';
import { Icon, Text } from '@fluentui/react';

export default class PnPDashboardSample extends React.Component<IPnPDashboardSampleProps, {}> {
  linkExample = { href: "https://iamguidozam.blog/" };
  linkDeloreanIpsum = { href: "https://satoristudio.net/delorean-ipsum/" };
  linkPirateIpsum = { href: "https://pirateipsum.me/" };
  linkLoremIpsum = { href: "https://www.lipsum.com/" };
  
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
          this._getThirdWidget(),
          this._getFourthWidget(),
          this._getFifthWidget(),
          this._getSixthWidget()
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
      size: WidgetSize.Double,
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
      size: WidgetSize.Single,
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

  private _getFourthWidget(): IWidget {
    return {
      title: strings.FourthWidget.Title,
      size: WidgetSize.Box,
      link: this.linkDeloreanIpsum,
      body: [
        {
          id: "deloreanIpsum",
          title: "Delorean Ipsum",
          content: (
            <div>
              <header><b>{strings.FourthWidget.Header}</b></header>
              <section>
                <article>
                  {strings.FourthWidget.ArticleContent}
                </article>
              </section>
            </div>
          ),
        }
      ]
    };
  }

  private _getFifthWidget(): IWidget {
    return {
      title: strings.FifthWidget.Title,
      size: WidgetSize.Single,
      link: this.linkPirateIpsum,
      body: [
        {
          id: "pirateIpsum",
          title: "Pirate Ipsum",
          content: (
            <div>
              <header><b>{strings.FifthWidget.Header}</b></header>
              <section>
                <article>
                  {strings.FifthWidget.ArticleContent}
                </article>
              </section>
            </div>
          ),
        }
      ]
    };
  }

  private _getSixthWidget(): IWidget {
    return {
      title: strings.SixthWidget.Title,
      size: WidgetSize.Single,
      link: this.linkLoremIpsum,
      body: [
        {
          id: "loremIpsum",
          title: "Lorem Ipsum",
          content: (
            <div>
              <header><b>{strings.SixthWidget.Header}</b></header>
              <section>
                <article style={{height: "75vh", overflowY: 'scroll'}}>
                  {strings.SixthWidget.ArticleContent}
                </article>
              </section>
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
          <th>Role</th>
        </tr>
        <tr>
          <td>Neo</td>
          <td>Keanu Reeves</td>
          <td>The One</td>
        </tr>
        <tr>
          <td>Morpheus</td>
          <td>Laurence Fishburne</td>
          <td>The Mentor</td>
        </tr>
        <tr>
          <td>Trinity</td>
          <td>Carrie-Anne Moss</td>
          <td>The Love Interest</td>
        </tr>
        <tr>
          <td>Agent Smith</td>
          <td>Hugo Weaving</td>
          <td>The Antagonist</td>
        </tr>
      </table>
    );
  }
}
