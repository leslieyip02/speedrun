import Time from "./time";

class Split {

    private static placeholderTimeString = "-";

    private label: string;
    private actualTimeString: string;

    constructor() {
        this.label = Split.placeholderTimeString;
        this.actualTimeString = Split.placeholderTimeString;
    }

    updateActualTimeString = (timeString: string) => {
        this.actualTimeString = timeString;
    };

    updateLabel = (label: string) => {
        this.label = label;
    };

    reset = () => {
        this.actualTimeString = Split.placeholderTimeString;
    };

    serialize = () => {
        return {
            label: this.label,
            splitString: this.actualTimeString,
        };
    };
}

export default Split;