declare interface ICommandSetGroupingSampleCommandSetStrings {
  InstallHardware: string;
  RetireHardware: string;
  RepairRequest: string;
  InstallSoftware: string;
  UpdateSoftware: string;
  CreateTicket: string;
  RemoteAssist: string;
}

declare module 'CommandSetGroupingSampleCommandSetStrings' {
  const strings: ICommandSetGroupingSampleCommandSetStrings;
  export = strings;
}
