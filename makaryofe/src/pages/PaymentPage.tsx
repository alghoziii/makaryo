import { useState } from 'react'
import type { FormEvent } from 'react'

type PaymentFormErrors = {
  cardNumber?: string
}

export default function PaymentPage() {
  const [cardNumber, setCardNumber] = useState('')
  const [formErrors, setFormErrors] = useState<PaymentFormErrors>({})
  const [successMessage, setSuccessMessage] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!cardNumber.trim()) {
      setFormErrors({ cardNumber: 'Nomor kartu wajib diisi.' })
      setSuccessMessage('')
      return
    }

    setFormErrors({})
    setSuccessMessage('Pembayaran berhasil diproses.')
  }

  return (
    <section>
      <h1>Payment Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="card-number">Nomor kartu</label>
        <input
          id="card-number"
          name="card-number"
          value={cardNumber}
          onChange={(event) => setCardNumber(event.target.value)}
        />
        {formErrors.cardNumber ? <p>{formErrors.cardNumber}</p> : null}

        <button type="submit">Bayar sekarang</button>
      </form>

      {successMessage ? <p>{successMessage}</p> : null}
    </section>
  )
}
