import React, { useContext, useEffect } from 'react';
import { Spin } from 'antd';
import Plug from './Plug';
import Lightbulb from './Lightbulb';
import { floors, presets } from '../config';
import { fetchDevices, onOff, setBrightness } from '../modules/device';
import { DevicesContext } from '../context/DevicesContext';
import Icon from './Icon';
import '../App.css';

const Dashboard = () => {
  const { devices, setDevices } = useContext(DevicesContext);
  const { lightbulbs, plugs } = devices;

  const runPreset = async (preset) => {
    for (const s in preset.bulbs) {
      const setting = preset.bulbs[s];
      if (setting.brightness) {
        setBrightness(setting.id, setting.brightness);
      } else {
        onOff(setting.id, setting.on);
      }
    }
    for (const s in preset.plugs) {
      const setting = preset.plugs[s];
      onOff(setting.id, setting.on);
    }

    setDevices({ lightbulbs: [], plugs: [] });
    setTimeout(async () => { setDevices(await fetchDevices()) }, 750);
  }

  useEffect(() => {
    const fetchData = async () => {
      const devices = await fetchDevices();
      setDevices(devices);
    };
    fetchData();
  }, [setDevices]);

  if (Object.keys(devices.lightbulbs).length) {
    if (window.location.hash === '#aamu') {
      runPreset(presets[0]);
      window.location.hash = '';
    }
    if (window.location.hash === '#ilta') {
      runPreset(presets[1]);
      window.location.hash = '';
    }
    if (window.location.hash === '#yo') {
      runPreset(presets[2]);
      window.location.hash = '';
    }
  }

  return (
    <div className="App">
      <div className="presets">
        {presets.map(preset => (
          <div onClick={() => runPreset(preset)} className="light__icon">
            <Icon id={preset.icon} />
          </div>
        ))}
      </div>
      {Object.keys(floors).map(floorId => (
        <div className="floor" key={floorId}>
          <b>{floorId}</b>
          {!Object.keys(lightbulbs).length && (
            <Spin size="large" style={{ padding: '2rem' }} />
          )}
          <div className="lightbulbs">
            {Object.keys(lightbulbs).filter(light => floors[floorId].includes(parseInt(light, 10))).map(light => (
              <Lightbulb bulb={lightbulbs[light]} key={light} />
            ))}
          </div>

          <div className="lightbulbs">
            {Object.keys(plugs).filter(plug => floors[floorId].includes(parseInt(plug, 10))).map(plug => (
              <Plug plug={plugs[plug]} key={plug} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
