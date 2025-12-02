type MessageType = "startTimer"
    | "stopTimer"
    | "resetTimer"
    | "splitTimer"
    | "addSplit"
    | "syncTimer"
    | "syncSplits";

type BaseMessage = {
    messageType: MessageType;
};

type Message = BaseMessage | AddSplitMessage | SyncTimerMessage | SyncSplitsMessage;

type AddSplitMessage = BaseMessage & {
    label: string;
};

type SyncTimerMessage = BaseMessage & {
    fullString: string;
    splitString: string,
};

type SyncSplitsMessage = BaseMessage & {
    splits: {
        splitString: string,
    }[];
    splitIndex: number;
};

type SendMessageCallback = (message: Message) => void;

export type {
    Message,
    AddSplitMessage,
    SyncTimerMessage,
    SyncSplitsMessage,
    SendMessageCallback,
};