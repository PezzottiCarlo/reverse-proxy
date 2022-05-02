class Util{
    static async addConfig(serviceIndex,confName,confValue){
        let body = {
            serviceIndex,
            confName,
            confValue
        }
        let res = await fetch("addConfig",{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(body)
        });
        let data = await res.json();
        return data;
    }

    static async removeConfig(serviceIndex,confName,confIndex){
        let body = {
            serviceIndex,
            confName,
            confIndex
        }
        let res = await fetch("removeConfig",{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(body)
        });
        let data = await res.json();
        return data;
    }

    static async removeService(serviceIndex){
        let body = {
            serviceIndex
        }
        let res = await fetch("removeService",{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(body)
        });
        let data = await res.json();
        return data;
    }
}

export default Util;