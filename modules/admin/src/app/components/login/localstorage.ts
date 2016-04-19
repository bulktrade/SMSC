export class LocalStorage {
    static getLocalStorage() {
        if (typeof(Storage) !== "undefined") {
            return localStorage.getItem("rightWrite");
        }

        return '';
    }
}
