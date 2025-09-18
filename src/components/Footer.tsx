import React from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-primary-400 mb-4">ModernShop</h3>
            <p className="text-gray-300 mb-4">Your premier destination for quality products.</p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Youtube].map((I, idx) => (
                <a key={idx} href="#" className="text-gray-300 hover:text-primary-400"><I className="h-6 w-6" /></a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['About Us','Products','Categories','Deals','Blog'].map(l => (
                <li key={l}><Link href="/" className="text-gray-300 hover:text-primary-400">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              {['Contact Us','Shipping Info','Returns','FAQ','Privacy Policy'].map(l => (
                <li key={l}><Link href="/" className="text-gray-300 hover:text-primary-400">{l}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 mb-4 md:mb-0 text-gray-300">
            <span className="flex items-center space-x-2"><Mail className="h-5 w-5" /><span>support@modernshop.com</span></span>
            <span className="flex items-center space-x-2"><Phone className="h-5 w-5" /><span>+1 (555) 123-4567</span></span>
            <span className="flex items-center space-x-2"><MapPin className="h-5 w-5" /><span>123 Shop St, City, State 12345</span></span>
          </div>
          <p className="text-gray-400 text-sm">© 2025 m1nem. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
