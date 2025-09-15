import { useEffect } from "react"
import { useNavigate } from "react-router"

export default function ComponentsIndex() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate("/components/patterns")
  }, [])

  return null
}
