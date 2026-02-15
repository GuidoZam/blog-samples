// Interfaces for Graph API responses

export interface IDriveItem {
  id: string;
  name: string;
  size: number;
  createdDateTime: string;
  lastModifiedDateTime: string;
  parentReference?: {
    driveId: string;
    driveType: string;
    id: string;
    name: string;
    path: string;
  };
  file?: {
    mimeType: string;
    hashes?: {
      quickXorHash?: string;
      sha1Hash?: string;
      sha256Hash?: string;
    };
  };
  folder?: {
    childCount: number;
  };
  webUrl: string;
  downloadUrl?: string;
  '@microsoft.graph.downloadUrl'?: string;
}

export interface IDriveItemCollection {
  value: IDriveItem[];
  '@odata.nextLink'?: string;
}

export interface ICreateFolderRequest {
  name: string;
  folder: {};
  '@microsoft.graph.conflictBehavior': 'rename' | 'replace' | 'fail';
}

export interface IUploadFileRequest {
  name: string;
  content: string | ArrayBuffer | Blob;
  contentType?: string;
  conflictBehavior?: 'rename' | 'replace' | 'fail';
}

export interface IGraphServiceResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}
