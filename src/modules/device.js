const ADDRESS = process.env.REACT_APP_API;

const setBrightness = async (bulb, brightness) => {
  if (brightness === 0) {
    toggle(bulb);
    return;
  }
  return await fetch(`${ADDRESS}/brightness`, {
    method: 'PUT',
    body: JSON.stringify({ device: bulb, brightness: Math.round(brightness, 10) }),
    headers: {
      'Content-Type': 'application/json'
    },
  });
};

const toggle = async (bulb) => {
  return await fetch(`${ADDRESS}/toggle`, {
    method: 'PUT',
    body: JSON.stringify({ device: bulb }),
    headers: {
      'Content-Type': 'application/json'
    },
  });
};

const onOff = async (bulb, on) => {
  let path = 'on';
  if (!on) path = 'off';
  return await fetch(`${ADDRESS}/${path}`, {
    method: 'PUT',
    body: JSON.stringify({ device: bulb }),
    headers: {
      'Content-Type': 'application/json'
    },
  });
};

const fetchDevices = async () => {
  const result = await fetch(
    `${ADDRESS}/list`,
  );
  return await result.json();
};

export { fetchDevices, toggle, onOff, setBrightness }