import { defineStore } from 'pinia'
import { DooraApiClient, ItemControllerService, ItemSetControllerService, OpenAPI } from '@/doora-api-client'

interface Item {
  id: number,
  name: string,
  description: string,
  rfidCode: string,
  created: string,
  lastAccessed: string
}

interface Collection {
  id: number,
  name: string,
  alwaysRequired: boolean,
  description: string | null,
  itemIds: number[]
}


export const useDooraStore = defineStore('items',
  {
    state: () => ({
      items: [
        { id: 0, name: 'Portemonnaie', description: "Das mit den dicken Batzen", rfidCode: "abc123", created: "2023-06-15T14:53:57.038Z", lastAccessed: "2023-06-15T14:53:57.038Z" },
        { id: 1, name: 'Schlüssel', description: "Haustüre, Garage und Büro", rfidCode: "abc123", created: "2023-06-15T14:53:57.038Z", lastAccessed: "2023-06-15T14:53:57.038Z" },
        { id: 2, name: 'Wasserflasche', description: null, rfidCode: "abc123", created: "2023-06-15T14:53:57.038Z", lastAccessed: "2023-06-15T14:53:57.038Z" },
        { id: 3, name: 'Laptop', description: null, rfidCode: "abc123", created: "2023-06-15T14:53:57.038Z", lastAccessed: "2023-06-15T14:53:57.038Z" },
        { id: 4, name: 'Sportschuhe', description: "Weiße Nikes, Größe 44", rfidCode: "abc123", created: "2023-06-15T14:53:57.038Z", lastAccessed: "2023-06-15T14:53:57.038Z" },
      ] as Item[],

      collections: [
        {
          id: 0, name: "Uni", itemIds: [0, 1, 2, 3], alwaysRequired: false,
        },
        {
          id: 1, name: "Sport", description: "Meine Fußball Sachen", itemIds: [0, 1, 2, 4], alwaysRequired: false

        }
      ] as Collection[]
    }),

    getters: {
      getItemById: (state) => {
        return (id: number) => state.items.find((item) => item.id === id)
      },
      getItemsForCollectionId: (state) => {
        return (id: number) => {
          const itemIds = state.collections.find((collection) => collection.id === id)?.itemIds

          return state.items.filter((item) => itemIds?.includes(item.id));
        }
      },
      getCollectionById: (state) => {
        return (id: number) => state.collections.find((collection) => collection.id === id)
      }
    },

    actions: {
      async initData() {
        const items = await ItemControllerService.getAllItemSets() // This is correct and downloads Items! 
        console.log(items)

        const collections = await ItemSetControllerService.getAllItemSets1(); // This downloads all Item Sets!
        console.log(collections)
      },
      addItem(name: string, description: string, rfidCode: string) {
        ItemControllerService.createItem(name, description, rfidCode, 0);
        const id = this.items.length;
        this.items.push({
          id, name, description, rfidCode, created: "2023-06-15T14:53:57.038Z", lastAccessed: "2023-06-15T14:53:57.038Z"
        });
        return id;
      },
      addCollection(name: string, description: string | null, itemIds: number[], alwaysRequired: boolean) {
        const id = this.collections.length;
        this.collections.push({
          id, name, description, itemIds, alwaysRequired
        });
        return id;
      },
      updateItem(updatedItem: Item) {
        // fetch(  update api)
        let storeItemIndex = this.items.findIndex((item) => item.id == updatedItem.id)
        this.items[storeItemIndex] = updatedItem
      },
      updateCollection(updatedCollection: Collection) {
        // fetch(  update api)
        let storeCollectionIndex = this.items.findIndex((collection) => collection.id == updatedCollection.id)
        this.collections[storeCollectionIndex] = updatedCollection
      }
    }
  })