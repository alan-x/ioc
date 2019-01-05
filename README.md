### ioc
> ts 写的依赖注入框架，支持服务的懒实例化

![Build Status](https://travis-ci.org/followWinter/ioc.svg?branch=master)

---
 


### API说明
- `Ioc.constructor():Ioc`: 实例化一个`ioc`容器
- `ioc.push(name:String, clazz: Injectable, options?:InjectionOption):void`: 注册一个服务
    - `Injeactable`定义:`{init:(options?:InjectionOption)=>{}}`
    - `InjectionOption`定义:`{lazy:boolean=false}`
- `ioc.pull(name:String): Injectable`: 获取一个服务
 
### 示例
```typescript
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
    http.get() // 'get'
```
