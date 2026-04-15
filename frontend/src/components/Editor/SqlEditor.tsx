import { useState } from "react"

const SqlEditor = ({ onRun }: { onRun: (q: string) => void }) => {
  const [query, setQuery] = useState("SELECT * FROM users")

  return (
    <div>
      <textarea
        value={query}
        onChange={e => setQuery(e.target.value)}
        rows={5}
        style={{ width: "100%" }}
      />
      <button onClick={() => onRun(query)}>Run</button>
    </div>
  )
}

export default SqlEditor