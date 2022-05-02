const fs = require('fs');
class Service{
    constructor(path){
        this.path = path;
    }

    get(){
        return require("../"+this.path);
    }

    add(hostname,target){
        let tmp = this.get();
        tmp.services.push({hostname,target,timeout:5000});
        return this.write(tmp);
    }

    addConfig(serviceIndex,confName,confValue){
        let tmp = this.get();
        if(Array.isArray(tmp.services[serviceIndex][confName])){
            if(tmp.services[serviceIndex][confName].indexOf(confValue) == -1){
                tmp.services[serviceIndex][confName].push(confValue);
                this.write(tmp);
                return true;
            }
            return false;
        }
        return this.createConfig(serviceIndex,confName,confValue);
    }

    createConfig(serviceIndex,confName,confValue){
        let tmp = this.get();
        tmp.services[serviceIndex][confName] = [confValue];
        return this.write(tmp);
    }

    removeConfig(serviceIndex,confName,confIndex){
        let tmp = this.get();
        if(Array.isArray(tmp.services[serviceIndex][confName])){
            tmp.services[serviceIndex][confName].splice(confIndex,1);
            this.write(tmp);
            return true;
        }
        return false;
    }

    removeService(serviceIndex){
        let tmp = this.get();
        tmp.services.splice(serviceIndex,1);
        return this.write(tmp);
    }

    write(data){
        fs.writeFileSync(this.path,`module.exports=${JSON.stringify(data)}`);
        return true;
    }
}

module.exports = Service;