export class Cookie {
    static getCookie() {
        if (document.cookie) {
            return document.cookie.split('=')[1];
        }

        return '';
    }
}
