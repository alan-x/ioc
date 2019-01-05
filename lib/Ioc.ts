import Injectable from './Injectable'
import InjectionOption from './InjectionOption'
import InjectionPool from './InjectionPool'

export default class Ioc {
    private injectionPool: InjectionPool

    constructor() {
        this.injectionPool = new InjectionPool()
    }

    push(name: string, clazz, options?: InjectionOption): void {
        this.injectionPool.push(name, clazz, options)
    }

    pull(name: string): Injectable {
        return this.injectionPool.pull(name)
    }
}
