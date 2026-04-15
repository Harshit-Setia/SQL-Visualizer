export const getPlan = async (query: string) => {
  const res = await fetch("http://localhost:5050/api/plan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query })
  })

  if (!res.ok) {
    throw new Error("Failed to fetch plan")
  }

  const data = await res.json()

  return data.data
}