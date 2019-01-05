import Injectable from './Injectable';
import InjectionOption from './InjectionOption';

export default class PoolInstance {
    private readonly Cons
    private readonly options: InjectionOption
    private instance: Injectable
    private initial: boolean = false


    constructor(cons, options?: InjectionOption) {
        this.Cons = cons
        this.options = options
        if (options && !options.lazy) {
            this.initInstance()
        }
    }

    getInstance() {
        if (!this.initial) {
            this.initInstance()
        }
        return this.instance
    }

    private initInstance() {
        let instance = new this.Cons()
        instance.hasOwnProperty('init') && instance.init(this.options)
        this.instance = instance
        this.initial = true
    }
}
