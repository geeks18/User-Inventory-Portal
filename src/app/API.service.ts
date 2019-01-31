/* tslint:disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import aws_config from "../aws-exports";
import Amplify from "@aws-amplify/api";
import API, { graphqlOperation } from "@aws-amplify/api";
import { GraphQLResult } from "@aws-amplify/api/lib/types";
import * as Observable from "zen-observable";

Amplify.configure(aws_config);
export type AddItemMutation = {
  __typename: string;
  name: string;
  content: string | null;
  id: string;
  title: string | null;
  url: string | null;
  version: number;
};

export type DeleteItemMutation = {
  __typename: string;
  name: string;
  content: string | null;
  id: string;
  title: string | null;
  url: string | null;
  version: number;
};

export type UpdateItemMutation = {
  __typename: string;
  name: string;
  content: string | null;
  id: string;
  title: string | null;
  url: string | null;
  version: number;
};

export type AllItemsQuery = {
  __typename: string;
  items: Array<{
    __typename: "Item";
    name: string;
    content: string | null;
    id: string;
    title: string | null;
    url: string | null;
    version: number;
  }>;
  nextToken: string | null;
};

export type AllItemsByTitleQuery = {
  __typename: string;
  items: Array<{
    __typename: "Item";
    name: string;
    content: string | null;
    id: string;
    title: string | null;
    url: string | null;
    version: number;
  }>;
  nextToken: string | null;
};

export type GetItemQuery = {
  __typename: string;
  name: string;
  content: string | null;
  id: string;
  title: string | null;
  url: string | null;
  version: number;
};

export type NewItemSubscription = {
  __typename: string;
  name: string;
  content: string | null;
  id: string;
  title: string | null;
  url: string | null;
  version: number;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async AddItem(
    name: string,
    id: string,
    content?: string,
    title?: string,
    url?: string
  ): Promise<AddItemMutation> {
    const statement = `mutation AddItem($name: String!, $content: String, $id: ID!, $title: String, $url: String) {
        addItem(name: $name, content: $content, id: $id, title: $title, url: $url) {
          __typename
          name
          content
          id
          title
          url
          version
        }
      }`;
    const gqlAPIServiceArguments: any = {
      name,
      id
    };
    if (content) {
      gqlAPIServiceArguments.content = content;
    }
    if (title) {
      gqlAPIServiceArguments.title = title;
    }
    if (url) {
      gqlAPIServiceArguments.url = url;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <AddItemMutation>response.data.addItem;
  }
  async DeleteItem(id: string): Promise<DeleteItemMutation> {
    const statement = `mutation DeleteItem($id: ID!) {
        deleteItem(id: $id) {
          __typename
          name
          content
          id
          title
          url
          version
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteItemMutation>response.data.deleteItem;
  }
  async UpdateItem(
    name: string,
    content: string,
    id: string,
    title: string,
    url: string
  ): Promise<UpdateItemMutation> {
    const statement = `mutation UpdateItem($name: String!, $content: String!, $id: ID!, $title: String!, $url: String!) {
        updateItem(name: $name, content: $content, id: $id, title: $title, url: $url) {
          __typename
          name
          content
          id
          title
          url
          version
        }
      }`;
    const gqlAPIServiceArguments: any = {
      name,
      content,
      id,
      title,
      url
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateItemMutation>response.data.updateItem;
  }
  async AllItems(count?: number, nextToken?: string): Promise<AllItemsQuery> {
    const statement = `query AllItems($count: Int, $nextToken: String) {
        allItems(count: $count, nextToken: $nextToken) {
          __typename
          items {
            __typename
            name
            content
            id
            title
            url
            version
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (count) {
      gqlAPIServiceArguments.count = count;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <AllItemsQuery>response.data.allItems;
  }
  async AllItemsByTitle(
    title: string,
    count?: number,
    nextToken?: string
  ): Promise<AllItemsByTitleQuery> {
    const statement = `query AllItemsByTitle($title: String!, $count: Int, $nextToken: String) {
        allItemsByTitle(title: $title, count: $count, nextToken: $nextToken) {
          __typename
          items {
            __typename
            name
            content
            id
            title
            url
            version
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {
      title
    };
    if (count) {
      gqlAPIServiceArguments.count = count;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <AllItemsByTitleQuery>response.data.allItemsByTitle;
  }
  async GetItem(id: string): Promise<GetItemQuery> {
    console.log("Get Item")
    const statement = `query GetItem($id: ID!) {
        getItem(id: $id) {
          __typename
          name
          content
          id
          title
          url
          version
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetItemQuery>response.data.getItem;
  }
  NewItemListener: Observable<NewItemSubscription> = API.graphql(
    graphqlOperation(
      `subscription NewItem {
        newItem {
          __typename
          name
          content
          id
          title
          url
          version
        }
      }`
    )
  ) as Observable<NewItemSubscription>;
}
