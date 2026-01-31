type MessageType = "startTimer"
    | "stopTimer"
    | "resetTimer"
    | "splitTimer"
    | "addSplit"
    | "removeSplit"
    | "updateSplitLabel"
    | "updateSplitTarget"
    | "syncTimer"
    | "syncSplits";

type BaseMessage = {
    messageType: MessageType;
};

type Message = BaseMessage | SyncTimerMessage | SyncSplitsMessage;

type UpdateSplitLabelMessage = BaseMessage & {
    splitIndex: number;
    label: string;
};

type UpdateSplitTargetMessage = BaseMessage & {
    splitIndex: number;
    targetMilliseconds: number;
};

type SyncTimerMessage = BaseMessage & {
    fullString: string;
    splitString: string,
};

type SyncSplitsMessage = BaseMessage & {
    splits: {
        label: string,
        diff: string,
        target: string,
        actual: string,
    }[];
    splitIndex: number;
};

type SendMessageCallback = (message: Message) => void;

export type {
    Message,
    UpdateSplitLabelMessage,
    UpdateSplitTargetMessage,
    SyncTimerMessage,
    SyncSplitsMessage,
    SendMessageCallback,
};