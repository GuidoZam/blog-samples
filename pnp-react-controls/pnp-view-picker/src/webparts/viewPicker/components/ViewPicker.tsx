import { WebPartContext } from '@microsoft/sp-webpart-base';
import * as React from 'react';
import styles from './ViewPicker.module.scss';
import type { IViewPickerProps } from './IViewPickerProps';
import type { IViewPickerState } from './IViewPickerState';
import { orderBy, ViewPicker } from '@pnp/spfx-controls-react/lib/ViewPicker';
import * as strings from 'ViewPickerWebPartStrings';
import { Label } from '@fluentui/react/lib/Label';

export default class ViewPickerComponent extends React.Component<IViewPickerProps, IViewPickerState> {
  
  constructor(props: IViewPickerProps) {
    super(props);
    
    this.state = {
      selectedView: undefined,
      selectedViews: [],
      orderBy: 'Title',
      listId: this.props.listId || ''
    };
  }

  public render(): React.ReactElement<IViewPickerProps> {
    const { context, defaultSelectedView } = this.props;

    return (
      <section className={`${styles.viewPicker}`}>
        <div className={styles.container}>
          <h1 className={styles.title}>{strings.MainTitle}</h1>
          <p className={styles.description}>
            {strings.MainDescription}
          </p>

          {!this.state.listId && (
            <div className={styles.warning}>
              <p>Please configure a List ID in the web part properties to see the ViewPicker in action.</p>
              <p>You can find a list GUID by going to List Settings and looking at the URL.</p>
            </div>
          )}

          {this.state.listId && (
            <>
              {/* Scenario 1: Single Selection */}
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>{strings.SingleSelectionSection}</h2>
                <ViewPicker
                  context={context as any}
                  listId={this.state.listId}
                  label="Select a View"
                  onSelectionChanged={(view) => {
                    console.log('Single view selected:', view);
                    this.setState({ selectedView: view });
                  }}
                  placeholder="Choose a view..."
                />
                <div className={styles.selectedValue}>
                  <Label>{strings.SelectedViewLabel}</Label>
                  <span>{this.state.selectedView || strings.NoViewSelected}</span>
                </div>
              </div>

              {/* Scenario 2: Multiple Selection */}
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>{strings.MultiSelectionSection}</h2>
                <ViewPicker
                  context={context as any}
                  listId={this.state.listId}
                  label="Select Multiple Views"
                  multiSelect={true}
                  onSelectionChanged={(views) => {
                    console.log('Multiple views selected:', views);
                    this.setState({ selectedViews: Array.isArray(views) ? views : [views] });
                  }}
                  placeholder="Choose one or more views..."
                />
                <div className={styles.selectedValue}>
                  <Label>{strings.SelectedViewsLabel}</Label>
                  <span>
                    {this.state.selectedViews.length > 0
                      ? this.state.selectedViews.join(', ')
                      : strings.NoViewSelected}
                  </span>
                </div>
              </div>

              {/* Scenario 3: Ordered by Title */}
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>{strings.OrderedSection}</h2>
                <ViewPicker
                  context={context as any}
                  listId={this.state.listId}
                  label="Views Ordered by Title"
                  orderBy={orderBy.Title}
                  onSelectionChanged={(view) => {
                    console.log('Ordered view selected:', view);
                  }}
                  placeholder="Select a view (sorted)..."
                />
              </div>

              {/* Scenario 4: Filtered Views */}
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>{strings.FilteredSection}</h2>
                <ViewPicker
                  context={context as any}
                  listId={this.state.listId}
                  label="Filtered Views (Public Views Only)"
                  filter="PersonalView eq false"
                  onSelectionChanged={(view) => {
                    console.log('Filtered view selected:', view);
                  }}
                  placeholder="Select a public view..."
                />
              </div>

              {/* Scenario 5: With Default Selection */}
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>{strings.DefaultSection}</h2>
                <ViewPicker
                  context={context as any}
                  listId={this.state.listId}
                  label="ViewPicker with Default"
                  selectedView={defaultSelectedView}
                  onSelectionChanged={(view) => {
                    console.log('Default view changed:', view);
                  }}
                  placeholder="Select a view..."
                />
              </div>

              {/* Scenario 6: Disabled State */}
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>{strings.DisabledSection}</h2>
                <ViewPicker
                  context={context as any}
                  listId={this.state.listId}
                  label="Disabled ViewPicker"
                  disabled={true}
                  onSelectionChanged={(view) => {
                    console.log('Disabled view (should not fire):', view);
                  }}
                  placeholder="This picker is disabled..."
                />
              </div>
            </>
          )}
        </div>
      </section>
    );
  }
}
