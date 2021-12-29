import NfcManager, { NfcTech, Ndef } from "react-native-nfc-manager";

async function initNfc() {
  await NfcManager.start();
}

async function writeNdef(url) {
  let result = false;

  try {
    // Step 1
    await NfcManager.requestTechnology(NfcTech.Ndef, {
      alertMessage: "Tap your Telly to activate it",
    });

    const bytes = Ndef.encodeMessage([Ndef.uriRecord(url)]);

    if (bytes) {
      await NfcManager.ndefHandler // Step2
        .writeNdefMessage(bytes); // Step3

      if (Platform.OS === "ios") {
        await NfcManager.setAlertMessageIOS("Successfully activated Telly!");
      }
    }

    result = true;
  } catch (ex) {
    console.warn(ex);
  }

  // Step 4
  NfcManager.cancelTechnologyRequest().catch(() => 0);
  return result;
}

export default function handleNfc(profileId, cb) {
  const url = "https://app.gettelly.com/" + profileId;

  initNfc().then(() => {
    writeNdef(url).then(() => {
      cb();
    });
  });
}
