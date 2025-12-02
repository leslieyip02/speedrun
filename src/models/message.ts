type MessageType = "startTimer"
    | "stopTimer"
    | "resetTimer"
    | "splitTimer"
    | "addSplit"
    | "updateSplitLabel"
    | "syncTimer"
    | "syncSplits";

type BaseMessage = {
    messageType: MessageType;
};

type Message = BaseMessage | SyncTimerMessage | SyncSplitsMessage;

type UpdateSplitLabelMessage = BaseMessage & {
    splitIndex: number;
    label: string;
}

type SyncTimerMessage = BaseMessage & {
    fullString: string;
    splitString: string,
};

type SyncSplitsMessage = BaseMessage & {
    splits: {
        label: string,
        splitString: string,
    }[];
    splitIndex: number;
};

type SendMessageCallback = (message: Message) => void;

export type {
    Message,
    UpdateSplitLabelMessage,
    SyncTimerMessage,
    SyncSplitsMessage,
    SendMessageCallback,
};