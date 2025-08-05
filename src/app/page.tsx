'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { BookOpen, UserCheck, Settings, Search, Eye, Printer } from 'lucide-react'

export default function Home() {
  const [activeTab, setActiveTab] = useState('student')
  const [studentData, setStudentData] = useState({
    class: '',
    roll: '',
    semester: '',
    year: ''
  })
  const [results, setResults] = useState<any[]>([])
  const [adminData, setAdminData] = useState({
    email: '',
    password: ''
  })
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleAdminLogin = async () => {
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminData)
      })
      const data = await response.json()
      if (data.success) {
        setIsAdminLoggedIn(true)
        window.location.href = '/admin'
      } else {
        alert(data.error || 'Login failed')
      }
    } catch (error) {
      alert('Error during login')
    }
  }

  const handleStudentSearch = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/results/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(studentData)
      })
      const data = await response.json()
      if (response.ok) {
        setResults(data.results)
        setShowResults(true)
      } else {
        alert(data.error || 'Results not found')
      }
    } catch (error) {
      alert('Error searching for results')
    }
    setLoading(false)
  }

  const handlePrint = () => {
    const printContent = document.getElementById('printable-result')
    if (printContent) {
      const printWindow = window.open('', '_blank')
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>ফলাফল - Result</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
                background: white;
                color: black;
              }
              .header {
                text-align: center;
                margin-bottom: 30px;
                border-bottom: 2px solid #333;
                padding-bottom: 20px;
              }
              .student-info {
                margin-bottom: 20px;
                padding: 15px;
                background: #f5f5f5;
                border-radius: 5px;
              }
              .student-info h3 {
                margin: 0 0 10px 0;
                color: #333;
              }
              .student-info p {
                margin: 5px 0;
                font-size: 14px;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
              }
              th, td {
                border: 1px solid #ddd;
                padding: 12px;
                text-align: left;
              }
              th {
                background-color: #f2f2f2;
                font-weight: bold;
                font-size: 14px;
              }
              td {
                font-size: 13px;
              }
              .grade {
                padding: 4px 8px;
                border-radius: 3px;
                font-weight: bold;
                font-size: 12px;
              }
              .grade-ap { background-color: #d4edda; color: #155724; }
              .grade-a { background-color: #cce5ff; color: #004085; }
              .grade-am { background-color: #d1ecf1; color: #0c5460; }
              .grade-b { background-color: #e2d9f3; color: #4a148c; }
              .grade-c { background-color: #fff3cd; color: #856404; }
              .grade-d { background-color: #ffeaa7; color: #d63031; }
              .grade-f { background-color: #f8d7da; color: #721c24; }
              .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #ddd;
                font-size: 12px;
                color: #666;
              }
              @media print {
                body { margin: 0; padding: 10px; }
              }
            </style>
          </head>
          <body>
            ${printContent.innerHTML}
          </body>
          </html>
        `)
        printWindow.document.close()
        printWindow.print()
        printWindow.close()
      }
    }
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+': return 'bg-green-100 text-green-800'
      case 'A': return 'bg-blue-100 text-blue-800'
      case 'A-': return 'bg-cyan-100 text-cyan-800'
      case 'B': return 'bg-purple-100 text-purple-800'
      case 'C': return 'bg-yellow-100 text-yellow-800'
      case 'D': return 'bg-orange-100 text-orange-800'
      case 'F': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            বিদ্যালয় ফলাফল ব্যবস্থাপনা
          </h1>
          <p className="text-lg text-gray-600">
            School Result Management System
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="student" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              শিক্ষার্থী ফলাফল
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              এডমিন প্যানেল
            </TabsTrigger>
          </TabsList>

          <TabsContent value="student">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  ফলাফল অনুসন্ধান
                </CardTitle>
                <CardDescription>
                  আপনার ক্লাস, রোল, সেমিস্টার এবং বছর দিয়ে আপনার ফলাফল দেখুন
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div>
                    <Label htmlFor="class">ক্লাস</Label>
                    <Select value={studentData.class} onValueChange={(value) => setStudentData({...studentData, class: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">Class 6</SelectItem>
                        <SelectItem value="7">Class 7</SelectItem>
                        <SelectItem value="8">Class 8</SelectItem>
                        <SelectItem value="9">Class 9</SelectItem>
                        <SelectItem value="10">Class 10</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="roll">রোল নম্বর</Label>
                    <Input
                      id="roll"
                      value={studentData.roll}
                      onChange={(e) => setStudentData({...studentData, roll: e.target.value})}
                      placeholder="Enter roll number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="semester">সেমিস্টার</Label>
                    <Select value={studentData.semester} onValueChange={(value) => setStudentData({...studentData, semester: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1st Semester</SelectItem>
                        <SelectItem value="2">2nd Semester</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="year">বছর</Label>
                    <Select value={studentData.year} onValueChange={(value) => setStudentData({...studentData, year: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button 
                  onClick={handleStudentSearch} 
                  disabled={loading || !studentData.class || !studentData.roll || !studentData.semester || !studentData.year}
                  className="w-full"
                >
                  {loading ? 'Searching...' : 'ফলাফল দেখুন'}
                </Button>

                {showResults && results.length > 0 && (
                  <div className="mt-8">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">Student Information</h3>
                        <p>Name: {results[0].student.name}</p>
                        <p>Roll: {results[0].student.rollNumber}</p>
                        <p>Class: {results[0].class.name}</p>
                        <p>Semester: {results[0].semester}</p>
                        <p>Year: {results[0].year}</p>
                      </div>
                      <Button onClick={handlePrint} className="flex items-center gap-2">
                        <Printer className="h-4 w-4" />
                        ফলাফল প্রিন্ট করুন
                      </Button>
                    </div>
                    
                    {/* Printable Result Content */}
                    <div id="printable-result" className="hidden">
                      <div className="header">
                        <h1>বিদ্যালয় ফলাফল ব্যবস্থাপনা</h1>
                        <p>School Result Management System</p>
                      </div>
                      
                      <div className="student-info">
                        <h3>Student Information</h3>
                        <p><strong>Name:</strong> {results[0].student.name}</p>
                        <p><strong>Roll:</strong> {results[0].student.rollNumber}</p>
                        <p><strong>Class:</strong> {results[0].class.name}</p>
                        <p><strong>Semester:</strong> {results[0].semester}</p>
                        <p><strong>Year:</strong> {results[0].year}</p>
                      </div>
                      
                      <table>
                        <thead>
                          <tr>
                            <th>Subject</th>
                            <th>Marks</th>
                            <th>Grade</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.map((result, index) => (
                            <tr key={index}>
                              <td>{result.subject.name}</td>
                              <td>{result.marks}</td>
                              <td>
                                <span className={`grade grade-${result.grade.toLowerCase().replace('+', 'p').replace('-', 'm')}`}>
                                  {result.grade}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      
                      <div className="footer">
                        <p>Generated on {new Date().toLocaleDateString('bn-BD')} at {new Date().toLocaleTimeString('bn-BD')}</p>
                        <p>© 2024 School Result Management System</p>
                      </div>
                    </div>

                    {/* Screen-only Result Display */}
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Subject</TableHead>
                          <TableHead>Marks</TableHead>
                          <TableHead>Grade</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {results.map((result, index) => (
                          <TableRow key={index}>
                            <TableCell>{result.subject.name}</TableCell>
                            <TableCell>{result.marks}</TableCell>
                            <TableCell>
                              <Badge className={getGradeColor(result.grade)}>
                                {result.grade}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}

                {showResults && results.length === 0 && (
                  <Alert className="mt-4">
                    <AlertDescription>
                      No results found for the given information.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admin">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  এডমিন লগইন
                </CardTitle>
                <CardDescription>
                  এডমিন প্যানেলে প্রবেশ করতে লগইন করুন
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={adminData.email}
                      onChange={(e) => setAdminData({...adminData, email: e.target.value})}
                      placeholder="admin@school.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={adminData.password}
                      onChange={(e) => setAdminData({...adminData, password: e.target.value})}
                      placeholder="Enter password"
                    />
                  </div>
                  <Button onClick={handleAdminLogin} className="w-full">
                    লগইন করুন
                  </Button>
                </div>
                <Alert className="mt-4">
                  <AlertDescription>
                    Demo: Use admin@school.com / admin123 to access the admin panel
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}