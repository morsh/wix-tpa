export interface HandshakeMessage {
  type: string;
  bridgeType: string;
  version: string;
  port: MessagePort;
}

export const ChannelPickerMessageType = 'channel-picker-child-initialize';

export const EstablishConnectionMessage = { comlinkInit: true };

export interface ChannelInitializationData extends Omit<HandshakeMessage, 'type'> { }