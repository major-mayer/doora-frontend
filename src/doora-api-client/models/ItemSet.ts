/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Item } from './Item';

export type ItemSet = {
    itemSetID?: number;
    alwaysRequired?: boolean;
    itemSetName?: string;
    itemSetDescription?: string;
    assignedItems?: Array<Item>;
};

