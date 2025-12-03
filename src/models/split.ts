import Time from "./time";

class Split {

    private static placeholderString = "-";

    private label: string;
    private actualTime: Time | null;
    private targetTime: Time | null;

    constructor() {
        this.label = Split.placeholderString;
        this.actualTime = null;
        this.targetTime = null;
    }

    updateLabel = (label: string) => {
        this.label = label;
    };

    updateTarget = (time: Time) => {
        this.targetTime = time;
    };

    updateTime = (time: Time) => {
        this.actualTime = time;
    };

    reset = () => {
        this.actualTime = null;
    };

    private serializeDiff = () => {
        if (this.targetTime === null || this.actualTime === null) {
            return Split.placeholderString;
        }

        const diff = this.targetTime.difference(this.actualTime);
        const prefix = diff >= 0 ? "+" : "-";
        return prefix + Time.fromMilliseconds(Math.abs(diff)).toSplitString();
    };

    private serializeTargetTime = () => {
        return this.targetTime?.toSplitString() ?? Split.placeholderString;
    };

    private serializeActualTime = () => {
        return this.actualTime?.toSplitString() ?? Split.placeholderString;
    };

    serialize = () => {
        return {
            label: this.label,
            diff: this.serializeDiff(),
            target: this.serializeTargetTime(),
            actual: this.serializeActualTime(),
        };
    };
}

export default Split;