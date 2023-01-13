export class WFCEvent {
    public type: string;
    public data: any | null;
    
    public constructor(
        type: string,
        data: any | null = null,
    ) {
        this.type = type;
        this.data = data;
    }
}
