export interface IStorageSampleState {
  insertedValue?: string;
  retrievedValue?: string;
  expirationMinutes?: number;
  notification?: string;
  notificationType?: any;
  storageType?: 'local' | 'session';
}
