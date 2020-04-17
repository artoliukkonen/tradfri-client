import React, { useState, useContext } from 'react';
import Draggable from 'react-draggable'
import { Tooltip } from 'antd';
import Icon from './Icon';
import { toggle, setBrightness, fetchDevices } from '../modules/device';
import { DevicesContext } from '../context/DevicesContext';

const BRIGHTNESS_RANGE = 150;

const Lightbulb = ({ bulb, refresh }) => {
  const [deltaPosition, setDelta] = useState({ x: 0, y: 0 });
  const [targetPosition, setTarget] = useState(null);
  const { setDevices } = useContext(DevicesContext);


  const light = bulb.lightList[0];

  const percentagePosition = targetPosition ? targetPosition : (deltaPosition.x ? ((deltaPosition.x + BRIGHTNESS_RANGE / 2) / BRIGHTNESS_RANGE * 100) : light.dimmer);
  const strokeDasharray = 312 - (percentagePosition * (312 - 250) / 100);

  return (
    <div className={`lights ${light.onOff && 'lights__on'}`}>
      {/* <div className="light__header">{bulb.name}</div> */}
      <div className="light__controls">
        <div className="light__slider"></div>
        <svg className="light__circle" height="105" width="100">
          <circle cx="50" cy="55" r="40" style={{ strokeDasharray }}></circle>
        </svg>
        <div className="light__icon">
          <Icon id={bulb.instanceId} />
        </div>
        <Draggable
          axis="x"
          defaultPosition={{ x: 0, y: 0 }}
          position={{ x: 0, y: 0 }}
          bounds={{ left: -(BRIGHTNESS_RANGE / 2), right: BRIGHTNESS_RANGE / 2 }}
          scale={1}
          onStart={(v) => { setTarget(null); }}
          onDrag={(e, ui) => {
            const { x, y } = deltaPosition;
            setDelta({
              x: x + ui.deltaX,
              y: y + ui.deltaY,
            });
          }}
          onStop={(v) => {
            console.log('STOP', v, deltaPosition);
            if (!deltaPosition.x) {
              toggle(bulb.instanceId);
              setTimeout(async () => { setDevices(await fetchDevices(true)) }, 750);
              return;
            }
            const position = (deltaPosition.x + BRIGHTNESS_RANGE / 2) / BRIGHTNESS_RANGE * 100;
            setDelta({ x: 0, y: 0 });
            setBrightness(bulb.instanceId, position);
            setTimeout(async () => { setDevices(await fetchDevices(true)) }, 750);
            setTarget(position);
          }}>
          <Tooltip title={Math.round(percentagePosition)} placement="top">
            <div className="light__draggable">
              &nbsp;
          </div>
          </Tooltip>
        </Draggable>
      </div>
    </div>
  )
}

export default Lightbulb;