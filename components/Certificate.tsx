import React from 'react'
import { motion } from 'framer-motion'

interface CertificateProps {
  studentName: string
  courseName: string
  completionDate: string
  certificateId: string
}

const Certificate: React.FC<CertificateProps> = ({ studentName, courseName, completionDate, certificateId }) => {
  return (
    <div className="w-[800px] h-[600px] bg-gradient-to-br from-blue-100 to-purple-100 p-8 rounded-lg shadow-lg">
      <div className="border-8 border-blue-500 h-full flex flex-col justify-between p-6 rounded-lg bg-white bg-opacity-70 backdrop-blur-sm">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">Certificate of Completion</h1>
          <p className="text-xl text-gray-600">This certifies that</p>
        </div>
        <div className="text-center">
          <h2 className="text-5xl font-bold text-blue-900 mb-4">{studentName}</h2>
          <p className="text-2xl text-gray-700">has successfully completed the course</p>
          <h3 className="text-3xl font-semibold text-blue-800 mt-2 mb-4">{courseName}</h3>
        </div>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-lg text-gray-600">Completion Date:</p>
            <p className="text-xl font-semibold text-blue-800">{completionDate}</p>
          </div>
          <div className="text-right">
            <p className="text-lg text-gray-600">Certificate ID:</p>
            <p className="text-xl font-semibold text-blue-800">{certificateId}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Certificate

