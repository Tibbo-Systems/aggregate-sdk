import ByteBuffer from 'bytebuffer';

export default interface BlockingChannel {
  isUsesCompression(): boolean;

  setUsesCompression(usesCompression: boolean): void;

  flush(): void;

  getChannelAddress(): string;

  read(dst: ByteBuffer): number;

  write(src: ByteBuffer): number;

  isOpen(): boolean;

  close(): void;

  setListener(listener: () => void): void;
}
