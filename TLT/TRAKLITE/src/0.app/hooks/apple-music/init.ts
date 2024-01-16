// @ts-ignore
import AppleMusic from "@bouncyapp/react-native-apple-music";

export const handleInitAppleMusic = async () => {
  const AppleMusicKeyId = "MBVSJA2QBU";
  const AppleMusicTeamId = "3J39XKJXT5";
  const AppleMusicPrivateKey =
    "-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgDnVAe5C0dO1ouzHu\nfEJpHLfb4KsL3kAa5JVOLdcoiu+gCgYIKoZIzj0DAQehRANCAATvYaFa0e/LgWb2\noIwX1OOpBilYle616YJmPDhgNLvtb4YoiDCqIEdSdgcRzEM5rnnLFwc1evaYPyOb\neX8ghAKf\n-----END PRIVATE KEY-----";
  return await AppleMusic.initialize(
    AppleMusicKeyId,
    AppleMusicTeamId,
    AppleMusicPrivateKey
  );
};
