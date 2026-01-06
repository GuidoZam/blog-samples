import * as React from 'react';
import styles from './MermaidDiagram.module.scss';
import type { IMermaidDiagramProps } from './IMermaidDiagramProps';
import * as strings from 'MermaidDiagramWebPartStrings';
import mermaid from 'mermaid';

export default class MermaidDiagram extends React.Component<IMermaidDiagramProps> {
  private diagramRef: React.RefObject<HTMLDivElement>;

  constructor(props: IMermaidDiagramProps) {
    super(props);
    this.diagramRef = React.createRef();
  }

  public componentDidMount(): void {
    this.initializeMermaid();
  }

  public componentDidUpdate(prevProps: IMermaidDiagramProps): void {
    if (prevProps.mermaidDiagram !== this.props.mermaidDiagram) {
      this.renderDiagram().catch(console.error);
    }
  }

  private initializeMermaid(): void {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'strict',
      htmlLabels: false
    });
    this.renderDiagram().catch(console.error);
  }

  private async renderDiagram(): Promise<void> {
    if (!this.diagramRef.current) {
      return;
    }

    // Clear previous content
    this.diagramRef.current.innerHTML = '';

    if (!this.props.mermaidDiagram || this.props.mermaidDiagram.trim() === '') {
      this.diagramRef.current.innerHTML = `<div class="${styles.noMermaidDiagram}">No mermaid diagram specified.</div>`;
      return;
    }

    try {
      // Generate unique ID for the diagram
      const diagramId = `mermaid-diagram-${Date.now()}`;
      
      // Render the diagram
      const { svg } = await mermaid.render(diagramId, this.props.mermaidDiagram);
      
      // Insert the SVG into the DOM
      this.diagramRef.current.innerHTML = svg;
    } catch (error) {
      console.error('Error rendering mermaid diagram:', error);
      this.diagramRef.current.innerHTML = `<div class="${styles.error}">Error rendering diagram</div>`;
    }
  }

  public render(): React.ReactElement<IMermaidDiagramProps> {
    const {
      title,
      showTitle,
      showBorder
    } = this.props;

    const containerClass = showBorder ? styles.diagramContainer : styles.diagramContainerNoBorder;

    return (
      <section className={styles.mermaidDiagram}>
        {showTitle && (
          <div className={styles.welcome}>
            <h2>{title && title.length > 0 ? title : strings.DefaultTitle}</h2>
          </div>
        )}
        <div className={containerClass}>
          <div ref={this.diagramRef} className={styles.diagram} />
        </div>
      </section>
    );
  }
}
