export const sendData = (url, method, body) => {
  return fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};

export const getServices = async () => {
  const res = await fetch("http://localhost:4545/services");
  return res.json();
};

export const getServiceById = async (id) => {
  const res = await fetch(`http://localhost:4545/services/${id}`);
  return res.json();
};

export const getFormData = () => {
  return {
    type: document.getElementById("type").value.trim(),
    name: document.getElementById("name").value.trim(),
    units: document.getElementById("units").value.trim(),
    cost: Number(document.getElementById("cost").value.trim()),
  };
};