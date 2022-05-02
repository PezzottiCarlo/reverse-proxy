import "./Service.css";
import Util from "./Util";
import { useState } from "react";
import { FiLock, FiEyeOff, FiEye, FiTrash, FiPlusCircle } from "react-icons/fi";

const Service = ({service,callback}) => {

    const [showConf, setShowConf] = useState(false);
    const [confs, setConfs] = useState([]);
    const [confName, setConfName] = useState(null);
    console.log(callback)


    const showConfig = (conf, confName) => {
        setConfs([])
        setConfName(confName)
        if (conf) {
            setConfs(conf);
        }
        setShowConf(!showConf);
    }

    const addConfig = async () => {
        let tmpVal = "/page";
        if(confs.indexOf(tmpVal) == -1)
            setConfs([...confs, tmpVal])
    }

    const applyConfig = async (index, value) => {
        console.log(index, value)
        if (value === "/page")
            return
        if (confs.indexOf(value) === -1) {
            let res = await Util.addConfig(service.index, confName, value);
            if (res.success) {
                let tmp = confs;
                tmp[index] = value;
                console.log(tmp)
                setConfs(tmp);
                service[confName] = tmp;
            }
        }
    }

    const removeConfig = async (index) => {
        let conf = [...confs];
        conf.splice(index, 1);
        console.log(conf)
        let res = await Util.removeConfig(service.index, confName, index);
        if (res.success) {
            setConfs(conf);
            service[confName] = conf;
        }
    }

    const removeService = async () => {
        let res = await Util.removeService(service.index);
        if (res.success) {
            callback();
        }
    }

    

    return (
        <div className="service-cnt">
            <div className="service">
                <div className="service-name medium">{service.hostname}</div>
                <div className="service-target medium">{service.target}</div>
                <div className="service-timeout small">{service.timeout}</div>
                <div className="service-auth small icon"><FiLock /></div>
                <div className="service-ignore small icon" onClick={() => { showConfig(service.ignore, "ignore") }}><FiEyeOff /></div>
                <div className="service-authOnly small icon" onClick={() => { showConfig(service.authOnly, "authOnly") }}><FiEye /></div>
                <div className="service-delete small icon" onClick={removeService}><FiTrash /></div>
            </div>
            {(showConf) ? (
                <div className="service-conf">
                    <div className="service-conf-list">
                        {confs.map((conf, index) => {
                            return (
                                <div className="service-conf-item">
                                    <div className="service-conf-value" onBlur={(e) => { applyConfig(index, e.target.innerHTML) }} contentEditable={conf === "/page"}>{conf}</div>
                                    <div className="service-conf-remove" onClick={() => { removeConfig(index) }}><FiTrash /></div>
                                </div>
                            )
                        })}
                        <div className="service-conf-add" onClick={addConfig}>
                            <button className="add-icon"><FiPlusCircle /></button>
                        </div>
                    </div>
                </div>) : (null)}
        </div>
    );
}

export default Service;