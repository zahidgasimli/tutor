export const sendWebviewMessage = (message) => {
    ((window as unknown) as Window & {
        ReactNativeWebView: { postMessage: (param: string) => void };
    }).ReactNativeWebView?.postMessage(JSON.stringify(message));
};
