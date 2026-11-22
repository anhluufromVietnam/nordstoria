"use client"

import { useRef, useState } from "react"

export default function Home() {
  const cameraRef = useRef<HTMLInputElement>(null)
  const clothingRef = useRef<HTMLInputElement>(null)

  const [person, setPerson] = useState<File | null>(null)
  const [clothing, setClothing] = useState<File | null>(null)

  const [personPreview, setPersonPreview] = useState("")
  const [clothingPreview, setClothingPreview] = useState("")

  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)

  function selectPerson(file: File) {
    setPerson(file)
    setPersonPreview(URL.createObjectURL(file))
  }

  function selectClothing(file: File) {
    setClothing(file)
    setClothingPreview(URL.createObjectURL(file))
  }

  async function tryOn() {
    if (!person || !clothing) {
      alert("Hãy chọn ảnh người và ảnh trang phục")
      return
    }

    setLoading(true)
    setResult("")

    const formData = new FormData()

    formData.append("person", person)
    formData.append("clothing", clothing)

    const response = await fetch(
      "http://localhost:8000/try-on",
      {
        method: "POST",
        body: formData,
      }
    )

    const data = await response.json()

    if (data.success) {
      setResult(
        `http://localhost:8000${data.result}`
      )
    }

    setLoading(false)
  }

  return (
    <main
      style={{
        maxWidth: 900,
        margin: "40px auto",
        padding: 20,
        fontFamily: "Arial",
      }}
    >
      <h1>AI Virtual Try-On</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
        }}
      >

        {/* PERSON */}
        <section>
          <h2>1. Ảnh người</h2>

          <button
            onClick={() =>
              cameraRef.current?.click()
            }
          >
            📷 Chụp ảnh
          </button>

          <input
            ref={cameraRef}
            type="file"
            accept="image/*"
            capture="user"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0]

              if (file) {
                selectPerson(file)
              }
            }}
          />

          {personPreview && (
            <img
              src={personPreview}
              style={{
                width: "100%",
                marginTop: 15,
                borderRadius: 12,
              }}
            />
          )}
        </section>

        {/* CLOTHING */}
        <section>
          <h2>2. Trang phục</h2>

          <button
            onClick={() =>
              clothingRef.current?.click()
            }
          >
            🖼️ Chọn trang phục
          </button>

          <input
            ref={clothingRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0]

              if (file) {
                selectClothing(file)
              }
            }}
          />

          {clothingPreview && (
            <img
              src={clothingPreview}
              style={{
                width: "100%",
                marginTop: 15,
                borderRadius: 12,
              }}
            />
          )}
        </section>

      </div>

      {/* TRY ON */}
      <button
        onClick={tryOn}
        disabled={loading}
        style={{
          width: "100%",
          marginTop: 30,
          padding: 16,
          fontSize: 18,
          cursor: "pointer",
        }}
      >
        {loading
          ? "AI đang xử lý..."
          : "👕 Virtual Try-On"}
      </button>

      {/* RESULT */}
      {result && (
        <section style={{ marginTop: 40 }}>
          <h2>Kết quả</h2>

          <img
            src={result}
            style={{
              width: "100%",
              maxWidth: 600,
              borderRadius: 16,
            }}
          />
        </section>
      )}
    </main>
  )
}
