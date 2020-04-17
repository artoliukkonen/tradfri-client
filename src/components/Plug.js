import React, { useContext } from 'react';
import { Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { toggle, fetchDevices } from '../modules/device';
import { DevicesContext } from '../context/DevicesContext';

const Plug = ({ plug, refresh }) => {
  const p = plug.plugList[0];
  const { setDevices } = useContext(DevicesContext);

  return (
    <div className={`lights ${p.onOff && 'lights__on'}`}>
      <div className="light__header">{plug.name}</div>
      <div className="light__row">
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          defaultChecked={p.onOff}
          onChange={(checked) => {
            toggle(plug.instanceId);
            setTimeout(async () => { setDevices(await fetchDevices(true)) }, 750);
          }}
        />
      </div>
    </div>
  );
};

export default Plug;