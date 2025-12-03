import {
    Message,
    SendMessageCallback,
    UpdateSplitLabelMessage,
    UpdateSplitTargetMessage,
} from "./message";
import Split from "./split";
import Time from "./time";

class RunManager {

    private sendMessage: SendMessageCallback;

    private time: Time;
    private timerCancel: NodeJS.Timeout | null;

    private splits: Split[];
    private splitIndex: number;

    constructor(sendMessage: SendMessageCallback) {
        this.sendMessage = sendMessage;

        this.time = Time.fromMilliseconds(0);
        this.timerCancel = null;

        this.splits = [new Split()];
        this.splitIndex = 0;
    }

    sync = () => {
        this.syncTimer();
        this.syncSplits();
    };

    didReceiveMessage = (message: Message) => {
        console.log("message:", message);

        switch (message.messageType) {
            case "startTimer":
                this.startTimer();
                return;

            case "stopTimer":
                this.stopTimer();
                return;

            case "splitTimer":
                this.splitTimer();
                return;

            case "resetTimer":
                this.resetTimer();
                return;

            case "addSplit":
                this.addSplit();
                return;

            case "updateSplitLabel":
                this.updateSplitLabel(message as UpdateSplitLabelMessage);
                return;

            case "updateSplitTarget":
                this.updateSplitTarget(message as UpdateSplitTargetMessage);
                return;

            default:
                throw new Error(`unexpected message: ${message}`);
        }
    };

    private startTimer = () => {
        if (this.timerCancel) {
            return;
        }
        this.timerCancel = setInterval(this.tick, 10);
    };

    private stopTimer = () => {
        if (!this.timerCancel) {
            return;
        }
        clearInterval(this.timerCancel);
        this.timerCancel = null;
    };

    private resetTimer = () => {
        this.stopTimer();
        this.time = Time.fromMilliseconds(0);
        this.syncTimer();

        this.splitIndex = 0;
        this.splits.forEach((split) => split.reset());
        this.syncSplits();
    };

    private splitTimer = () => {
        if (this.splitIndex === this.splits.length) {
            return;
        }
        this.splitIndex++;
        this.syncSplits();
    };

    private addSplit = () => {
        this.splits.push(new Split());
        this.syncSplits();
    };

    private updateSplitLabel = (message: UpdateSplitLabelMessage) => {
        const { splitIndex, label } = message;
        this.splits[splitIndex].updateLabel(label);
    };

    private updateSplitTarget = (message: UpdateSplitTargetMessage) => {
        const { splitIndex, targetMilliseconds } = message;
        const targetTime = Time.fromMilliseconds(targetMilliseconds);
        this.splits[splitIndex].updateTarget(targetTime);
    };

    private tick = () => {
        this.time = this.time.increment(10);
        this.splits[this.splitIndex].updateTime(this.time);
        this.syncTimer();
    };

    private syncTimer = () => {
        this.sendMessage({
            messageType: "syncTimer",
            fullString: this.time.toFullString(),
            splitString: this.time.toSplitString(),
        });
    };

    private syncSplits = () => {
        this.sendMessage({
            messageType: "syncSplits",
            splits: this.splits.map((split) => split.serialize()),
            splitIndex: this.splitIndex,
        });
    };
}

export default RunManager;