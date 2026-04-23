export const getPlan = async (query: string) => {
  query = query.trim().replace(/;$/, "")
  const res = await fetch("http://localhost:5050/api/plan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw data;
  }

  return data.data;
};
