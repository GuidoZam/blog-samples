import { WebPartContext } from '@microsoft/sp-webpart-base';
import { GraphService } from '../services/GraphService';

export interface IPersonalSettingsProps {
  graphService: GraphService;
  context: WebPartContext;
}
