import { time } from "console";

class Time {

    private hours: number;
    private minutes: number;
    private seconds: number;
    private milliseconds: number;

    constructor(hours: number, minutes: number, seconds: number, milliseconds: number) {
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
        this.milliseconds = milliseconds;
    }

    static fromMilliseconds = (milliseconds: number) => {
        return new Time(
            Math.floor(milliseconds / 1000 / 60 / 60),
            Math.floor(milliseconds / 1000 / 60 % 60),
            Math.floor(milliseconds / 1000 % 60),
            milliseconds % 1000,
        );
    };

    toMilliseconds = () => {
        return this.hours * 60 * 60 * 1000
            + this.minutes * 60 * 1000
            + this.seconds * 1000
            + this.milliseconds;
    };

    toSplitString = () => {
        const components = [
            this.toHourString(),
            this.toMinuteString() ?? "0",
            String(this.seconds).padStart(2, "0"),
        ];
        return components
            .filter(component => component)
            .join(":");
    };

    toFullString = () => {
        const components = [
            this.toHourString(),
            this.toMinuteString(),
            `${this.toSecondString()}.${this.toMillisecondString()}`,
        ];
        return components
            .filter(component => component)
            .join(":");
    };

    private toHourString = () => {
        return this.hours > 0 ? String(this.hours) : null;
    };

    private toMinuteString = () => {
        if (this.minutes === 0) {
            return null;
        }

        return this.hours > 0
            ? String(this.minutes).padStart(2, "0")
            : String(this.minutes);
    };

    private toSecondString = () => {
        return this.minutes > 0
            ? String(this.seconds).padStart(2, "0")
            : String(this.seconds);
    };

    private toMillisecondString = () => {
        return String((this.milliseconds / 10).toFixed(0)).padStart(2, "0");
    };

    increment = (ms: number) => {
        return Time.fromMilliseconds(this.toMilliseconds() + ms);
    };

    difference = (other: Time) => {
        return this.toMilliseconds() - other.toMilliseconds();
    };

    equals = (other: any) => {
        if (!(other instanceof Time)) {
            return false;
        }

        return this.hours === other.hours
            && this.minutes === other.minutes
            && this.seconds === other.seconds
            && this.milliseconds === other.milliseconds;
    };
}

export default Time;