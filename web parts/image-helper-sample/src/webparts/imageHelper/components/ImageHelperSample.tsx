import * as React from 'react';
import styles from './ImageHelper.module.scss';
import type { IImageHelperProps } from './IImageHelperProps';
import * as strings from 'ImageHelperWebPartStrings';
import { ImagePicker, IFilePickerResult } from '@pnp/spfx-controls-react/lib/ImagePicker';
import { ImageHelper } from '@microsoft/sp-image-helper';

interface IState {
  imageUrl: string;
  selectedWidth: number;
}

export default class ImageHelperSample extends React.Component<IImageHelperProps, IState> {
  constructor(props: IImageHelperProps) {
    super(props);
    this.state = {
      imageUrl: '',
      selectedWidth: 400
    };
  }

  public render(): React.ReactElement<IImageHelperProps> {
  const { imageUrl, selectedWidth } = this.state;

  const convertedImage = imageUrl ? ImageHelper.convertToImageUrl({ sourceUrl: imageUrl, width: selectedWidth }) : '';

    return (
      <section className={styles.imageHelper}>
        <h3>{strings.Title}</h3>
        <div>
          <div style={{ margin: '12px 0' }}>
            <label htmlFor="widthSelector">{strings.SelectWidth}:&nbsp;</label>
            <select
              id="widthSelector"
              value={selectedWidth}
              onChange={e => this.setState({ selectedWidth: Number(e.target.value) })}
            >
              <option value={200}>200</option>
              <option value={400}>400</option>
              <option value={960}>960</option>
              <option value={1600}>1600</option>
              <option value={2560}>2560</option>
            </select>
            &nbsp;px
          </div>
          <ImagePicker
            context={this.props.context}
            onFileSelected={(file: IFilePickerResult): void => {
              this.setState({
                imageUrl: file.fileAbsoluteUrl
              });
            }}
            onDeleteFile={() => {
              this.setState({
                imageUrl: ''
              });
            }}
            selectedFileUrl={imageUrl ?? ''}
          />
        </div>
        <div id="sampleContent">
          <h4>{strings.ResultTitle}</h4>
          <div>{convertedImage ? <img src={convertedImage} alt="converted" /> : (strings.NoImage)}</div>
          <div>{strings.URL}: {convertedImage}</div>
        </div>
      </section>
    );
  }
}
