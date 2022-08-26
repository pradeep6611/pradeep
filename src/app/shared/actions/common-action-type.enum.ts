import { NoopAction } from "./noop-action";

export enum CommonActionType {
    NOOP = 'NOOP'
}

export type CommonActions = 
    NoopAction