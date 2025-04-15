import Toast from "react-native-toast-message";

export function showToast(txt: string, type: string) {
    Toast.show({
        type: type,
        text1: txt,
    });
}