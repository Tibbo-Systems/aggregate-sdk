enum ProtocolVersion {
  V2 = '2',
  V3 = '3', // Length-byte added to commands. Compression can be used.
  V4 = '4', // Embedded DataFable fields escaping reduced. Add/remove listener commands extended by fingerprint parameter (AGG-8259)
}

export default ProtocolVersion;
