'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-error">Something went wrong!</h2>
          <p className="text-sm text-base-content/70">{error.message}</p>
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-primary" onClick={reset}>
              Try again
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}