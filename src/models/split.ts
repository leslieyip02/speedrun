import Time from "./time";

class Split {

    private static placeholderTimeString = "-";

    private actualTimeString: string;

    constructor() {
        this.actualTimeString = Split.placeholderTimeString;
    }

    update = (timeString: string) => {
        this.actualTimeString = timeString;
    };

    reset = () => {
        this.actualTimeString = Split.placeholderTimeString;
    };

    toString = () => {
        return this.actualTimeString;
    };
}

export default Split;