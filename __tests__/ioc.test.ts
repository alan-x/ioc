import Ioc from "../lib/Ioc";
import Injectable from "../lib/Injectable";
import InjectionOption from "../lib/InjectionOption";

test('', () => {
    const ioc = new Ioc()

    class HttpService implements Injectable {
        get() {
            return 'get'
        }

        init(options: InjectionOption) {
        }
    }

    ioc.push('http', HttpService)
    const http = <HttpService>ioc.pull('http')
    expect(http.get()).toBe('get')
})
