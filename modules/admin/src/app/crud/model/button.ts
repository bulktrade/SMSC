export class Button {
    /**
     * The button name in a tooltip
     */
    public nameButton: string;
    /**
     * Icon name
     */
    public iconName: string;
    /**
     * A function to execute each time the event is triggered
     */
    public clickEvent: (event) => void;
}
