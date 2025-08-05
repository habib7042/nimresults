'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  Users, 
  BookOpen, 
  FileText, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  LogOut,
  School,
  TrendingUp
} from 'lucide-react'

interface Class {
  id: string
  name: string
  section?: string
  academicYear: string
  _count: {
    students: number
    subjects: number
    results: number
  }
}

interface Student {
  id: string
  name: string
  rollNumber: string
  classId: string
  academicYear: string
  class: Class
}

interface Subject {
  id: string
  name: string
  code?: string
  classId: string
  maxMarks: number
  class: Class
}

interface Result {
  id: string
  studentId: string
  subjectId: string
  classId: string
  semester: number
  year: string
  marks: number
  grade: string
  student: Student
  subject: Subject
  class: Class
}

export default function AdminDashboard() {
  const [classes, setClasses] = useState<Class[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [results, setResults] = useState<Result[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedSemester, setSelectedSemester] = useState('')
  const [selectedYear, setSelectedYear] = useState('')

  // Form states
  const [newClass, setNewClass] = useState({ name: '', section: '', academicYear: '' })
  const [newStudent, setNewStudent] = useState({ name: '', rollNumber: '', classId: '', academicYear: '' })
  const [newSubject, setNewSubject] = useState({ name: '', code: '', classId: '', maxMarks: 100 })
  const [newResult, setNewResult] = useState({ studentId: '', subjectId: '', classId: '', semester: '', year: '', marks: '' })

  useEffect(() => {
    fetchClasses()
  }, [])

  useEffect(() => {
    if (selectedClass) {
      fetchStudents(selectedClass)
      fetchSubjects(selectedClass)
    }
  }, [selectedClass])

  useEffect(() => {
    if (selectedClass && selectedSemester && selectedYear) {
      fetchResults(selectedClass, selectedSemester, selectedYear)
    }
  }, [selectedClass, selectedSemester, selectedYear])

  const fetchClasses = async () => {
    try {
      const response = await fetch('/api/admin/classes')
      const data = await response.json()
      if (data.success) {
        setClasses(data.classes)
      }
    } catch (error) {
      console.error('Error fetching classes:', error)
    }
  }

  const fetchStudents = async (classId: string) => {
    try {
      const response = await fetch(`/api/admin/students?classId=${classId}`)
      const data = await response.json()
      if (data.success) {
        setStudents(data.students)
      }
    } catch (error) {
      console.error('Error fetching students:', error)
    }
  }

  const fetchSubjects = async (classId: string) => {
    try {
      const response = await fetch(`/api/admin/subjects?classId=${classId}`)
      const data = await response.json()
      if (data.success) {
        setSubjects(data.subjects)
      }
    } catch (error) {
      console.error('Error fetching subjects:', error)
    }
  }

  const fetchResults = async (classId: string, semester: string, year: string) => {
    try {
      const response = await fetch(`/api/admin/results?classId=${classId}&semester=${semester}&year=${year}`)
      const data = await response.json()
      if (data.success) {
        setResults(data.results)
      }
    } catch (error) {
      console.error('Error fetching results:', error)
    }
  }

  const handleCreateClass = async () => {
    if (!newClass.name || !newClass.academicYear) return

    try {
      const response = await fetch('/api/admin/classes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newClass)
      })
      const data = await response.json()
      if (data.success) {
        setNewClass({ name: '', section: '', academicYear: '' })
        fetchClasses()
        alert('Class created successfully!')
      } else {
        alert(data.error || 'Error creating class')
      }
    } catch (error) {
      alert('Error creating class')
    }
  }

  const handleCreateStudent = async () => {
    if (!newStudent.name || !newStudent.rollNumber || !newStudent.classId || !newStudent.academicYear) return

    try {
      const response = await fetch('/api/admin/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent)
      })
      const data = await response.json()
      if (data.success) {
        setNewStudent({ name: '', rollNumber: '', classId: '', academicYear: '' })
        fetchStudents(newStudent.classId)
        alert('Student created successfully!')
      } else {
        alert(data.error || 'Error creating student')
      }
    } catch (error) {
      alert('Error creating student')
    }
  }

  const handleCreateSubject = async () => {
    if (!newSubject.name || !newSubject.classId) return

    try {
      const response = await fetch('/api/admin/subjects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSubject)
      })
      const data = await response.json()
      if (data.success) {
        setNewSubject({ name: '', code: '', classId: '', maxMarks: 100 })
        fetchSubjects(newSubject.classId)
        alert('Subject created successfully!')
      } else {
        alert(data.error || 'Error creating subject')
      }
    } catch (error) {
      alert('Error creating subject')
    }
  }

  const handleCreateResult = async () => {
    if (!newResult.studentId || !newResult.subjectId || !newResult.classId || !newResult.semester || !newResult.year || !newResult.marks) return

    try {
      const response = await fetch('/api/admin/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newResult, marks: parseInt(newResult.marks) })
      })
      const data = await response.json()
      if (data.success) {
        setNewResult({ studentId: '', subjectId: '', classId: '', semester: '', year: '', marks: '' })
        fetchResults(newResult.classId, newResult.semester, newResult.year)
        alert('Result created successfully!')
      } else {
        alert(data.error || 'Error creating result')
      }
    } catch (error) {
      alert('Error creating result')
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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage classes, students, subjects, and results</p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="classes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="classes" className="flex items-center gap-2">
              <School className="h-4 w-4" />
              Classes
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Students
            </TabsTrigger>
            <TabsTrigger value="subjects" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Subjects
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="classes">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <School className="h-5 w-5" />
                    Classes Management
                  </span>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add Class
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Class</DialogTitle>
                        <DialogDescription>
                          Add a new class to the system
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="className">Class Name</Label>
                          <Input
                            id="className"
                            value={newClass.name}
                            onChange={(e) => setNewClass({...newClass, name: e.target.value})}
                            placeholder="e.g., 6, 7, 8, 9, 10"
                          />
                        </div>
                        <div>
                          <Label htmlFor="section">Section (Optional)</Label>
                          <Input
                            id="section"
                            value={newClass.section}
                            onChange={(e) => setNewClass({...newClass, section: e.target.value})}
                            placeholder="e.g., A, B, C"
                          />
                        </div>
                        <div>
                          <Label htmlFor="academicYear">Academic Year</Label>
                          <Input
                            id="academicYear"
                            value={newClass.academicYear}
                            onChange={(e) => setNewClass({...newClass, academicYear: e.target.value})}
                            placeholder="e.g., 2024"
                          />
                        </div>
                        <Button onClick={handleCreateClass} className="w-full">
                          Create Class
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Class Name</TableHead>
                      <TableHead>Section</TableHead>
                      <TableHead>Academic Year</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Subjects</TableHead>
                      <TableHead>Results</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classes.map((classItem) => (
                      <TableRow key={classItem.id}>
                        <TableCell className="font-medium">{classItem.name}</TableCell>
                        <TableCell>{classItem.section || '-'}</TableCell>
                        <TableCell>{classItem.academicYear}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{classItem._count.students}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{classItem._count.subjects}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{classItem._count.results}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Students Management
                  </span>
                  <div className="flex items-center gap-2">
                    <Select value={selectedClass} onValueChange={setSelectedClass}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((classItem) => (
                          <SelectItem key={classItem.id} value={classItem.id}>
                            {classItem.name} {classItem.section} ({classItem.academicYear})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="flex items-center gap-2">
                          <Plus className="h-4 w-4" />
                          Add Student
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Create New Student</DialogTitle>
                          <DialogDescription>
                            Add a new student to the system
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="studentName">Student Name</Label>
                            <Input
                              id="studentName"
                              value={newStudent.name}
                              onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                              placeholder="Enter student name"
                            />
                          </div>
                          <div>
                            <Label htmlFor="rollNumber">Roll Number</Label>
                            <Input
                              id="rollNumber"
                              value={newStudent.rollNumber}
                              onChange={(e) => setNewStudent({...newStudent, rollNumber: e.target.value})}
                              placeholder="Enter roll number"
                            />
                          </div>
                          <div>
                            <Label htmlFor="studentClass">Class</Label>
                            <Select value={newStudent.classId} onValueChange={(value) => setNewStudent({...newStudent, classId: value})}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select class" />
                              </SelectTrigger>
                              <SelectContent>
                                {classes.map((classItem) => (
                                  <SelectItem key={classItem.id} value={classItem.id}>
                                    {classItem.name} {classItem.section} ({classItem.academicYear})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="studentYear">Academic Year</Label>
                            <Input
                              id="studentYear"
                              value={newStudent.academicYear}
                              onChange={(e) => setNewStudent({...newStudent, academicYear: e.target.value})}
                              placeholder="e.g., 2024"
                            />
                          </div>
                          <Button onClick={handleCreateStudent} className="w-full">
                            Create Student
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Roll Number</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Academic Year</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.rollNumber}</TableCell>
                        <TableCell>{student.class.name} {student.class.section}</TableCell>
                        <TableCell>{student.academicYear}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subjects">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Subjects Management
                  </span>
                  <div className="flex items-center gap-2">
                    <Select value={selectedClass} onValueChange={setSelectedClass}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((classItem) => (
                          <SelectItem key={classItem.id} value={classItem.id}>
                            {classItem.name} {classItem.section} ({classItem.academicYear})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="flex items-center gap-2">
                          <Plus className="h-4 w-4" />
                          Add Subject
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Create New Subject</DialogTitle>
                          <DialogDescription>
                            Add a new subject to the system
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="subjectName">Subject Name</Label>
                            <Input
                              id="subjectName"
                              value={newSubject.name}
                              onChange={(e) => setNewSubject({...newSubject, name: e.target.value})}
                              placeholder="Enter subject name"
                            />
                          </div>
                          <div>
                            <Label htmlFor="subjectCode">Subject Code (Optional)</Label>
                            <Input
                              id="subjectCode"
                              value={newSubject.code}
                              onChange={(e) => setNewSubject({...newSubject, code: e.target.value})}
                              placeholder="Enter subject code"
                            />
                          </div>
                          <div>
                            <Label htmlFor="subjectClass">Class</Label>
                            <Select value={newSubject.classId} onValueChange={(value) => setNewSubject({...newSubject, classId: value})}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select class" />
                              </SelectTrigger>
                              <SelectContent>
                                {classes.map((classItem) => (
                                  <SelectItem key={classItem.id} value={classItem.id}>
                                    {classItem.name} {classItem.section} ({classItem.academicYear})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="maxMarks">Max Marks</Label>
                            <Input
                              id="maxMarks"
                              type="number"
                              value={newSubject.maxMarks}
                              onChange={(e) => setNewSubject({...newSubject, maxMarks: parseInt(e.target.value) || 100})}
                              placeholder="100"
                            />
                          </div>
                          <Button onClick={handleCreateSubject} className="w-full">
                            Create Subject
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject Name</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Max Marks</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subjects.map((subject) => (
                      <TableRow key={subject.id}>
                        <TableCell className="font-medium">{subject.name}</TableCell>
                        <TableCell>{subject.code || '-'}</TableCell>
                        <TableCell>{subject.class.name} {subject.class.section}</TableCell>
                        <TableCell>{subject.maxMarks}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Results Management
                  </span>
                  <div className="flex items-center gap-2">
                    <Select value={selectedClass} onValueChange={setSelectedClass}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((classItem) => (
                          <SelectItem key={classItem.id} value={classItem.id}>
                            {classItem.name} {classItem.section}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Semester" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1st</SelectItem>
                        <SelectItem value="2">2nd</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                      </SelectContent>
                    </Select>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="flex items-center gap-2">
                          <Plus className="h-4 w-4" />
                          Add Result
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Create New Result</DialogTitle>
                          <DialogDescription>
                            Add a new result to the system
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="resultStudent">Student</Label>
                            <Select value={newResult.studentId} onValueChange={(value) => setNewResult({...newResult, studentId: value})}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select student" />
                              </SelectTrigger>
                              <SelectContent>
                                {students.map((student) => (
                                  <SelectItem key={student.id} value={student.id}>
                                    {student.name} ({student.rollNumber})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="resultSubject">Subject</Label>
                            <Select value={newResult.subjectId} onValueChange={(value) => setNewResult({...newResult, subjectId: value})}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select subject" />
                              </SelectTrigger>
                              <SelectContent>
                                {subjects.map((subject) => (
                                  <SelectItem key={subject.id} value={subject.id}>
                                    {subject.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="resultClass">Class</Label>
                            <Select value={newResult.classId} onValueChange={(value) => setNewResult({...newResult, classId: value})}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select class" />
                              </SelectTrigger>
                              <SelectContent>
                                {classes.map((classItem) => (
                                  <SelectItem key={classItem.id} value={classItem.id}>
                                    {classItem.name} {classItem.section}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="resultSemester">Semester</Label>
                            <Select value={newResult.semester} onValueChange={(value) => setNewResult({...newResult, semester: value})}>
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
                            <Label htmlFor="resultYear">Year</Label>
                            <Select value={newResult.year} onValueChange={(value) => setNewResult({...newResult, year: value})}>
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
                          <div>
                            <Label htmlFor="marks">Marks (0-100)</Label>
                            <Input
                              id="marks"
                              type="number"
                              min="0"
                              max="100"
                              value={newResult.marks}
                              onChange={(e) => setNewResult({...newResult, marks: e.target.value})}
                              placeholder="Enter marks"
                            />
                          </div>
                          <Button onClick={handleCreateResult} className="w-full">
                            Create Result
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Roll</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Semester</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>Marks</TableHead>
                      <TableHead>Grade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((result) => (
                      <TableRow key={result.id}>
                        <TableCell className="font-medium">{result.student.name}</TableCell>
                        <TableCell>{result.student.rollNumber}</TableCell>
                        <TableCell>{result.subject.name}</TableCell>
                        <TableCell>{result.semester}</TableCell>
                        <TableCell>{result.year}</TableCell>
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
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}