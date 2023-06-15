/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Item } from '../models/Item';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ItemControllerService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Set iconID by tag ID
     * @param tagId
     * @param iconId
     * @returns string IconID successfully set
     * @throws ApiError
     */
    public setIconIdForItem(
        tagId: string,
        iconId: number,
    ): CancelablePromise<string> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/setIconIDForItem/{tagID}',
            path: {
                'tagID': tagId,
            },
            query: {
                'iconID': iconId,
            },
            errors: {
                404: `Item not found`,
            },
        });
    }

    /**
     * Rename an item by tag ID
     * @param tagId
     * @param newName
     * @returns string Item renamed successfully
     * @throws ApiError
     */
    public renameItem(
        tagId: string,
        newName: string,
    ): CancelablePromise<string> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/renameItem/{tagID}',
            path: {
                'tagID': tagId,
            },
            query: {
                'newName': newName,
            },
            errors: {
                404: `Item not found`,
            },
        });
    }

    /**
     * Edit an item descriptio  by tag ID
     * @param tagId
     * @param newDescription
     * @returns string Item description edited successfully
     * @throws ApiError
     */
    public editItemDescription(
        tagId: string,
        newDescription: string,
    ): CancelablePromise<string> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/editItemDescription/{tagID}',
            path: {
                'tagID': tagId,
            },
            query: {
                'newDescription': newDescription,
            },
            errors: {
                404: `Item not found`,
            },
        });
    }

    /**
     * Neues Item erstellen
     * @param itemName Der Name des Items
     * @param itemDescription Die Beschreibung des Items
     * @param tagId Die ID des Tags
     * @param iconId Die ID des Icons
     * @returns Item Item erfolgreich erstellt
     * @throws ApiError
     */
    public createItem(
        itemName: string,
        itemDescription: string,
        tagId: string,
        iconId: number,
    ): CancelablePromise<Item> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/createItem',
            query: {
                'itemName': itemName,
                'itemDescription': itemDescription,
                'tagID': tagId,
                'iconID': iconId,
            },
            errors: {
                400: `Ungueltige Anforderung`,
            },
        });
    }

    /**
     * Ueberpruefen, ob ein Item fehlt
     * @param tagIDs Ein Array mit den IDs der Items
     * @returns boolean Erfolgreich ueberprueft
     * @throws ApiError
     */
    public isItemMissing(
        tagIDs: Array<string>,
    ): CancelablePromise<boolean> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/isItemMissing',
            query: {
                'tagIDs': tagIDs,
            },
            errors: {
                400: `Ungueltige Anforderung`,
            },
        });
    }

    /**
     * Alle Items abrufen
     * @returns Item Erfolgreich alle Items abgerufen
     * @throws ApiError
     */
    public getAllItemSets(): CancelablePromise<Item> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/getAllItems',
        });
    }

    /**
     * Item loeschen
     * @param tagId Die ID des Items
     * @returns any Item erfolgreich geloescht
     * @throws ApiError
     */
    public deleteItem(
        tagId: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/deleteItem',
            query: {
                'tagID': tagId,
            },
            errors: {
                400: `Item nicht gefunden oder Item ist noch einem Benutzer zugewiesen`,
                404: `Ungueltige Anforderung`,
            },
        });
    }

}
