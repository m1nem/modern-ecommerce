'use client'
import React, { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { CreditCard, Lock } from 'lucide-react'

export default function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [succeeded, setSucceeded] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return
    setIsProcessing(true); setError(null)
    setTimeout(() => { setIsProcessing(false); setSucceeded(true) }, 2000)
  }

  if (succeeded) return (
    <div className="text-center py-8">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></div>
      <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3><p className="text-gray-600">Thank you for your order. You will receive a confirmation email shortly.</p>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div><label className="block text-sm font-medium text-gray-700 mb-2">Card Information</label><div className="border border-gray-300 rounded-lg p-4"><CardElement options={{ style: { base: { fontSize: '16px', color: '#424770', '::placeholder': { color: '#aab7c4' } }, invalid: { color: '#9e2146' } } }} /></div></div>
      {error && <div className="bg-red-50 border border-red-200 rounded-lg p-4"><p className="text-red-600">{error}</p></div>}
      <button type="submit" disabled={!stripe || isProcessing} className="w-full btn-primary flex items-center justify-center space-x-2"><Lock className="h-5 w-5" /><span>{isProcessing ? 'Processing...' : 'Pay Now'}</span></button>
      <p className="text-xs text-gray-500 text-center">Your payment information is secure and encrypted</p>
    </form>
  )
}
