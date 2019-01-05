import PoolInstance from './PoolInstance';
import InjectionOption from './InjectionOption';
import Injectable from './Injectable';
import ServiceNotFoundError from './exception/ServiceNotFoundError';

export default class InjectionPool {
    private pool = {}

    push(name: string, clazz, options: InjectionOption) {
        if (this.pool.hasOwnProperty(name)) {
            console.warn(`has already exit with this name：${name}`)
            return
        }
        this.pool[name] = new PoolInstance(clazz, options)
    }

    pull(name: string): Injectable {
        if (!this.pool.hasOwnProperty(name)) {
            throw new ServiceNotFoundError(`not found this service by name: ${name}`)
        }
        let instance = this.pool[name]
        return instance.getInstance()
    }

}
