'use client'

import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import Certificate from '../components/Certificate'

export default function CertificateGenerator() {
  const [studentName, setStudentName] = useState('')
  const [courseName, setCourseName] = useState('')
  const [completionDate, setCompletionDate] = useState('')
  const [certificateId, setCertificateId] = useState('')
  const [showCertificate, setShowCertificate] = useState(false)
  const certificateRef = useRef<HTMLDivElement>(null)

  const generateRandomCertificateId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < 15; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }

  const generateCertificate = (e: React.FormEvent) => {
    e.preventDefault()
    const newCertificateId = generateRandomCertificateId()
    setCertificateId(newCertificateId)
    setShowCertificate(true)
  }

  const downloadCertificate = () => {
    if (certificateRef.current) {
      html2canvas(certificateRef.current, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF('l', 'mm', 'a4')
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
        pdf.save(`${studentName.replace(' ', '_')}_certificate.pdf`)
      })
    }
  }

  const goBackToForm = () => {
    setShowCertificate(false)
    setCertificateId('')
  }

  const buttonClasses = "px-6 py-3 bg-blue-500 bg-opacity-20 backdrop-blur-sm text-blue-800 rounded-[25px] font-semibold shadow-lg hover:bg-opacity-30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-blue-800 mb-8">Cybersecurity Certificate Generator</h1>
      {!showCertificate ? (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={generateCertificate}
          className="bg-white bg-opacity-70 backdrop-blur-sm p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <div className="mb-4">
            <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
            <input
              type="text"
              id="studentName"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="courseName" className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
            <input
              type="text"
              id="courseName"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="completionDate" className="block text-sm font-medium text-gray-700 mb-1">Completion Date</label>
            <input
              type="date"
              id="completionDate"
              value={completionDate}
              onChange={(e) => setCompletionDate(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button type="submit" className={buttonClasses}>
            Generate Certificate
          </button>
        </motion.form>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div ref={certificateRef}>
            <Certificate
              studentName={studentName}
              courseName={courseName}
              completionDate={completionDate}
              certificateId={certificateId}
            />
          </div>
          <div className="mt-4 text-center">
            <p className="text-lg font-semibold text-blue-800">Certificate ID: {certificateId}</p>
          </div>
          <div className="flex flex-row mt-8">
            <button onClick={goBackToForm} className={`${buttonClasses} mr-4`}>
              Back to Form
            </button>
            <button onClick={downloadCertificate} className={buttonClasses}>
              Download Certificate (PDF)
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

