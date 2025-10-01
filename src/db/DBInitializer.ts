import { dbName, dbVersion } from "./consts"
import TrainingHistoryStore from "./TrainingHistoryStore";

export default class DBInitializer {    
    init(): IDBOpenDBRequest {
        const openRequest = indexedDB.open(dbName, dbVersion);

        openRequest.addEventListener('success', this.onSuccess);
        openRequest.addEventListener('upgradeneeded', this.onUpgradeneeded)
        openRequest.addEventListener('error', this.onError);
        openRequest.addEventListener('blocked', this.onBlocked);

        return openRequest
    }

    private onSuccess(this: IDBOpenDBRequest, ev: Event) {
        const db = this.result

        db.addEventListener('versionchange', () => {
            db.close();
            alert('Version of the application is outdated. Pleas refresh the page.')
        })
    }

    private onUpgradeneeded(this: IDBOpenDBRequest, event: IDBVersionChangeEvent) {
        switch (event.oldVersion) {
            case 0:
                new TrainingHistoryStore(this.result).create();
                break;
        
            default:
                break;
        }
    }

    private onError(this: IDBOpenDBRequest) {
        console.log(this.error)
    }

    private onBlocked(this: IDBOpenDBRequest) {
        alert('🤔 The application have updated but there are tabs have old version of the app in the browser. Close other tab and refresh the page.')
    }
}