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

export async function POST(request: NextRequest) {
  try {
    const { class: className, roll, semester, year } = await request.json()

    if (!className || !roll || !semester || !year) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Find the class
    const classData = await db.class.findFirst({
      where: {
        name: className,
        academicYear: year
      }
    })

    if (!classData) {
      return NextResponse.json(
        { error: 'Class not found' },
        { status: 404 }
      )
    }

    // Find the student
    const student = await db.student.findFirst({
      where: {
        rollNumber: roll,
        classId: classData.id,
        academicYear: year
      }
    })

    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      )
    }

    // Get results for the student
    const results = await db.result.findMany({
      where: {
        studentId: student.id,
        classId: classData.id,
        semester: parseInt(semester),
        year: year
      },
      include: {
        student: true,
        subject: true,
        class: true
      }
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
    console.error('Error searching results:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}