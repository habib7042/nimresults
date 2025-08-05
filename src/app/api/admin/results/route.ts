import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

function calculateGrade(marks: number): string {
  if (marks >= 79 && marks <= 100) return 'A+'
  if (marks >= 69 && marks <= 78) return 'A'
  if (marks >= 59 && marks <= 68) return 'A-'
  if (marks >= 49 && marks <= 58) return 'B'
  if (marks >= 39 && marks <= 48) return 'C'
  if (marks >= 33 && marks <= 38) return 'D'
  if (marks >= 0 && marks <= 32) return 'F'
  return 'Invalid'
}

// GET all results
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const classId = searchParams.get('classId')
    const semester = searchParams.get('semester')
    const year = searchParams.get('year')
    const studentId = searchParams.get('studentId')

    const whereClause: any = {}
    if (classId) whereClause.classId = classId
    if (semester) whereClause.semester = parseInt(semester)
    if (year) whereClause.year = year
    if (studentId) whereClause.studentId = studentId

    const results = await db.result.findMany({
      where: whereClause,
      include: {
        student: true,
        subject: true,
        class: true
      },
      orderBy: [
        { student: { rollNumber: 'asc' } },
        { subject: { name: 'asc' } }
      ]
    })

    // Calculate grades for each result
    const resultsWithGrades = results.map(result => ({
      ...result,
      grade: calculateGrade(result.marks)
    }))

    return NextResponse.json({
      success: true,
      results: resultsWithGrades
    })

  } catch (error) {
    console.error('Error fetching results:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST create new result
export async function POST(request: NextRequest) {
  try {
    const { studentId, subjectId, classId, semester, year, marks } = await request.json()

    if (!studentId || !subjectId || !classId || !semester || !year || marks === undefined) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Check if result already exists
    const existingResult = await db.result.findFirst({
      where: {
        studentId,
        subjectId,
        classId,
        semester,
        year
      }
    })

    if (existingResult) {
      return NextResponse.json(
        { error: 'Result already exists for this student, subject, semester, and year' },
        { status: 400 }
      )
    }

    // Validate marks
    if (marks < 0 || marks > 100) {
      return NextResponse.json(
        { error: 'Marks must be between 0 and 100' },
        { status: 400 }
      )
    }

    // Check if student, subject, and class exist
    const [student, subject, classData] = await Promise.all([
      db.student.findUnique({ where: { id: studentId } }),
      db.subject.findUnique({ where: { id: subjectId } }),
      db.class.findUnique({ where: { id: classId } })
    ])

    if (!student || !subject || !classData) {
      return NextResponse.json(
        { error: 'Student, subject, or class not found' },
        { status: 404 }
      )
    }

    const grade = calculateGrade(marks)

    const result = await db.result.create({
      data: {
        studentId,
        subjectId,
        classId,
        semester,
        year,
        marks,
        grade
      },
      include: {
        student: true,
        subject: true,
        class: true
      }
    })

    return NextResponse.json({
      success: true,
      result
    })

  } catch (error) {
    console.error('Error creating result:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}