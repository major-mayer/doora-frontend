/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Item = {
    tagID?: string;
    iconID?: number;
    itemName?: string;
    itemDescription?: string;
    /**
     * Timestamp when the item was created (without seconds and milliseconds)
     */
    creationTimestamp?: string;
    /**
     * Timestamp when the item was last accessed (without seconds and milliseconds)
     */
    lastAccessedTimestamp?: string;
};

